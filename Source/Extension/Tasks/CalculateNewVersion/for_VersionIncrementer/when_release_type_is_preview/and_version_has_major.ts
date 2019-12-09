/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { a_version_incrementor } from "../given/a_version_incrementer";

describe('and version has major', () => {
    let version_incrementor = new a_version_incrementor().version_incrementor;
    let version = '1.0.0';
    let result = version_incrementor.increment(version, 'prerelease');
    
    it('should return the correct version', () => result.should.equal('1.0.1-0'));
});
