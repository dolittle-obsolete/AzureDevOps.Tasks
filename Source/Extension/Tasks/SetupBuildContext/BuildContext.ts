/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

/**
 * The context of a Build Pipeline needed to create the Pipeline Context
 */
export type BuildContext = {

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

    /**
     * The commit id that triggered the build
     *
     * @type {string}
     */
    commitId: string;

    /**
     * The message of the commit that triggered the build
     *
     * @type {string}
     */
    commitMessage: string;

    /**
     * The source branch that triggered the build
     *
     * @type {string}
     */
    sourceBranchName: string;

    /**
     * The number of the pull request. Only set if a pull request triggered the build
     *
     * @type {number | undefined}
     */
    pullRequestNumber?: number;
};
