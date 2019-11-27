/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import {GithubPullRequestChecker} from '../GithubPullRequestChecker';

describe('when source branch indicates commit to master', () => {
    let checker = new GithubPullRequestChecker();
    let source_branch = 'refs/heads/master';
    let result = checker.check(source_branch);

    it('should return false', () => result.should.be.false);
});
