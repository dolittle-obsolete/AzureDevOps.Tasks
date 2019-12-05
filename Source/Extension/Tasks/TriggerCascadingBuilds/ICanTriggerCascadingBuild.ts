/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

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
    trigger(triggerMessage: string, repo: string, token: string): Promise<void>

}
