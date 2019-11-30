/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
export type PipelineContext = {
    shouldPublish: boolean
    previousVersion: string
    releaseType: string | undefined
}
