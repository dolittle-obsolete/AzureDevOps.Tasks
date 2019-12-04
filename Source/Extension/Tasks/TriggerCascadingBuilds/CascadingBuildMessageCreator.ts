/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import {ICascadingBuildMessageCreator} from './ICascadingBuildMessageCreator';

/**
 * Represents an implementation of {ICascadingBuildMessageCreator}
 *
 * @export
 * @class CascadingBuildMessageCreator
 * @implements {ICascadingBuildMessageCreator}
 */
export class CascadingBuildMessageCreator implements ICascadingBuildMessageCreator {
    
    create(originRepository: string, version: string, releaseType: string, cascadingRepository: string) {
        return `something`
    }

}
