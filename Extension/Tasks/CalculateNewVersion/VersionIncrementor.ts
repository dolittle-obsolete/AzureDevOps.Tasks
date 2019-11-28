/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
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
    
    increment(version: string | semver.SemVer, releaseType: semver.ReleaseType) {
        this._throwIfInvalidVersion(version);
        this._throwIfReleaseTypeIsNotValid(releaseType);
        let newVersion = semver.inc(version, releaseType)!;
        if (newVersion === null) throw new Error(`Release Type '${releaseType}' is not valid`)
        return newVersion;
    }

    private _throwIfInvalidVersion(version: string | semver.SemVer) {
        if (!semver.valid(version)) throw new Error(`${version} is not a valid SemVer version`);
    }
    private _throwIfReleaseTypeIsNotValid(releaseType: semver.ReleaseType) {
        let releaseTypes = ['major', 'minor', 'patch', 'prerelease' ];
        if (!releaseTypes.includes(releaseType)) throw new Error(`'${releaseType}' is not a valid SemVer release type`);
    }
}