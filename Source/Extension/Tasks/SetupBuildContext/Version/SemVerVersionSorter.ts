/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { ILogger } from '@dolittle/azure-dev-ops.tasks.shared';
import semver from 'semver';
import {IVersionSorter} from './IVersionSorter';

/**
 * Represents an implementation of {IVersionSorter} that can sort versions according to SemVer
 *
 * @export
 * @class SemVerVersionSorter
 * @implements {IVersionSorter}
 */
export class SemVerVersionSorter implements IVersionSorter {
    
    /**
     * Instantiates an instance of {SemVerVersionSorter}.
     * @param {ILogger} _logger
     */
    constructor(private _logger: ILogger ) {}

    sort(versions: string[], descending: boolean = true) {
        this._logger.debug('Sorting versions...');
        if (versions === undefined) return [];
        versions.forEach(_ => {
            if (!semver.valid(_)) throw new Error(`${_} is not a valid SemVer version`);
        })
        return descending? semver.rsort(versions) : semver.sort(versions);
    }
    
}
