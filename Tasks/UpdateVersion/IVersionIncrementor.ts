/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { SemVer, ReleaseType } from "semver";


export interface IVersionIncrementor {
    /**
     * Increments a version based on the release type 
     * @param {SemVer} version 
     * @param {ReleaseType} releaseType
     */
    increment(version: SemVer, releaseType: ReleaseType): string | SemVer
}