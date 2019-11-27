/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import tmrm = require('azure-pipelines-task-lib/mock-run');
import task_path from '../../task_path';

let tmr = new tmrm.TaskMockRunner(task_path);
tmr.setInput('version', '1.0.0');
tmr.run();
