/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import Octokit from '@octokit/rest';
import semver from 'semver';
import { BuildContext } from "../../PipelineContext/BuildContext";
import { IVersionSorter } from '../../Version/IVersionSorter';
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

    constructor(private _versionSorter: IVersionSorter, buildContext: BuildContext, token?: string) {
        this._octokit = new Octokit({
            auth: token
        });
        let [owner, repo] = buildContext.repositoryName.split('/', 2); 
        this._owner = owner;
        this._repo = repo;
    }

    async latestVersionTagFromBranch(branch: string) {
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

        let commits = await this._octokit.request(`GET /repos/${this._owner}/${this._repo}/commits?sha=${branch}`)
        let sortedVersions = this._versionSorter.sort(versionTags.map(_ => _.name), true);

        let latestVersionTag: Octokit.ReposListTagsResponseItem | undefined;
        for (let version of sortedVersions) {
            let tag = versionTags.find(_ => _.name === version)!;
            if (commits.data.find((_: any) => _.sha === tag.commit.sha)) {
                latestVersionTag = tag;
                break;
            }
        }
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
