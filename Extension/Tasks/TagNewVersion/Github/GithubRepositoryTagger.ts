/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import Octokit from "@octokit/rest";
import { ICanTagRepository } from "../ICanTagRepository";
import { Tag } from "../ITagsCreator";


export type GithubRepository = {
    /**
     * The owner (user or org) of the repository
     *
     * @type {string}
     */
    owner: string,

    /**
     * The name of the repository
     *
     * @type {string}
     */
    repositoryName: string
}

export class GithubRepositoryTagger implements ICanTagRepository {
    
    /**
     * Instantiates an instance of {GithubRepositoryTagger}.
     * @param {Octokit} _client
     * @param {GithubRepository} _repository
     */
    constructor(private _client: Octokit, private _repository: GithubRepository) {}

    async tag(tag: Tag) {
        // await this._client.SOMETHING
    }

}