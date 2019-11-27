/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import ttm = require('azure-pipelines-task-lib/mock-test')
import path = require('path');
import '@dolittle/azure-dev-ops.tasks.test-helpers'; 

describe('when labels does not have a release label', function () {
    let tp = path.join(__dirname, 'given', 'a_runner_with_no_release_labels.js');

    let tr = new ttm.MockTestRunner(tp);
    tr.run();

    it('should succeed', () => tr.succeeded.should.be.true);
    it('should output new version variable NOT_SET', () => tr.hasOutputVariable('Version', 'NOT_SET').should.be.true)
 });
