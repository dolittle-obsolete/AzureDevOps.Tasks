/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { ILogger, BuildContext, RepositoryProviders } from '@dolittle/azure-dev-ops.tasks.shared';
import Octokit from '@octokit/rest';
import { ICanTriggerCascadingBuild } from "../ICanTriggerCascadingBuild";

const masterRef = 'heads/master';

/**
 * Represents an implementation of {ICanTriggerCascadingBuild} that triggers cascading build on a 
 *
 * @export
 * @class GithubBuildTrigger
 * @implements {ICanTriggerCascadingBuild}
 */
export class GithubBuildTrigger implements ICanTriggerCascadingBuild {
    
    private _client: Octokit;

    /**
     * Instantiates an instance of {GithubBuildTrigger}.
     * @param {ILogger} _logger
     * @param {string} _owner
     * @param {string} _repo
     * @param {string} [token]
     */
    constructor(private _logger: ILogger, private _owner: string, private _repo: string, token?: string) {
        this._client = new Octokit({auth: token});
    }

    canTrigger(buildContext: BuildContext) {
        return buildContext.repositoryProvider === RepositoryProviders.GitHub;
    }

    async trigger(triggerMessage: string) {
        this._logger.log(`Triggering cascade build on ${this._owner}/${this._repo} with trigger message '${triggerMessage}'`);
        let ref = await this._issueCommit(triggerMessage);
        this._logger.log(`New reference sha: ${ref.data.object.sha}`);
        
    }

    private async _issueCommit(message: string) {
        let reference = await this._getReferenceCommit();
        let treeSha = await this._getTreeSha(reference);
        let commit = await this._createCommit(message, treeSha, reference);
        let updatedReference = await this._updateReference(commit);
        return updatedReference;
    }

    private async _getReferenceCommit() {
        this._logger.debug('Getting reference commit');
        let reference = await this._client.git.getRef(
            {
                owner: this._owner,
                repo: this._repo,
                ref: masterRef
            });
        this._logger.debug(`Status: ${reference.status}`);
        return reference.data.object;
        
    }
    
    private async _getTreeSha (reference: Octokit.GitGetRefResponseObject) {
        this._logger.debug('Getting commit');
        let commit = await this._client.git.getCommit({
            owner: this._owner,
            repo: this._repo,
            commit_sha: reference.sha
        });
        this._logger.debug(`Status: ${commit.status}`);
        return commit.data.tree.sha;
    }
    
    private async _createCommit (message: string, tree: string, reference: Octokit.GitGetRefResponseObject) {
        this._logger.debug('Creating commit');
        let commit = await this._client.git.createCommit({
            owner: this._owner,
            repo: this._repo,
            message,
            tree,
            parents: [reference.sha]

        });
        this._logger.debug(`Status: ${commit.status}`);
        return commit.data;
    }
    
    private async _updateReference(commit: Octokit.GitCreateCommitResponse) {
        this._logger.debug('Updating reference');
        let updatedReference = await this._client.git.updateRef({
            owner: this._owner,
            repo: this._repo,
            ref: masterRef,
            sha: commit.sha,
            force: true
        });
        this._logger.debug(`Status: ${updatedReference.status}`);
        return updatedReference;
    }
}