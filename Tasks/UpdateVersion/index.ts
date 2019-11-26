/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import taskLib = require('azure-pipelines-task-lib/task');
import { ReleaseTypeExtractor } from './ReleaseTypeExtractor';
import { VersionIncrementor } from './VersionIncrementor';

const VERSION_NOT_SET = 'NOT_SET';

async function run() {
    try {
        const releaseTypeExtractor = new ReleaseTypeExtractor();
        const versionIncrementor = new VersionIncrementor();
        let version = taskLib.getInput('version', true)!;
        let labels = taskLib.getDelimitedInput('labels', ',');
        taskLib.debug(`Got version ${version}`);
        taskLib.debug(`Got labels: ${labels}`);

        let releaseType = releaseTypeExtractor.extract(labels)
        if (releaseType === undefined) {
            taskLib.setVariable('Version', VERSION_NOT_SET);
            taskLib.setResult(taskLib.TaskResult.Succeeded, `There were no labels denoting a new version. Version output set to '${VERSION_NOT_SET}'`);
            return;
        }
        taskLib.debug(`Updating version for new ${releaseType}`);
        let newVersion = versionIncrementor.increment(version, releaseType);

        taskLib.setVariable('Version', newVersion);
        taskLib.setResult(taskLib.TaskResult.Succeeded, `Successfully updated version from '${version}' to ${newVersion}`);
    }
    catch (err) {
        taskLib.setResult(taskLib.TaskResult.Failed, err.message);
    }
}

run();