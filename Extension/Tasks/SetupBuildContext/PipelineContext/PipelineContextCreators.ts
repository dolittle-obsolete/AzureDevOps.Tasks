/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { BuildContext } from "./BuildContext";
import { PullRequestContext } from "./PullRequestContext";
import { ICanCreatePipelineContext } from "./ICanCreatePipelineContext";
import { IPipelineContextCreators } from "./IPipelineContextCreators";

/**
 * Represents an implementation of {IPipelineContextCreators}
 *
 * @export
 * @class PipelineContextCreators
 * @implements {IPipelineContextCreators}
 */
export class PipelineContextCreators implements IPipelineContextCreators {
    

    constructor() {
        this.pipeLineContextCreators = []
    }

    /**
     * The instances of systems that can create pipeline context
     *
     * @type {ICanCreatePipelineContext[]}
     */
    readonly pipeLineContextCreators: ICanCreatePipelineContext[];
    
    /**
     * Creates a {PipelineContext}
     *
     * @param {BuildContext} buildContext
     * @param {PullRequestContext} pullRequestContext
     * @returns {Promise<PipelineContext>}
     */
    create(buildContext: BuildContext, pullRequestContext: PullRequestContext) {
        let creator: ICanCreatePipelineContext | null = null
        
        for (const pipelineCreator of this.pipeLineContextCreators) {
            if (creator !== null) throw new Error('There are multiple pipeline creators that can create pipeline context from context')
            if (pipelineCreator.canCreateFromContext(buildContext)) {
                creator = pipelineCreator;
            }
        }
        if (creator === null) throw new Error('There are no pipeline creators that can build pipeline context from context');
        return creator.create(buildContext, pullRequestContext);
    }
}
