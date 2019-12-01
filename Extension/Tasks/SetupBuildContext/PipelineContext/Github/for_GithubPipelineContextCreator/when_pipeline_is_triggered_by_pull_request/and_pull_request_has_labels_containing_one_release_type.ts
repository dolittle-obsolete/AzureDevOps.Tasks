/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { expect } from 'chai';
import { a_github_pipeline_context_creator } from '../given/a_github_pipeline_context_creator'
import { PipelineContext } from '../../../PipelineContext';

describe('and pull request has labels containing one release type', () => {
    let context = new a_github_pipeline_context_creator();
    let context_creator = context.pipeline_context_creator;

    (context.client.pulls as sinon.SinonStub).returns(Promise.resolve({data: [{
        number: context.pull_request_number,
        labels: [{name: 'minor'}]
    }]}));

    let pipeline_context: PipelineContext
    beforeEach(async () => {
        pipeline_context = await context_creator.create(context.build_context, context.pull_request_context);
    });
    it('should not be undefined', () => expect(pipeline_context).to.not.be.undefined);
    it('should not publish', () => pipeline_context.shouldPublish.should.equal(false));
    it('should have minor release type', () => pipeline_context.releaseType!.should.equal('minor'));
});