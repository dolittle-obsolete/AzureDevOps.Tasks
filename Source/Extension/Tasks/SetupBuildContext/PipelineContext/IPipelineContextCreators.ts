/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { PipelineContext } from './PipelineContext';
import { ICanCreatePipelineContext } from './ICanCreatePipelineContext';
import { BuildContext } from '../BuildContext';

/**
 * Defines a system that manages instances of systems that can create a pipeline context
 *
 * @export
 * @interface IPipelineContextCreators
 */
export interface IPipelineContextCreators {
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
    create(buildContext: BuildContext): Promise<PipelineContext>;

}
