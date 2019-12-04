/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { a_github_pipeline_context_creator } from '../given/a_github_pipeline_context_creator'
import { PipelineContext } from '../../../PipelineContext';
import { expect } from 'chai';

describe('and pull request has labels containing non release types', () => {
    let context = new a_github_pipeline_context_creator();
    let context_creator = context.pipeline_context_creator;
    context.pull_request_context.pullRequestNumber = 1;
    (context.client.pulls as sinon.SinonStub).returns(Promise.resolve({data: [{
        number: context.pull_request_context.pullRequestNumber,
        labels: [{name: 'something'}, {name: 'something else'}]
    }]}));

    let pipeline_context: PipelineContext
    before(async () => {
        pipeline_context = await context_creator.create(context.build_context, context.pull_request_context);
    });
    it('should not be undefined', () => expect(pipeline_context).to.not.be.undefined);
    it('should not publish', () => pipeline_context.shouldPublish.should.be.false);
    it('should have undefined release type', () => expect(pipeline_context.releaseType).to.be.undefined);
    it('should have previous version 1.0.0', () => pipeline_context.previousVersion!.should.equal('1.0.0'));
});