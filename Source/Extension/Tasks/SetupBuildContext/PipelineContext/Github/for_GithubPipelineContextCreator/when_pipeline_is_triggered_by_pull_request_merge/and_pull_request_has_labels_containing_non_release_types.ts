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
    context.build_context.sourceBranchName = 'master';

    (context.client.pulls as sinon.SinonStub).returns(Promise.resolve({data: [{
        merge_commit_sha: context.build_context.sourceVersion,
        labels: [{name: 'something'}, {name: 'something else'}]
    }]}));

    let exception: Error
    before(async () => {
        try {
            
            await context_creator.create(context.build_context, context.pull_request_context);
        }
        catch(error) {
            exception = error;
        }
    });
    it('should throw an exception', () => expect(exception).to.not.be.undefined);
});