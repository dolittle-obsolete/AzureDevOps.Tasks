/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { expect } from 'chai';
import { a_github_pipeline_context_creator } from '../given/a_github_pipeline_context_creator';
import { PipelineContext } from '../../../PipelineContext';

describe('and pull request has labels containing one release type', () => {
    const context = new a_github_pipeline_context_creator();
    const context_creator = context.pipeline_context_creator;
    context.build_context.sourceBranchName = 'master';

    (context.client.pulls as sinon.SinonStub).returns(Promise.resolve({data: [{
        merge_commit_sha: context.build_context.sourceVersion,
        labels: [{name: 'minor'}]
    }]}));

    let pipeline_context: PipelineContext;
    before(async () => {
        pipeline_context = await context_creator.create(context.build_context, context.pull_request_context);
    });
    it('should not be undefined', () => expect(pipeline_context).to.not.be.undefined);
    it('should publish', () => pipeline_context.shouldPublish.should.be.true);
    it('should have minor release type', () => pipeline_context.releaseType!.should.equal('minor'));
    it('should have previous version 1.0.0', () => pipeline_context.previousVersion!.should.equal('1.0.0'));
});
