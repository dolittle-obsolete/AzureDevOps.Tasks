/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { ILogger } from './ILogger';

/**
 * Represents a null-implementation of {ILogger}
 *
 * @export
 * @class NullLogger
 * @implements {ILogger}
 */
export class NullLogger implements ILogger {
    // tslint:disable-next-line: no-empty
    debug(message: string) { }
    // tslint:disable-next-line: no-empty
    warning(message: string) { }
    // tslint:disable-next-line: no-empty
    error(message: string) { }
    // tslint:disable-next-line: no-empty
    log(message: string) { }

}
