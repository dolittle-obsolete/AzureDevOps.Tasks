/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import Octokit from '@octokit/rest';
import { ICanTriggerCascadingBuild } from "../ICanTriggerCascadingBuild";

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

export class GithubBuildTrigger implements ICanTriggerCascadingBuild {
    
    /**
     * Instantiates an instance of {GithubBuildTrigger}.
     * @param {Octokit} _client
     * @param {GithubRepository} repository
     */
    constructor(private _client: Octokit, private repository: GithubRepository) {}

    async trigger(triggerMessage: string) {
        // awaut this._client.SOMETHING
    }
    
}