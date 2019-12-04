/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
export type Tag = string;

/**
 * Defines a system that can create tag strings
 *
 * @export
 * @interface ITagsCreator
 */
export interface ITagsCreator {

    /**
     * Creates tags based off the version
     *
     * @param {string} version
     * @returns {Tag[]}
     */
    create(version: string): Tag[]

}
