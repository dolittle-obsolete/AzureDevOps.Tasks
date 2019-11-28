/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { VersionIncrementor } from "../VersionIncrementor";
import { expect } from "chai";
import { ReleaseType } from "semver";

describe('when release type is invalid', () => {
    let version_incrementor = new VersionIncrementor();
    let version = '1.0.0';
    let exception: Error;
    try {
        version_incrementor.increment(version, 'something' as ReleaseType);
    }
    catch (error) {
        exception = error;
    }
    it('should throw an exception', () => expect(exception).to.not.be.undefined);
});
