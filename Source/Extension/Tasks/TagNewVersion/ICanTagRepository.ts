/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { Tag } from "./ITagsCreator";

/**
 * Defines a system that can tag a repository
 *
 * @export
 * @interface ICanTagRepository
 */
export interface ICanTagRepository {

    /**
     * Tags the repository
     *
     * @param {Tag} tag The version tag
     * @param {string} version The actual version number (without v)
     * @returns {Promise<void>}
     */
    tag(tag: Tag, version: string): Promise<void>
}
