/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import * as taskLib from 'azure-pipelines-task-lib';
import path from 'path';
import { CascadingBuildMessageCreator } from './CascadingBuildMessageCreator';
import { TriggerCascadingBuild } from './TriggerCascadingBuild';

taskLib.setResourcePath(path.resolve(__dirname, 'task.json'));
function getGithubEndPointToken(githubEndpoint: string): string {
    const githubEndpointObject = taskLib.getEndpointAuthorization(githubEndpoint, false);
    let githubEndpointToken: string | undefined = undefined;

    if (!!githubEndpointObject) {
        taskLib.debug('Endpoint scheme: ' + githubEndpointObject.scheme);

        if (githubEndpointObject.scheme === 'PersonalAccessToken') {
            githubEndpointToken = githubEndpointObject.parameters.accessToken;
        } else if (githubEndpointObject.scheme === 'OAuth') {
            githubEndpointToken = githubEndpointObject.parameters.AccessToken;
        } else if (githubEndpointObject.scheme === 'Token') {
            githubEndpointToken = githubEndpointObject.parameters.AccessToken;
        } else if (githubEndpointObject.scheme) {
            throw new Error(taskLib.loc('InvalidEndpointAuthScheme', githubEndpointObject.scheme));
        }
    }

    if (!githubEndpointToken) {
        throw new Error(taskLib.loc('InvalidGitHubEndpoint', githubEndpoint));
    }

    return githubEndpointToken;
}

async function run() {
    try {
        const originRepo = taskLib.getVariable('Build.Repository.Name');
        if ( originRepo === undefined ) throw new Error("Build.Rpository.Name is undefined");
        const endpointId = taskLib.getInput('Connection', true);
        const token = endpointId? getGithubEndPointToken(endpointId) : undefined;
        const nextVersion = taskLib.getInput('NextVersion', true)!;
        const shouldPublish = taskLib.getBoolInput('ShouldPublish', true);
        const cascades = taskLib.getDelimitedInput('Cascades', ',', true);
        let messageCreator = new CascadingBuildMessageCreator();
        let cascadingBuild = new TriggerCascadingBuild();
        for (let cascadingRepositoryName of cascades) {
            const message = messageCreator.create(originRepo, nextVersion);
            await cascadingBuild.trigger(message, cascadingRepositoryName, token!);
        }

        taskLib.setResult(taskLib.TaskResult.Succeeded, 'Success');
    }
    catch (err) {
        taskLib.setResult(taskLib.TaskResult.Failed, err.message);
    }
}

run();