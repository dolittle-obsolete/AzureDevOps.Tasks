/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import ttm = require('azure-pipelines-task-lib/mock-test')
import path = require('path');
import '@dolittle/azure-dev-ops.tasks.test-helpers'; 

describe('when release type is not valid', function () {
    let tp = path.join(__dirname, 'given', 'a_runner_with_invalid_release_type.js');

    let tr = new ttm.MockTestRunner(tp);
    tr.run();

    it('should fail', () => tr.succeeded.should.be.false);
    it('should have one error', () => tr.errorIssues.length.should.equal(1));
    it('should say that something is an invalid release type', () => tr.reportsIssue('\'something\' is not a valid SemVer release type'));
 });
