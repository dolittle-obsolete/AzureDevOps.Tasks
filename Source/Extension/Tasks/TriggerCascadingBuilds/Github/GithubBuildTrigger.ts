/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { ILogger, RepositoryProviders } from '@dolittle/azure-dev-ops.tasks.shared';
import Octokit from '@octokit/rest';
import { ICanTriggerCascadingBuild } from '../ICanTriggerCascadingBuild';
import { TriggerContext } from '../TriggerContext';

const masterRef = 'heads/master';

/**
 * Represents an implementation of {ICanTriggerCascadingBuild} that triggers cascading build on a
 *
 * @export
 * @class GithubBuildTrigger
 * @implements {ICanTriggerCascadingBuild}
 */
export class GithubBuildTrigger implements ICanTriggerCascadingBuild {

    /**
     * Instantiates an instance of {GithubBuildTrigger}.
     * @param {ILogger} _logger
     */
    constructor(private _logger: ILogger) {}

    canTrigger(triggerContext: TriggerContext) {
        return triggerContext.repositoryProvider === RepositoryProviders.GitHub;
    }

    async trigger(triggerMessage: string, cascadingRepo: string, token?: string) {

        const client = new Octokit({auth: token});
        const [owner, repo] = cascadingRepo.split('/', 2);
        this._logger.log(`Triggering cascade build on ${owner}/${repo} with trigger message '${triggerMessage}'`);
        const ref = await this._issueCommit(client, triggerMessage, owner, repo);
        this._logger.log(`New reference sha: ${ref.data.object.sha}`);

    }

    private async _issueCommit(client: Octokit, message: string, owner: string, repo: string) {
        const reference = await this._getReferenceCommit(client, owner, repo);
        const treeSha = await this._getTreeSha(client, reference, owner, repo);
        const commit = await this._createCommit(client, message, treeSha, reference, owner, repo);
        const updatedReference = await this._updateReference(client, commit, owner, repo);
        return updatedReference;
    }

    private async _getReferenceCommit(client: Octokit, owner: string, repo: string) {
        this._logger.debug('Getting reference commit');
        const reference = await client.git.getRef(
            {
                owner: owner,
                repo: repo,
                ref: masterRef
            });
        this._logger.debug(`Status: ${reference.status}`);
        return reference.data.object;

    }

    private async _getTreeSha (client: Octokit, reference: Octokit.GitGetRefResponseObject, owner: string, repo: string) {
        this._logger.debug('Getting commit');
        const commit = await client.git.getCommit({
            owner: owner,
            repo: repo,
            commit_sha: reference.sha
        });
        this._logger.debug(`Status: ${commit.status}`);
        return commit.data.tree.sha;
    }

    private async _createCommit (client: Octokit, message: string, tree: string, reference: Octokit.GitGetRefResponseObject, owner: string, repo: string) {
        this._logger.debug('Creating commit');
        const commit = await client.git.createCommit({
            owner: owner,
            repo: repo,
            message,
            tree,
            parents: [reference.sha]

        });
        this._logger.debug(`Status: ${commit.status}`);
        return commit.data;
    }

    private async _updateReference(client: Octokit, commit: Octokit.GitCreateCommitResponse, owner: string, repo: string) {
        this._logger.debug('Updating reference');
        const updatedReference = await client.git.updateRef({
            owner: owner,
            repo: repo,
            ref: masterRef,
            sha: commit.sha,
            force: true
        });
        this._logger.debug(`Status: ${updatedReference.status}`);
        return updatedReference;
    }
}
