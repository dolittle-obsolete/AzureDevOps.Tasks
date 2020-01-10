/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { TriggerContext } from './TriggerContext';


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
     * @param {TriggerContext} triggerContext
     * @param {string} [token]
     * @returns {Promise<void>}
     */
    trigger(triggerMessage: string, triggerContext: TriggerContext, token?: string): Promise<void>

    /**
     * Whether or not the build can be triggered
     *
     * @param {TriggerContext} triggerContext
     * @returns {boolean}
     */
    canTrigger(triggerContext: TriggerContext): boolean

}
