/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { a_version_incrementor } from "../given/a_version_incrementer";

describe('and version has patch', () => {
    let version_incrementor = new a_version_incrementor().version_incrementor;
    let version = '0.0.1';
    let result = version_incrementor.increment(version, 'patch');
    
    it('should return the correct version', () => result.should.equal('0.0.2'));
});
