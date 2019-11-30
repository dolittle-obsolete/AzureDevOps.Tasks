/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { ICanCreatePipelineContext } from "../ICanCreatePipelineContext";
import { BuildContext } from "../BuildContext";
import { PullRequestContext } from "../PullRequestContext";
import { PipelineContext } from "../PipelineContext";
import { RepositoryProviders } from "../../Repository/RepositoryProviders";
import { GithubClient } from "../../Repository/Github/GithubClient";
import { IReleaseTypeExtractor } from "../../ReleaseType/IReleaseTypeExtractor";
import { GithubLatestVersion } from "../../Version/Github/GithubLatestVersion";

/**
 * Represents an implementation of {ICanCreatePipelineContext}
 *
 * @export
 * @class GithubPipelineContextCreator
 * @implements {ICanCreatePipelineContext}
 */
export class GithubPipelineContextCreator implements ICanCreatePipelineContext {
    
    constructor(private _client: GithubClient, private _releaseTypeExtractor: IReleaseTypeExtractor, private _latestVersionGetter: GithubLatestVersion) {}

    async create(buildContext: BuildContext, pullRequestContext: PullRequestContext): Promise<PipelineContext> {
        const isPullRequest = this._isPullRequest(pullRequestContext);
        const isMergeToMaster = !isPullRequest && (await this._isMergeToMaster(buildContext));
        const isCascadingBuild = !isPullRequest && !isMergeToMaster && this._isCascadinbBuild(buildContext);

        const labels = isCascadingBuild? ['patch'] : await this._getLabels(isMergeToMaster, buildContext, pullRequestContext);
        const releaseType = this._releaseTypeExtractor.extract(labels);
        const shouldPublish = isCascadingBuild || isMergeToMaster;

        let previousVersion = await this._latestVersionGetter.get();

        let pipelineContext: PipelineContext = {
            previousVersion,
            releaseType,
            shouldPublish
        };

        return pipelineContext;
    }

    canCreateFromContext(buildContext: BuildContext) { 
        return buildContext.repositoryProvider === RepositoryProviders.GitHub;
    }

    private async _isMergeToMaster(buildContext: BuildContext) {
        if (buildContext.sourceBranchName !== 'master') return false;

        const commitId = buildContext.sourceVersion;
        let closedPullRequests = await this._client.pulls('closed');
        return closedPullRequests.data.filter(_ => _.merge_commit_sha === commitId).length === 1;

    }
    private async _getLabels(isMergeToMaster: boolean, buildContext: BuildContext, pullRequestContext: PullRequestContext) {
        let pullRequests = isMergeToMaster? 
            await this._client.pulls('closed').then(_ => _.data.filter(_ => _.merge_commit_sha === buildContext.sourceVersion))
            : await this._client.pulls('open').then(_ => _.data.filter(_ => _.number === pullRequestContext.pullRequestNumber));
        
        if (pullRequests.length === 0) throw new Error('No pull request found');
        else if (pullRequests.length > 1) throw new Error('Multiple pull requests matching context found');
        return pullRequests[0].labels.map(_ => _.name);
    }
    private _isCascadinbBuild(buildContext: BuildContext) {
        if (buildContext.sourceBranchName !== 'master') return false;

        return buildContext.sourceVersionMessage.startsWith('Cascading Build Triggered:') && buildContext.sourceVersionMessage.endsWith(buildContext.repositoryName); 
    }
    private _isPullRequest(pullRequestContext: PullRequestContext) {
        return pullRequestContext.sourceCommitId? true: false;   
    }

}