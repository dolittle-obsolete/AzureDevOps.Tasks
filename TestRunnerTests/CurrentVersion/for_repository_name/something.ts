/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import ttm = require('azure-pipelines-task-lib/mock-test')
import path = require('path');
import '@dolittle/azure-dev-ops.tasks.test-helpers';

describe('something', function () {
    let tp = path.join(__dirname, 'given', 'something.js');

    let tr = new ttm.MockTestRunner(tp);
    tr.run();
    console.log(tr.stdout)
    it('should succeed', () => tr.succeeded.should.be.true);
 });
