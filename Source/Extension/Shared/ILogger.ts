/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
/**
 * Defines a system that can log messages
 *
 * @export
 * @interface ILogger
 */
export interface ILogger {

    /**
     * Logs a debugging message
     *
     * @param {string} message
     */
    debug(message: string): void;

    /**
     * Logs a warning message
     *
     * @param {string} message
     */
    warning(message: string): void;

    /**
     * Logs an error message
     *
     * @param {string} message
     */
    error(message: string): void;

    /**
     * Logs the message
     *
     * @param {string} message
     */
    log(message: string): void

}
