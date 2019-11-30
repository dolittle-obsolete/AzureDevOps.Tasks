/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

/**
 * Defines a system that get the latest version
 *
 * @export
 * @interface ICanGetLatestVersion
 */
export interface ICanGetLatestVersion {
    
    
    get(): Promise<string>
}
