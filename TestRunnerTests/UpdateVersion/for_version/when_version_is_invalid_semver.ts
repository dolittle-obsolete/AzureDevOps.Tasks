/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import ttm = require('azure-pipelines-task-lib/mock-test')
import path = require('path');
import '@dolittle/azure-dev-ops.tasks.test-helpers';

describe('when version is invalid semver', function () {
    let tp = path.join(__dirname, 'given', 'a_runner_with_invalid_version_input.js');

    let tr = new ttm.MockTestRunner(tp);
    tr.run();
    console.log(tr.stdout)
    it('should not succeed', () => tr.succeeded.should.be.false);
    it('should have one error issue', () => tr.errorIssues.length.should.equal(1));
    it('should be missing version variable', () => tr.reportsIssue('1-0-0 is not a valid SemVer version').should.be.true);
 });
