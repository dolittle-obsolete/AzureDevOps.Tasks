/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { ICanTriggerCascadingBuild } from './ICanTriggerCascadingBuild';
import { TriggerContext } from './TriggerContext';

/**
 * Defines a system that knows about {ICanTriggerCascadingBuild}
 *
 * @export
 * @interface ICascadingBuildTriggers
 */
export interface ICascadingBuildTriggers {

    /**
     * Triggers the build
     *
     * @param {TriggerContext} triggerContext
     * @param {string[]} cascades
     * @param {string} version
     * @param {string} [token]
     * @returns {Promise<void>}
     */
    trigger(triggerContext: TriggerContext, cascades: string[], version: string, token?: string): Promise<void>

}
