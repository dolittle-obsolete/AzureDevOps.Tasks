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
import { NullLogger } from "@dolittle/azure-dev-ops.tasks.shared";

export class all_dependencies {
    client: GithubClient;
    release_type_extractor: IReleaseTypeExtractor;
    latest_version_finder: GithubLatestVersionFinder;
    pull_request_context: PullRequestContext;
    build_context: BuildContext;
    
    constructor() {
        this.client = {
            latestVersionTag: sinon.stub(),
            pulls: sinon.stub()
        } as any as GithubClient;
        this.release_type_extractor = new ReleaseTypeExtractor(new NullLogger());
        this.latest_version_finder = new GithubLatestVersionFinder(this.client, new NullLogger());

        this.build_context = {
            repositoryName: 'some-org/some-repo',
            repositoryProvider: 'GitHub',
            sourceBranch: 'refs/head/master',
            sourceBranchName: 'master',
            sourceVersion: 'some-id',
            sourceVersionMessage: 'some commit message'

        } as BuildContext;

        this.pull_request_context = {
            pullRequestNumber: undefined,
            sourceBranch: undefined,
            sourceCommitId: undefined,
            targetBranch: undefined
        } as PullRequestContext;
    }
}