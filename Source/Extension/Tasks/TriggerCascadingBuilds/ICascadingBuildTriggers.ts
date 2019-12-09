/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { BuildContext } from "@dolittle/azure-dev-ops.tasks.shared";
import { ICanTriggerCascadingBuild } from "./ICanTriggerCascadingBuild";

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
     * @returns {Promise<void>}
     */
    trigger(buildContext: BuildContext, version: string): Promise<void>

}
