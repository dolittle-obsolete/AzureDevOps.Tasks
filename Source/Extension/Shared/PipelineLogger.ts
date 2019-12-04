/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { ILogger } from './ILogger';
import * as taskLib from 'azure-pipelines-task-lib';

/**
 * Represents an implementation of {ILogger} that logs messages to the Azure DevOps pipeline
 *
 * @export
 * @class NullLogger
 * @implements {ILogger}
 */
export class NullLogger implements ILogger {
    
    debug(message: string) { 
        taskLib.debug(message);
    }

    warning(message: string) { 
        taskLib.warning(message);
    }

    error(message: string) {
        taskLib.error(message);
    }

}
