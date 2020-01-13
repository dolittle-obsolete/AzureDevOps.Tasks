/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { getGithubEndPointToken, Logger } from '@dolittle/azure-dev-ops.tasks.shared';
import * as taskLib from 'azure-pipelines-task-lib';
import path from 'path';
import semver from 'semver';
import { CascadingBuildTriggers } from './CascadingBuildTriggers';
import { TriggerContext } from './TriggerContext';
import { CascadingBuildMessageCreator } from './CascadingBuildMessageCreator';
import { GithubBuildTrigger } from './Github/GithubBuildTrigger';
import inputVariables from './InputVariables';

taskLib.setResourcePath(path.resolve(__dirname, 'task.json'));
const logger = new Logger();
async function run() {
    try {
        const endpointId = taskLib.getInput(inputVariables.Connection, true)!;
        const token = getGithubEndPointToken(endpointId);
        const shouldPublish = taskLib.getBoolInput(inputVariables.ShouldPublish, true);
        const nextVersion = taskLib.getInput(inputVariables.NextVersion, true)!;
        const repositoryProvider = taskLib.getInput(inputVariables.RepositoryProvider, true)!;
        const repository = taskLib.getInput(inputVariables.Repository, true)!;

        if (!shouldPublish) {
            taskLib.setResult(taskLib.TaskResult.Skipped, 'ShouldPublish is false. Not triggering cascades');
            return;
        }

        if (!semver.valid(nextVersion)) throw new Error(`Next version: '${nextVersion}' is not a valid SemVer version`);

        const cascades = taskLib.getDelimitedInput('Cascades', ',');
        if (cascades.length === 0) {
            taskLib.setResult(taskLib.TaskResult.Skipped, 'There are no cascades to trigger');
            return;
        }

        const triggerContext: TriggerContext = {
            repositoryProvider,
            repository
        };

        const buildTriggers = new CascadingBuildTriggers(
            new CascadingBuildMessageCreator(),
            [
                new GithubBuildTrigger(logger)
            ]
        );

        await buildTriggers.trigger(triggerContext, cascades, nextVersion, token);

        taskLib.setResult(taskLib.TaskResult.Succeeded, 'Success');
    }
    catch (err) {
        taskLib.setResult(taskLib.TaskResult.Failed, err.message);
    }
}

run();
