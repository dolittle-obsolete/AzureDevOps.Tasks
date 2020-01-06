/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import * as taskLib from 'azure-pipelines-task-lib';

/**
 * Taken from https://github.com/microsoft/azure-pipelines-tasks/blob/master/Tasks/GitHubCommentV0/main.ts
 *
 * @param {string} githubEndpoint
 * @returns {string}
 */
export function getGithubEndPointToken(githubEndpoint: string): string {
    const githubEndpointObject = taskLib.getEndpointAuthorization(githubEndpoint, false);
    let githubEndpointToken: string | undefined;

    if (githubEndpointObject !== undefined) {
        const scheme = githubEndpointObject.scheme;
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
