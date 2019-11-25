/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import tl = require('azure-pipelines-task-lib/task');

async function run() {
    try {
        tl.setResult(tl.TaskResult.Succeeded, 'Success');
        console.log('Hello world!');
    }
    catch (err) {
        tl.setResult(tl.TaskResult.Failed, err.message);
    }
}

run();