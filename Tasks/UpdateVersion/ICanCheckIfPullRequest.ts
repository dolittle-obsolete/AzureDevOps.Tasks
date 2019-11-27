/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

/**
 * Defines a system that can check if the build was triggered by a pull request
 *
 * @export
 * @interface ICanCheckIfPullRequest
 */
export interface ICanCheckIfPullRequest {

    /**
     * Checks whether or not the build was triggered by a pull request
     *
     * @param {string} sourceBranch
     * @returns {boolean}
     */
    check(sourceBranch: string): boolean

    /**
     * Checks whether the source branch is valid
     *
     * @param {string} sourceBranch
     * @returns {boolean}
     */
    isValidSourceBranch(sourceBranch: string): boolean

}
