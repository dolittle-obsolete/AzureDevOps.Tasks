/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import taskLib = require('azure-pipelines-task-lib/task');
import Octokit from '@octokit/rest'

async function run() {
    try {
        let octokit = new Octokit({
            baseUrl: 'https://api.github.com',
        });

        taskLib.debug(taskLib.getVariables().map(_ => `${_.name}: ${_.value}`).join('\n'));
        taskLib.setResult(taskLib.TaskResult.Succeeded, 'Success');
    }
    catch (err) {
        taskLib.setResult(taskLib.TaskResult.Failed, err.message);
    }
}

run();