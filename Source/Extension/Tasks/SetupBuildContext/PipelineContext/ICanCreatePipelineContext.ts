/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { PipelineContext } from './PipelineContext';
import { BuildContext } from '../BuildContext';

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
     * @returns {Promise<PipelineContext>}
     */
    create(buildContext: BuildContext): Promise<PipelineContext>

    /**
     * Whether or not the system can create {PipelineContext}
     *
     * @returns {boolean}
     */
    canCreateFromContext(buildContext: BuildContext): boolean

}
