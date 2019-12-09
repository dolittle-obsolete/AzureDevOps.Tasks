/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { BuildContext } from "./BuildContext";

/**
 * Gets the repo and owner from {BuildContext}
 *
 * @export
 * @param {BuildContext} context
 * @returns
 */
export function getRepoAndOwner(context: BuildContext) {
    let [owner, repo] = context.repositoryName.split('/', 2);
    return {
        owner, repo
    };
}
