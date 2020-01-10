/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

/**
 * The context needed for triggering another build
 */
export type TriggerContext = {

    /**
     * The provider of the repository (Github, ...)
     *
     * @type {string}
     */
    repositoryProvider: string;

    /**
     * The Repository that triggered the build
     *
     * @type {string}
     */
    repository: string;

};
