/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import ttm = require('azure-pipelines-task-lib/mock-test')
import path = require('path');
import '@dolittle/azure-dev-ops.tasks.test-helpers'; 

describe('when release type is empty string', function () {
    let tp = path.join(__dirname, 'given', 'a_runner_with_empty_string_as_release_type.js');

    let tr = new ttm.MockTestRunner(tp);
    tr.run();
    it('should fail', () => tr.succeeded.should.be.false);
    it('should complain on missing required input', () => tr.isMissingRequiredVariable('ReleaseType'));
 });
