/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { ILogger } from '@dolittle/azure-dev-ops.tasks.shared';
import Octokit from '@octokit/rest';
import { ICanTagRepository } from '../ICanTagRepository';
import { Tag } from '../ITagsCreator';

const ref = 'heads/master';
export class GithubRepositoryTagger implements ICanTagRepository {

    private _client: Octokit;

    /**
     * Instantiates an instance of {GithubRepositoryTagger}.
     * @param {ILogger} _logger
     * @param {string} _owner
     * @param {string} _repo
     * @param {string} [_token]
     */
    constructor(private _logger: ILogger, private _owner: string, private _repo: string, private _token?: string) {
        this._client = new Octokit({
            auth: this._token
        });
    }

    async tag(tag: Tag, version: string) {
        this._logger.debug(`Creating release with tag '${tag}' from version '${version}' on repository '${this._owner}/${this._repo}'`);
        const releaseResponse = await this._client.repos.createRelease({
            owner: this._owner,
            repo: this._repo,
            tag_name: tag,
            name: `Release version '${version}'`
        });
        this._logger.debug(`Status: ${releaseResponse.status}`);

    }
}
