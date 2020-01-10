/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { BuildContext } from '@dolittle/azure-dev-ops.tasks.shared';


/**
 * Defines a system that can trigger a cascading build
 *
 * @export
 * @interface ICanTriggerCascadingBuild
 */
export interface ICanTriggerCascadingBuild {

    /**
     * Triggers the build
     *
     * @param {string} triggerMessage
     * @returns {Promise<void>}
     */
    trigger(triggerMessage: string): Promise<void>

    /**
     * Whether or not the build can be triggered
     *
     * @param {BuildContext} buildContext
     * @returns {boolean}
     */
    canTrigger(buildContext: BuildContext): boolean

}
