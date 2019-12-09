/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
export type PullRequestContext = {
    
    /**
     * The head sha of the pull request
     *
     * @type {string}
     */
    sourceCommitId?: string
    
    /**
     * The pull request number
     *
     * @type {number}
     */
    pullRequestNumber?: number;
    
    /**
     * The source branch of the pull request
     *
     * @type {string}
     */
    sourceBranch?: string;

    /**
     * The target branch of the pull request
     *
     * @type {string}
     */
    targetBranch?: string;

}
