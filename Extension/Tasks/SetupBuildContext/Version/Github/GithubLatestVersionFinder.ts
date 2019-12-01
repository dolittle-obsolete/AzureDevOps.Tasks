/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { GithubClient } from '../../Repository/Github/GithubClient';
import { ICanGetLatestVersion } from '../ICanGetLatestVersion';
import semver from 'semver';

/**
 * Represents an implementation of {ICanGetLatestVersion} that can get the latest version from Github
 *
 * @export
 * @class GithubLatestVersionFinder
 * @implements {ICanGetLatestVersion}
 */
export class GithubLatestVersionFinder implements ICanGetLatestVersion {

    /**
     * Instantiates an instance of {GithubVersionTags}.
     * @param {GithubClient} client
     */
    constructor(private _client: GithubClient) {}

    async get() {
        let version: string;
        let latestVersionTag = await this._client.latestVersionTagFromBranch('master');
        if (latestVersionTag === undefined) version = '1.0.0';
        else {
            version = latestVersionTag!.name.toLowerCase().startsWith('v')?
                latestVersionTag!.name.substr(1)
                : latestVersionTag!.name;
        }

        if (!semver.valid(version)) throw new Error(`${version} is not a valid SemVer version`);
        return version;
    }

}
