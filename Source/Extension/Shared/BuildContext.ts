/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

export type BuildContext = {
    
    /**
     * The name of the repository
     *
     * @type {string}
     */
    repositoryName: string
    /**
     * The provider of the repository (GitHub, ...)
     *
     * @type {string}
     */
    repositoryProvider: string

    /**
     * The source branch
     *
     * @type {string}
     */
    sourceBranch: string;

    /**
     * The name of the source branch
     *
     * @type {string}
     */
    sourceBranchName: string;
    
    /**
     * The commit id that triggered the build
     *
     * @type {string}
     */
    sourceVersion: string

    /**
     * THe message of the commit
     *
     * @type {string}
     */
    sourceVersionMessage: string
}