/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { IRepositoryClient } from "./IRepositoryClient";
import Octokit from '@octokit/rest';

/**
 * Represents an implementation of {IRepositoryClient} for Github
 *
 * @export
 * @class GithubClient
 * @implements {IRepositoryClient}
 */
export class GithubClient implements IRepositoryClient{
    private _octokit: Octokit

    /**
     * Instantiates an instance of {GithubClient}.
     * @param {string} [token]
     */
    constructor(token?: string) {
        this._octokit = new Octokit({
            baseUrl: 'https://api.github.com',
            auth: token
        });
    }

    async tags(repositoryName: string) {
        let {repo, owner} = this._parseRepositoryName(repositoryName);
        let tags = await this._octokit.repos.listTags({
            owner,
            repo
        });
        let branch = await this._octokit.repos.getBranch({owner,  repo, branch: 'master'})
        
        return tags.data.map(_ => _.name);
    }

    private _parseRepositoryName(repositoryName: string) {
        let repo = repositoryName.split('/', 2)[1];
        let owner = repositoryName.split('/', 2)[0];

        return {repo, owner};
    }

}
