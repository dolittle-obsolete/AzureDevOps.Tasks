/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import ttm = require('azure-pipelines-task-lib/mock-test')
import path = require('path');
import '@dolittle/azure-dev-ops.tasks.test-helpers'; 

describe('when labels contain multiple release labels', function () {
    let tp = path.join(__dirname, 'given', 'a_runner_with_multiple_release_labels.js');

    let tr = new ttm.MockTestRunner(tp);
    tr.run();
    console.log(tr.errorIssues)
    it('should fail', () => tr.succeeded.should.be.false);
    it('should have one issue', () => tr.errorIssues.length.should.equal(1))
    it('should have an issue saying there are multiple release labels', () => tr.reportsIssue('There are multiple release labels').should.be.true)
 });
