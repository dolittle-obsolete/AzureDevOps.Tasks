/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { a_github_pipeline_context_creator } from './given/a_github_pipeline_context_creator';
import { cascadingBuildMessage } from '../GithubPipelineContextCreator';
import { expect } from 'chai';
import { PipelineContext } from '../../PipelineContext';


describe('when pipeline is triggered by cascading build', () => {
    const context = new a_github_pipeline_context_creator();
    const context_creator = context.pipeline_context_creator;
    context.build_context.sourceBranchName = 'master';
    context.build_context.commitMessage = `${cascadingBuildMessage}`;

    (context.client.pulls as sinon.SinonStub).returns(Promise.resolve({data: []}));

    let pipeline_context: PipelineContext;
    before(async () => {
        pipeline_context = await context_creator.create(context.build_context);
    });
    it('should return pipeline context', () => expect(pipeline_context).to.not.be.undefined);
    it('should publish', () => pipeline_context.shouldPublish.should.be.true);
    it('should have patch release type', () => pipeline_context.releaseType!.should.equal('patch'));
    it('should have previous version 1.0.0', () => pipeline_context.previousVersion.should.equal('1.0.0'));
});
