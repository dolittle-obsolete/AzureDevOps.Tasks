/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import * as taskLib from 'azure-pipelines-task-lib';
import path from 'path';

taskLib.setResourcePath(path.resolve(__dirname, 'task.json'));

async function run() {
    try {
        const connection = taskLib.getInput('Connection', true);
        const version = taskLib.getInput('Version', true);

        taskLib.setResult(taskLib.TaskResult.Succeeded, 'Success');
    }
    catch (err) {
        taskLib.setResult(taskLib.TaskResult.Failed, err.message);
    }
}

run();