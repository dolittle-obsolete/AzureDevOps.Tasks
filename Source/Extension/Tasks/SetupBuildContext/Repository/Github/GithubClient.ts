/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import Octokit from '@octokit/rest';
import semver from 'semver';
import { BuildContext } from "../../PipelineContext/BuildContext";
import { IVersionSorter } from '../../Version/IVersionSorter';
import { ILogger } from '@dolittle/azure-dev-ops.tasks.shared';
/**
 * Represents a proxy for communicating with GitHub
 *
 * @export
 * @class GithubClient
 */
export class GithubClient {
    private _octokit: Octokit
    private _owner: string
    private _repo: string

    /**
     * Instantiates an instance of {GithubClient}.
     * @param {ILogger} _logger
     * @param {IVersionSorter} _versionSorter
     * @param {BuildContext} buildContext
     * @param {string} [token]
     */
    constructor(private _logger: ILogger, private _versionSorter: IVersionSorter, buildContext: BuildContext, token?: string) {
        this._octokit = new Octokit({
            auth: token
        });
        let [owner, repo] = buildContext.repositoryName.split('/', 2); 
        this._owner = owner;
        this._repo = repo;
    }

    async latestVersionTagFromBranch(branch: string) {
        this._logger.debug(`Getting latest version tag from branch '${branch}'`);
        let branches = await this._octokit.repos.listBranches({
            owner: this._owner,
            repo: this._repo,
            per_page: 100
        }).then(_ => _.data.filter(_ => _.name === branch));
        if (branches.length === 0) throw new Error(`No branch named '${branch}'`) ;

        let versionTags = await this._octokit.repos.listTags({
            owner: this._owner,
            repo: this._repo,
            per_page: 100
        }).then(_ => _.data.filter(_ => semver.valid(_.name)));
        this._logger.debug(`Found ${versionTags.length} version tags`);

        let sortedVersions = this._versionSorter.sort(versionTags.map(_ => _.name), true);

        let latestVersionTag = sortedVersions.length === 0? undefined : sortedVersions[0];
        
        return latestVersionTag;
    }


    pulls(state: 'all' | 'open' | 'closed' = 'all') {
        return this._octokit.pulls.list({
            owner: this._owner,
            repo: this._repo,
            state
        });
    }

}
