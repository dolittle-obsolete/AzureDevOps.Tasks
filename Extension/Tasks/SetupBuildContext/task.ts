/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import taskLib = require('azure-pipelines-task-lib/task');
import path from 'path';

taskLib.setResourcePath(path.resolve(__dirname, 'task.json'));
/**
 * Taken from https://github.com/microsoft/azure-pipelines-tasks/blob/master/Tasks/GitHubCommentV0/main.ts
 *
 * @param {string} githubEndpoint
 * @returns {string}
 */
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
        const endpointId = taskLib.getInput('gitHubConnection');
        const token = endpointId? getGithubEndPointToken(endpointId) : undefined;
        let repoName = taskLib.getInput('repositoryName', true)!;

        taskLib.debug(`Got githubConnection ${endpointId}`);
        taskLib.debug(`Got repositoryName: ${repoName}`);

        
        taskLib.setResult(taskLib.TaskResult.Succeeded, 'Success');
    }
    catch (err) {
        taskLib.setResult(taskLib.TaskResult.Failed, err.message);
    }
}

run();