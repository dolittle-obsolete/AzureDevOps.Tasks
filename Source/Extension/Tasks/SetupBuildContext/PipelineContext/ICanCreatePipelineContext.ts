/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { BuildContext, PullRequestContext } from '@dolittle/azure-dev-ops.tasks.shared';
import { PipelineContext } from './PipelineContext';

/**
 * Defines a system that can create a {PipelineContext}
 *
 * @export
 * @interface ICanCreatePipelineContext
 */
export interface ICanCreatePipelineContext {
    /**
     * Creates a {PipelineContext}
     *
     * @param {BuildContext} buildContext
     * @param {PullRequestContext} pullRequestContext
     * @returns {Promise<PipelineContext>}
     */
    create(buildContext: BuildContext, pullRequestContext: PullRequestContext): Promise<PipelineContext>

    /**
     * Whether or not the system can create {PipelineContext} from the given {BuildContext}
     *
     * @param {BuildContext} buildContext
     * @returns {boolean}
     */
    canCreateFromContext(buildContext: BuildContext): boolean

}
