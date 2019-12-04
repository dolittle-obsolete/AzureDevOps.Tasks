/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import * as taskLib from 'azure-pipelines-task-lib';
import path from 'path';
import outputVariables from './OutputVariables';
import { createBuildContext } from './PipelineContext/createBuildContext';
import { createPullRequestContext } from './PipelineContext/createPullRequestContext';
import { IPipelineContextCreators } from './PipelineContext/IPipelineContextCreators';
import { PipelineContextCreators } from './PipelineContext/PipelineContextCreators';
import { IVersionSorter } from './Version/IVersionSorter';
import { SemVerVersionSorter } from './Version/SemVerVersionSorter';
import { IReleaseTypeExtractor } from './ReleaseType/IReleaseTypeExtractor';
import { ReleaseTypeExtractor } from './ReleaseType/ReleaseTypeExtractor';
import { GithubClient } from './Repository/Github/GithubClient';
import { BuildContext } from './PipelineContext/BuildContext';
import { GithubPipelineContextCreator } from './PipelineContext/Github/GithubPipelineContextCreator';
import { GithubLatestVersionFinder } from './Version/Github/GithubLatestVersionFinder';
import Octokit from '@octokit/rest';

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
        const endpointId = taskLib.getInput('Connection');
        const token = endpointId? getGithubEndPointToken(endpointId) : undefined;
        const buildContext = createBuildContext();
        const pullRequestContext = createPullRequestContext();
        const versionSorter: IVersionSorter = new SemVerVersionSorter();
        const releaseTypeExtractor: IReleaseTypeExtractor = new ReleaseTypeExtractor();

        const githubClient = createGithubClient(versionSorter, buildContext, token);
        const githubLatestVersionFinder = createGithubLatestVersionFinder(githubClient);
        let pipelineContextCreators = getPipelineContextCreators(releaseTypeExtractor, githubClient, githubLatestVersionFinder);

        let pipelineContext = await pipelineContextCreators.create(buildContext, pullRequestContext);

        taskLib.setVariable(outputVariables.PreviousVersion, pipelineContext.previousVersion);
        taskLib.setVariable(outputVariables.ShouldPublish, `${pipelineContext.shouldPublish}`);
        if (pipelineContext.releaseType !== undefined) taskLib.setVariable(outputVariables.ReleaseType, pipelineContext.releaseType!);
        taskLib.setResult(taskLib.TaskResult.Succeeded, 'Success');
    }
    catch (err) {
        taskLib.setResult(taskLib.TaskResult.Failed, err.message);
    }
}

function createGithubClient(versionSorter: IVersionSorter, buildContext: BuildContext, token?: string) {
    return new GithubClient(versionSorter, buildContext, token);
}

function createGithubLatestVersionFinder(client: GithubClient) {
    return new GithubLatestVersionFinder(client);
}

function getPipelineContextCreators(releaseTypeExtractor: IReleaseTypeExtractor, githubClient: GithubClient, githubLatestVersionFinder: GithubLatestVersionFinder) {
    let pipelineContextCreators: IPipelineContextCreators = new PipelineContextCreators([
        new GithubPipelineContextCreator(githubClient, releaseTypeExtractor, githubLatestVersionFinder)
    ]);

    return pipelineContextCreators;
}

run();
