/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { a_github_pipeline_context_creator } from '../given/a_github_pipeline_context_creator';
import { expect } from 'chai';
import { PipelineContext } from '../../../PipelineContext';

describe('and pull request has labels containing non release types and valid release type', () => {
    const context = new a_github_pipeline_context_creator();
    const context_creator = context.pipeline_context_creator;
    context.build_context.pullRequestNumber = 1;
    (context.client.pulls as sinon.SinonStub).returns(Promise.resolve({data: [{
        number: context.build_context.pullRequestNumber,
        labels: [{name: 'something'}, {name: 'major'}]
    }]}));

    let pipeline_context: PipelineContext;
    before(async () => {
        pipeline_context = await context_creator.create(context.build_context);
    });
    it('should not be undefined', () => expect(pipeline_context).to.not.be.undefined);
    it('should not publish', () => pipeline_context.shouldPublish.should.be.false);
    it('should have major release type', () => pipeline_context.releaseType!.should.equal('major'));
    it('should have previous version 1.0.0', () => pipeline_context.previousVersion!.should.equal('1.0.0'));
});
