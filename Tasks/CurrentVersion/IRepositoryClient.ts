/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

/**
 * Defines a system that acts as a proxy towards different clients for interacting with repositories
 *
 * @export
 * @interface IRepositoryClient
 */
export interface IRepositoryClient {

    /**
     * Gets all the tags from a repository
     *
     * @param {string} repositoryName
     * @returns {Promise<string[]>}
     */
    tags(repositoryName: string): Promise<string[]>

}
