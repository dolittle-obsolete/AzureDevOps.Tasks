/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { ILogger } from "./ILogger";

/**
 * Represents a null-implementation of {ILogger}
 *
 * @export
 * @class NullLogger
 * @implements {ILogger}
 */
export class NullLogger implements ILogger {
    debug(message: string) { }    
    warning(message: string) { }
    error(message: string) { }

}
