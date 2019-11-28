/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { expect } from 'chai';
import {GithubPullRequestChecker} from '../GithubPullRequestChecker';

describe('when source branch is undefined', () => {
    let checker = new GithubPullRequestChecker();
    let exception: Error;
    try {
        checker.check(undefined as any);
    }
    catch(error) {
        exception = error;
    }

    it('should throw an exception', () => expect(exception).to.not.be.undefined);
});
