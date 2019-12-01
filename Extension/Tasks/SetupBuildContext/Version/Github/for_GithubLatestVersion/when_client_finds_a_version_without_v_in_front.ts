/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { GithubLatestVersionFinder } from "../GithubLatestVersionFinder";
import { expect } from "chai";
import sinon from "sinon";

describe('when client finds a version without v in front', () => {
    let client = {
        latestVersionTagFromBranch: sinon.stub()
    };
    client.latestVersionTagFromBranch.returns(Promise.resolve({name: '2.0.0'}));
    let github_latest_version_finder = new GithubLatestVersionFinder(client as any)
    let latest_version: string
    beforeEach(async () => {
        console.log('Hello');
        latest_version = await github_latest_version_finder.get();
    });
    
    it('should return something', () => expect(latest_version).to.not.be.undefined);
    it('should return version 2.0.0', () => latest_version.should.equal('2.0.0'));
});