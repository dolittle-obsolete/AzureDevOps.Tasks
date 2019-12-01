/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { GithubClient } from "../../../../Repository/Github/GithubClient";
import sinon from "sinon";
import { IReleaseTypeExtractor } from "../../../../ReleaseType/IReleaseTypeExtractor";
import { PullRequestContext } from "../../../PullRequestContext";
import { GithubLatestVersionFinder } from "../../../../Version/Github/GithubLatestVersionFinder";
import { BuildContext } from "../../../BuildContext";
import { ReleaseTypeExtractor } from "../../../../ReleaseType/ReleaseTypeExtractor";

export class all_dependencies {
    client: GithubClient;
    release_type_extractor: IReleaseTypeExtractor;
    latest_version_finder: GithubLatestVersionFinder;
    pull_request_number: number;
    pull_request_source_branch: string;
    pull_request_source_commit_id: string;
    pull_request_target_branch: string;
    pull_request_context: PullRequestContext;
    build_context: BuildContext;
    repository_name: string;
    repository_provider: string;
    source_branch: string;
    source_branch_name: string;
    source_version: string;
    source_version_message: string;
    
    constructor() {
        this.client = {
            latestVersionTagFromBranch: sinon.stub(),
            pulls: sinon.stub()
        } as any as GithubClient;
        this.release_type_extractor = new ReleaseTypeExtractor();
        this.latest_version_finder = new GithubLatestVersionFinder(this.client);

        this.repository_name = 'some-org/some-repo';
        this.repository_provider = 'GitHub';
        this.source_branch = 'refs/head/master';
        this.source_branch_name = 'master';
        this.source_version = 'some-id';
        this.source_version_message = 'some commit message';
        this.build_context = {
            repositoryName: this.repository_name,
            repositoryProvider: this.repository_provider,
            sourceBranch: this.source_branch,
            sourceBranchName: this.source_branch_name,
            sourceVersion: this.source_version,
            sourceVersionMessage: this.source_version_message

        } as BuildContext;

        this.pull_request_number = 1;
        this.pull_request_source_branch = 'source-branch';
        this.pull_request_source_commit_id = 'some-id';
        this.pull_request_target_branch = 'target-branch';
        this.pull_request_context = {
            pullRequestNumber: this.pull_request_number,
            sourceBranch: this.pull_request_source_branch,
            sourceCommitId: this.pull_request_source_commit_id,
            targetBranch: this.pull_request_target_branch
        } as PullRequestContext;
    }
}