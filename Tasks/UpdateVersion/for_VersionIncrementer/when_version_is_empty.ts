/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { VersionIncrementor } from "../VersionIncrementor";
import { expect } from "chai";

describe('when version is empty', () => {
    let version_incrementor = new VersionIncrementor();
    let version = '';
    let exception: Error;
    try {
        version_incrementor.increment(version, 'patch');
    }
    catch (error) {
        exception = error;
    }
    it('should throw an exception', () => expect(exception).to.not.be.undefined);
});
