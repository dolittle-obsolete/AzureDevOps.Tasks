/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import taskLib = require('azure-pipelines-task-lib/task');
import semver from 'semver';
async function run() {
    try {
        let version = taskLib.getInput('version', true)!;
        let labels = taskLib.getInput('labels');

        taskLib.debug(`Got version ${version}`);
        taskLib.debug(`Got labels: ${labels}`);

        if (!semver.valid(version)) {
            taskLib.setResult(taskLib.TaskResult.Failed, `${version} is not a valid semver`);
            return;
        }

        let newVersion = version;
        if (labels) {
            let labelList = labels.split(',').map(_ => _.trim());
            let major = labelList.includes('major');
            let minor = labelList.includes('minor');
            let patch = labelList.includes('patch');
            let preview = labelList.includes('preview');
            let releaseLabelBoolList = [major, minor, patch, preview];
            
            if (releaseLabelBoolList.filter(_ => _).length > 1) {
                taskLib.setResult(taskLib.TaskResult.Failed, 'There are multiple release labels');
                return;
            }
            else if (releaseLabelBoolList.filter(_ => _).length === 0) {
                taskLib.setResult(taskLib.TaskResult.Failed, 'There are no release labels');
                return;
            }

            else {
                if (major) {
                    taskLib.debug('Major release');
                    newVersion = semver.inc(version, "major")!;
                }
                else if (minor) {
                    taskLib.debug('minor release');
                    newVersion = semver.inc(version, "minor")!;
                }
                else if (patch) {
                    taskLib.debug('patch release');
                    newVersion = semver.inc(version, "patch")!;
                }
                else if (preview) {
                    taskLib.debug('preview release');
                    newVersion = semver.inc(version, "prerelease")!;
                }
            }

        }
        else {
            newVersion = semver.inc(version, 'patch')!;
        }

        taskLib.setVariable('version', newVersion);
        taskLib.setResult(taskLib.TaskResult.Succeeded, `Successfully updated version from '${version}' to ${newVersion}`);
    }
    catch (err) {
        taskLib.setResult(taskLib.TaskResult.Failed, err.message);
    }
}

run();