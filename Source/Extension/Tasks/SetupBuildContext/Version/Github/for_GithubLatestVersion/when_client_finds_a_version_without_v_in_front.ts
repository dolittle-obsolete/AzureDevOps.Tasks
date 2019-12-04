/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { GithubLatestVersionFinder } from "../GithubLatestVersionFinder";
import { expect } from "chai";
import sinon from "sinon";
import { NullLogger } from "@dolittle/azure-dev-ops.tasks.shared";

describe('when client finds a version without v in front', () => {
    let client = {
        latestVersionTag: sinon.stub()
    };
    client.latestVersionTag.returns(Promise.resolve('2.0.0'));
    let github_latest_version_finder = new GithubLatestVersionFinder(client as any, new NullLogger() )
    let latest_version: string
    before(async () => {
        latest_version = await github_latest_version_finder.get();
    });
    
    it('should return something', () => expect(latest_version).to.not.be.undefined);
    it('should return version 2.0.0', () => latest_version.should.equal('2.0.0'));
});