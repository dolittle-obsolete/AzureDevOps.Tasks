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
import { GithubLatestVersionFinder } from "../../Version/Github/GithubLatestVersionFinder";
import { ILogger } from "@dolittle/azure-dev-ops.tasks.shared";

export const cascadingBuildMessage = '[Cascading release]'

/**
 * Represents an implementation of {ICanCreatePipelineContext}
 *
 * @export
 * @class GithubPipelineContextCreator
 * @implements {ICanCreatePipelineContext}
 */
export class GithubPipelineContextCreator implements ICanCreatePipelineContext {
    
    /**
     * Instantiates an instance of {GithubPipelineContextCreator}.
     * @param {GithubClient} _client
     * @param {IReleaseTypeExtractor} _releaseTypeExtractor
     * @param {GithubLatestVersionFinder} _latestVersionGetter
     * @param {ILogger} _logger
     */
    constructor(private _client: GithubClient, private _releaseTypeExtractor: IReleaseTypeExtractor, private _latestVersionGetter: GithubLatestVersionFinder, private _logger: ILogger) {}

    async create(buildContext: BuildContext, pullRequestContext: PullRequestContext): Promise<PipelineContext> {
        if (!this.canCreateFromContext(buildContext)) throw new Error('Cannot create pipeline context');
        this._logger.log('Resolving Pipeline Context from Github');
        this._logger.debug('Building pipeline context from a Github context');
        const isPullRequest = this._isPullRequest(pullRequestContext);
        if (isPullRequest) {
            this._logger.log('Build triggered by pull request');
            this._logger.debug('Build triggered by pull request');
        }
        const isMergeToMaster = !isPullRequest && (await this._isMergeToMaster(buildContext));
        if (isMergeToMaster) {
            this._logger.log('Build triggered by merge to master');
            this._logger.debug('Build triggered by merge to master');
        }
        const isCascadingBuild = !isPullRequest && !isMergeToMaster && this._isCascadingBuild(buildContext);
        if (isCascadingBuild) {
            this._logger.log('Build triggered by a cascading build');
            this._logger.debug('Build triggered by a cascading build');
        }
        
        if (!isPullRequest && !isMergeToMaster && !isCascadingBuild) {
            this._logger.log('Not triggering build with new version. Outputting default variables');
            return {
                previousVersion: '1.0.0',
                releaseType: undefined,
                shouldPublish: false
            };
        }
        const labels = isCascadingBuild? ['patch'] : await this._getLabels(isMergeToMaster, buildContext, pullRequestContext);
        
        const releaseType = this._releaseTypeExtractor.extract(labels);
        this._logger.debug(`Got release type: ${releaseType? releaseType : 'not a release!'}`);
        let shouldPublish = isCascadingBuild || (isMergeToMaster && releaseType !== undefined);
        this._logger.debug(`Should result in a release?: ${shouldPublish}`);
        let previousVersion = await this._latestVersionGetter.get();
        this._logger.debug(`Got previous version: '${previousVersion}'`);
        

        let pipelineContext: PipelineContext = {
            previousVersion,
            releaseType,
            shouldPublish
        };
        Object.keys(pipelineContext).forEach(key => this._logger.log(`${key}: ${(pipelineContext as any)[key]}`));
        return pipelineContext;
    }

    canCreateFromContext(buildContext: BuildContext) { 
        return buildContext.repositoryProvider === RepositoryProviders.GitHub;
    }

    private _isPullRequest(pullRequestContext: PullRequestContext) {
        this._logger.debug('Checking if build was triggered by a pull request');
        return pullRequestContext.pullRequestNumber? true: false;   
    }
    private async _isMergeToMaster(buildContext: BuildContext) {
        this._logger.debug('Checking if build was triggered by a merge to master');
        if (buildContext.sourceBranchName !== 'master') return false;
        const commitId = buildContext.sourceVersion;
        let closedPullRequests = await this._client.pulls('closed');
        return closedPullRequests.data.filter(_ => _.merge_commit_sha === commitId).length === 1;
    }

    private _isCascadingBuild(buildContext: BuildContext) {
        this._logger.debug('Checking if build was triggered by a cascading build');
        if (buildContext.sourceBranchName !== 'master') return false;

        return buildContext.sourceVersionMessage.startsWith(cascadingBuildMessage); 
    }
    private async _getLabels(isMergeToMaster: boolean, buildContext: BuildContext, pullRequestContext: PullRequestContext) {
        this._logger.debug('Getting labels from pull request');
        let pullRequests = isMergeToMaster? 
            await this._client.pulls('closed').then(_ => _.data.filter(_ => _.merge_commit_sha === buildContext.sourceVersion))
            : await this._client.pulls('open').then(_ => _.data.filter(_ => _.number === pullRequestContext.pullRequestNumber));
        if (pullRequests.length === 0) throw new Error('No pull request found');
        else if (pullRequests.length > 1) throw new Error('Multiple pull requests matching context found');
        return pullRequests[0].labels.map(_ => _.name);
    }

}