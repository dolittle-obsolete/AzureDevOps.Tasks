/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import * as taskLib from 'azure-pipelines-task-lib';
import path from 'path';
import { CascadingBuildMessageCreator } from './CascadingBuildMessageCreator';
import { TriggerCascadingBuild } from './TriggerCascadingBuild';
import semver from 'semver';

taskLib.setResourcePath(path.resolve(__dirname, 'task.json'));

function getGithubEndPointToken(githubEndpoint: string): string {
    const githubEndpointObject = taskLib.getEndpointAuthorization(githubEndpoint, false);
    let githubEndpointToken: string | undefined;

    if (githubEndpointObject !== undefined) {
        let scheme = githubEndpointObject.scheme;
        taskLib.debug('Endpoint scheme: ' + scheme);

        if (scheme === 'PersonalAccessToken') {
            githubEndpointToken = githubEndpointObject.parameters.accessToken;
        } 
        else if (scheme === 'OAuth' || scheme === 'Token') {
            githubEndpointToken = githubEndpointObject.parameters.AccessToken;
        } 
        else if (scheme) {
            throw new Error(taskLib.loc('InvalidEndpointAuthScheme', githubEndpointObject.scheme));
        }
    }

    if (githubEndpointToken === undefined) {
        throw new Error(taskLib.loc('InvalidGitHubEndpoint', githubEndpoint));
    }

    return githubEndpointToken;
}

async function run() {
    try {
        const shouldPublish = taskLib.getBoolInput('ShouldPublish', true);
        if (!shouldPublish) {
            taskLib.setResult(taskLib.TaskResult.Skipped, 'ShouldPublish is false. Not triggering cascades');
            return;
        }
        const nextVersion = taskLib.getInput('NextVersion', true)!;
        if (!semver.valid(nextVersion)) throw new Error(`'${nextVersion}' is not a valid SemVer version`) 
        
        const cascades = taskLib.getDelimitedInput('Cascades', ',');
        if (cascades.length === 0) {
            taskLib.setResult(taskLib.TaskResult.Skipped, 'There are no cascades to trigger');
            return;
        }
        
        const originRepo = taskLib.getVariable('Build.Repository.Name');
        if ( originRepo === undefined ) throw new Error("Build.Rpository.Name is undefined");
        const endpointId = taskLib.getInput('Connection', true)!;
        const token = getGithubEndPointToken(endpointId);
        
        
        let messageCreator = new CascadingBuildMessageCreator();
        let cascadingBuild = new TriggerCascadingBuild(token);

        for (let cascadingRepositoryName of cascades) {
            const message = messageCreator.create(originRepo, nextVersion);
            await cascadingBuild.trigger(message, cascadingRepositoryName);
        }

        taskLib.setResult(taskLib.TaskResult.Succeeded, 'Success');
    }
    catch (err) {
        taskLib.setResult(taskLib.TaskResult.Failed, err.message);
    }
}

run();