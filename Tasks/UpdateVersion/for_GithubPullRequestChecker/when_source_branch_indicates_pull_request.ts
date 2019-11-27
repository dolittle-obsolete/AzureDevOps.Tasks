/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import {GithubPullRequestChecker} from '../GithubPullRequestChecker';

describe('when source branch indicates pull request', () => {
    let checker = new GithubPullRequestChecker();
    let source_branch = 'refs/pulls/1/merge';
    let result = checker.check(source_branch);

    it('should return true', () => result.should.be.true);
});
