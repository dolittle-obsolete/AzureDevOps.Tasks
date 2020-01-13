/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { ILogger } from '@dolittle/azure-dev-ops.tasks.shared';
import semver from 'semver';
import { IVersionIncrementor } from './IVersionIncrementor';

/**
 * Represents an implementation of {IVersionIncrementor}
 *
 * @export
 * @class VersionIncrementor
 * @implements {IVersionIncrementor}
 */
export class VersionIncrementor implements IVersionIncrementor {

    /**
     * Instantiates an instance of VersionIncrementor.
     * @param {ILogger} _logger
     */
    constructor(private _logger: ILogger) {}

    increment(version: string, releaseType: semver.ReleaseType) {
        this._throwIfInvalidVersion(version);
        this._logger.log(`Incrementing version '${version}' with release type '${releaseType}'`);
        const newVersion = semver.inc(version, releaseType)!;
        if (newVersion === null) throw new Error(`'${releaseType}' is not a valid SemVer release type`);
        return newVersion;
    }

    private _throwIfInvalidVersion(version: string) {
        if (!semver.valid(version)) throw new Error(`${version} is not a valid SemVer version`);
    }
}
