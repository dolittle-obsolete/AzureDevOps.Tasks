/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import ttm = require('azure-pipelines-task-lib/mock-test')
import path = require('path');
import '@dolittle/azure-dev-ops.tasks.test-helpers';

describe('when there is no version input', function () {
    let tp = path.join(__dirname, 'given', 'a_runner_without_version_input.js');

    let tr = new ttm.MockTestRunner(tp);
    tr.run();
    it('should not succeed', () => tr.succeeded.should.be.false);
    it('should have one error issue', () => tr.errorIssues.length.should.equal(1));
    it('should be missing version variable', () => tr.isMissingRequiredVariable('version').should.be.true);
 });
