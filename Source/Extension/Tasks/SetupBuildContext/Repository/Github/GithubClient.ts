/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { ILogger, BuildContext } from '@dolittle/azure-dev-ops.tasks.shared';
import Octokit from '@octokit/rest';
import semver from 'semver';
import { IVersionSorter } from '../../Version/IVersionSorter';
/**
 * Represents a proxy for communicating with GitHub
 *
 * @export
 * @class GithubClient
 */
export class GithubClient {
    private _octokit: Octokit;
    private _owner: string;
    private _repo: string;

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
        const [owner, repo] = buildContext.repositoryName.split('/', 2);
        this._owner = owner;
        this._repo = repo;
    }

    async latestVersionTag() {
        let versionTags = await this._octokit.repos.listTags({
            owner: this._owner,
            repo: this._repo
        }).then(_ => _.data.filter(_ => semver.valid(_.name)).map(_ => _.name));
        this._logger.debug(`Found ${versionTags.length} version tags`);

        versionTags = versionTags.map(_ => _.startsWith('v') ? _.substr(1) : _);
        const sortedVersions = this._versionSorter.sort(versionTags, true);

        const latestVersion = sortedVersions.length === 0 ? undefined : sortedVersions[0];

        return latestVersion;
    }

    pulls(state: 'all' | 'open' | 'closed' = 'all') {
        this._logger.debug(`Getting ${state} pull requests`);
        return this._octokit.pulls.list({
            owner: this._owner,
            repo: this._repo,
            state
        });
    }

}
