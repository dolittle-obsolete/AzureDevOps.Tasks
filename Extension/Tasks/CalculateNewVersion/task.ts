/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import taskLib = require('azure-pipelines-task-lib/task');
import path from 'path';
import { ReleaseType } from 'semver';
import { VersionIncrementor } from './VersionIncrementor';

taskLib.setResourcePath(path.resolve(__dirname, '..', 'task.json'));

async function run() {
    try {
        const versionIncrementor = new VersionIncrementor();

        const previousVersion = taskLib.getInput('PreviousVersion', true)!;
        const releaseType = taskLib.getInput('ReleaseType', true)! as ReleaseType ;

        taskLib.debug(`Got Previous Version ${previousVersion}`);
        taskLib.debug(`Got Release Type: ${releaseType}`);

        taskLib.debug(`Updating version for new ${releaseType}`);
        let newVersion = versionIncrementor.increment(previousVersion, releaseType);

        taskLib.setVariable('NextVersion', newVersion);
        taskLib.setResult(taskLib.TaskResult.Succeeded, `Successfully updated version from '${previousVersion}' to ${newVersion}`);
    }
    catch (err) {
        taskLib.setResult(taskLib.TaskResult.Failed, err.message);
    }
}

run();