/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import {IVersionSorter} from './IVersionSorter';
import semver from 'semver';

/**
 * Represents an implementation of {IVersionSorter} that can sort versions according to SemVer
 *
 * @export
 * @class SemVerVersionSorter
 * @implements {IVersionSorter}
 */
export class SemVerVersionSorter implements IVersionSorter {
        
    sort(versions: string[], descending: boolean = true) {
        versions.forEach(_ => {
            if (!semver.valid(_)) throw new Error(`${_} is not a valid SemVer version`);
        })
        return descending? semver.rsort(versions) : semver.sort(versions);
    }
    
}
