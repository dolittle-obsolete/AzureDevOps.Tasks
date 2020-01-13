/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { all_dependencies } from './all_dependencies';
import { GithubPipelineContextCreator } from '../../GithubPipelineContextCreator';
import { NullLogger } from '@dolittle/azure-dev-ops.tasks.shared';

export class a_github_pipeline_context_creator extends all_dependencies {
    pipeline_context_creator: GithubPipelineContextCreator;
    constructor() {
        super();
        this.pipeline_context_creator = new GithubPipelineContextCreator(this.client,this.release_type_extractor, this.latest_version_finder, new NullLogger());
    }
}
