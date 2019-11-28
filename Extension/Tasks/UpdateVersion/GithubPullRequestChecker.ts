/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import {ICanCheckIfPullRequest} from './ICanCheckIfPullRequest';

/**
 * Represents an implementation of {ICanCheckIfPullRequest} that checks if sourceBranch was triggered by a github pull request
 *
 * @export
 * @class GithubPullRequestChecker
 * @implements {ICanCheckIfPullRequest}
 */
export class GithubPullRequestChecker implements ICanCheckIfPullRequest {

    check(sourceBranch: string) {
        this._throwIfInvalidSourceBranch(sourceBranch);
        return sourceBranch.startsWith('refs/pulls');
    }

    isValidSourceBranch(sourceBranch: string) {
        return sourceBranch.startsWith('refs/heads') || sourceBranch.startsWith('refs/pulls');
    }

    private _throwIfInvalidSourceBranch(sourceBranch: string) {
        if (!sourceBranch) throw new Error('Source branch cannot be empty or undefined');
        if (!this.isValidSourceBranch(sourceBranch)) throw new Error(`'${sourceBranch}' is not a valid Github source branch`)
    }
    
}
