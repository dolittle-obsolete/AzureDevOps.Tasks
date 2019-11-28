/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import taskLib = require('azure-pipelines-task-lib/task');
import path from 'path';

taskLib.setResourcePath(path.resolve(__dirname, 'task.json'));

async function run() {
    try {
        
        taskLib.setResult(taskLib.TaskResult.Succeeded, 'Success');
    }
    catch (err) {
        taskLib.setResult(taskLib.TaskResult.Failed, err.message);
    }
}

run();