/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { GithubLatestVersionFinder } from "../GithubLatestVersionFinder";
import { expect } from "chai";
import sinon from "sinon";

describe('when client cannot find version', () => {
    let client = {
        latestVersionTagFromBranch: sinon.stub()
    };
    client.latestVersionTagFromBranch.returns(Promise.resolve(undefined));
    let github_latest_version_finder = new GithubLatestVersionFinder(client as any)
    let latest_version: string
    before(async () => {
        latest_version = await github_latest_version_finder.get();
    });
    
    it('should return something', () => expect(latest_version).to.not.be.undefined);
    it('should return version 1.0.0', () => latest_version.should.equal('1.0.0'));
});