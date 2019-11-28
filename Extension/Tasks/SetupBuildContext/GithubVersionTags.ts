/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { ICanGetVersionTags } from './ICanGetVersionTags';
import { GithubClient } from './GithubClient';
import semver from 'semver';

/**
 * Represents an implementation of {ICanGetTags} that gets tags using the {GithubClient}
 *
 * @export
 * @class GithubVersionTags
 * @implements {ICanGetTags}
 */
export class GithubVersionTags implements ICanGetVersionTags {

    /**
     * Instantiates an instance of {GithubVersionTags}.
     * @param {GithubClient} client
     */
    constructor(readonly client: GithubClient) {}

    async get(repositoryName: string) {
        let tags = await this.client.tags(repositoryName);

        return tags.filter(_ => semver.valid(_));
    }

}
