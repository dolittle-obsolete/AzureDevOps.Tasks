/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

/**
 * Defines a system that can sort versions
 *
 * @export
 * @interface IVersionSorter
 */
export interface IVersionSorter {

    /**
     * Sorts the list of versions
     *
     * @param {string[]} versions
     * @param {boolean} [descending]
     * @returns {string[]}
     */
    sort(versions: string[], descending?: boolean): string[]
}
