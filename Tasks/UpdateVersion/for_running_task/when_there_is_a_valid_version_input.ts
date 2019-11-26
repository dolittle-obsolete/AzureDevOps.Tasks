/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import ttm = require('azure-pipelines-task-lib/mock-test')
import path = require('path');

describe('when there is a valid version input', function () {
    let tp = path.join(__dirname, 'given', 'a_runner_with_valid_version_input.js');

    let tr = new ttm.MockTestRunner(tp);
    tr.run();
    
    it('should succeed', () => tr.succeeded.should.be.true);
 });
