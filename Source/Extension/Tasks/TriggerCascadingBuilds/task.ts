/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { getGithubEndPointToken, Logger } from '@dolittle/azure-dev-ops.tasks.shared';
import * as taskLib from 'azure-pipelines-task-lib';
import path from 'path';
import semver from 'semver';
import { CascadingBuildTriggers } from './CascadingBuildTriggers';

taskLib.setResourcePath(path.resolve(__dirname, 'task.json'));
const logger = new Logger();
async function run() {
    try {
        const shouldPublish = taskLib.getBoolInput('ShouldPublish', true);
        if (!shouldPublish) {
            taskLib.setResult(taskLib.TaskResult.Skipped, 'ShouldPublish is false. Not triggering cascades');
            return;
        }
        const nextVersion = taskLib.getInput('NextVersion', true)!;
        if (!semver.valid(nextVersion)) throw new Error(`'${nextVersion}' is not a valid SemVer version`);
        const cascades = taskLib.getDelimitedInput('Cascades', ',');
        if (cascades.length === 0) {
            taskLib.setResult(taskLib.TaskResult.Skipped, 'There are no cascades to trigger');
            return;
        }
        const endpointId = taskLib.getInput('Connection', true)!;
        const token = getGithubEndPointToken(endpointId);

        const buildTriggers = CascadingBuildTriggers.fromContext(logger, buildContext, cascades, token);

        await buildTriggers.trigger(buildContext, nextVersion);

        taskLib.setResult(taskLib.TaskResult.Succeeded, 'Success');
    }
    catch (err) {
        taskLib.setResult(taskLib.TaskResult.Failed, err.message);
    }
}

run();
