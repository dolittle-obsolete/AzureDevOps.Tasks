/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { VersionIncrementor } from "../../VersionIncrementor";

describe('and version has minor', () => {
    let version_incrementor = new VersionIncrementor();
    let version = '0.1.0';
    let result = version_incrementor.increment(version, 'minor');
    
    it('should return the correct version', () => result.should.equal('0.2.0'));
});
