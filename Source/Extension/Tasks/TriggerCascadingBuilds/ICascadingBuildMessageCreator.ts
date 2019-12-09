/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

/**
 * Defines a system that can create a cascading build message
 *
 * @export
 * @interface ICascadingBuildMessageCreator
 */
export interface ICascadingBuildMessageCreator {
    
    /**
     * Creates the cascading build message
     *
     * @param {string} originRepository The repository that triggered the build
     * @param {string} version The version that triggered the build
     * @returns {string}
     */
    create(originRepository: string, version: string): string

}
