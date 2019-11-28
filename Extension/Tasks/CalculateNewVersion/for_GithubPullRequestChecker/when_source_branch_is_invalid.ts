/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { expect } from 'chai';
import {GithubPullRequestChecker} from '../GithubPullRequestChecker';

describe('when source branch is invalid', () => {
    let checker = new GithubPullRequestChecker();
    let source_branch = '$/teamproject/main'
    let exception: Error;
    try {
        checker.check(source_branch);
    }
    catch(error) {
        exception = error;
    }

    it('should throw an exception', () => expect(exception).to.not.be.undefined);
});
