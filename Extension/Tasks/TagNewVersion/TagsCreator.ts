/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import {valid as isValidSemver} from 'semver';
import { ITagsCreator, Tag } from './ITagsCreator';

/**
 * Represents an implementation of {ITagsCreator}
 *
 * @export
 * @class TagsCreator
 * @implements {ITagsCreator}
 */
export class TagsCreator implements ITagsCreator {
    
    create(version: string) {
        if (!isValidSemver(version)) throw new Error(`${version} is not a valid SemVer`);
        if (version.toLowerCase().startsWith('v')) return [version.substr(1), version] as Tag[];
        else return [version, `v${version}`] as Tag[];
    }
    
}
