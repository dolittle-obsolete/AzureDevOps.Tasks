/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import Octokit from '@octokit/rest';
import { randomBytes } from 'crypto';
import {ICanTriggerCascadingBuild} from './ICanTriggerCascadingBuild';

const ref = 'heads/master';

/**
 * Represents an implementation of {ICanTriggerCascadingBuild} that trigger the next build of the cascade with an empty commit
 *
 * @export
 * @class GithubBuildTrigger
 * @implements {ICanTriggerCascadingBuild}
 */
export class TriggerCascadingBuild implements ICanTriggerCascadingBuild {
    private _client: Octokit;


    constructor(token: string) {
        this._client = new Octokit({auth: token});
    }

    async trigger(triggerMessage: string, repositoryName: string, token?: string) {
        let client = token? new Octokit({auth: token}) : this._client;
        let [owner, repo] = repositoryName.split('/', 2);
        console.log(`Triggering cascade build on ${owner}/${repo} with trigger message '${triggerMessage}'`);

        let ref = await this._issueCommit(client, triggerMessage, owner, repo);
        console.log(`New reference sha: ${ref.data.object.sha}`);
        
    }

    private async _issueCommit(client: Octokit, message: string, owner: string, repo: string) {
        let reference = await this._getReferenceCommit(client, owner, repo);
        let treeSha = await this._getTreeSha(client, owner, repo, reference);
        let commit = await this._createCommit(client, message, owner, repo, treeSha, reference);
        let updatedReference = await this._updateReference(client, owner, repo, commit);
        return updatedReference;
    }

    private async _getReferenceCommit(client: Octokit, owner: string, repo: string) {
        console.log('Getting reference commit');
        let reference = await client.git.getRef(
            {
                owner,
                repo,
                ref
            });
        console.log(reference);
        return reference.data.object;
        
    }
    
    private async _getTreeSha (client: Octokit, owner: string, repo: string, reference: Octokit.GitGetRefResponseObject) {
        console.log('Getting commit');
        let commit = await client.git.getCommit({
            owner,
            repo,
            commit_sha: reference.sha
        });
        console.log(commit);
        return commit.data.tree.sha;
    }
    
    private async _createCommit (client: Octokit, message: string, owner: string, repo: string, tree: string, reference: Octokit.GitGetRefResponseObject) {
        console.log('Creating commit');
        let commit = await client.git.createCommit({
            owner,
            repo,
            message,
            tree,
            parents: [reference.sha]

        });
        console.log(commit);
        return commit.data;
    }
    
    private async _updateReference(client: Octokit, owner: string, repo: string, commit: Octokit.GitCreateCommitResponse) {
        console.log('Updating reference');
        let updatedReference = await client.git.updateRef({
            owner,
            repo,
            ref,
            sha: commit.sha,
            force: true
        });
        console.log(updatedReference);
        return updatedReference;
    }
}
