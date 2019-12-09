/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { expect } from 'chai';
import { a_version_incrementor } from './given/a_version_incrementer';

describe('when version is empty', () => {
    let version_incrementor = new a_version_incrementor().version_incrementor;
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
