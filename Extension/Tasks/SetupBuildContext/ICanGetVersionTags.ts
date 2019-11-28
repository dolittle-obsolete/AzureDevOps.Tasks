/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { IRepositoryClient } from "./IRepositoryClient";


/**
 * Defines a system that can get version tags from a repository
 *
 * @export
 * @interface ICanGetVersionTags
 */
export interface ICanGetVersionTags {

    /**
     * The client that interacts with the repository
     *
     * @type {IRepositoryClient}
     */
    readonly client: IRepositoryClient

    /**
     * Gets all the version tags from a repository
     *
     * @param {string} repositoryName
     * @param {string} [token]
     * @returns {Promise<string[]>}
     */
    get(repositoryName: string): Promise<string[]>

}
