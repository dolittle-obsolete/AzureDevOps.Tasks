/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { GithubClient } from '../../Repository/Github/GithubClient';
import { ICanGetLatestVersion } from '../ICanGetLatestVersion';
import semver from 'semver';
import { ILogger } from '@dolittle/azure-dev-ops.tasks.shared';

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
     * @param {ILogger} _logger
     */
    constructor(private _client: GithubClient, private _logger: ILogger) {}

    async get() {
        this._logger.debug('Getting latest version from github');
        let version: string;
        let latestVersionTag = await this._client.latestVersionTag();
        if (latestVersionTag === undefined) {
            this._logger.debug('There was no version tagged on the repository. Defaulting to version 1.0.0')
            version = '1.0.0';
        }
        else {
            this._logger.debug(`Found latest version to be '${latestVersionTag}'`)
            version = latestVersionTag;
        }

        if (!semver.valid(version)) throw new Error(`${version} is not a valid SemVer version`);
        return version;
    }

}
