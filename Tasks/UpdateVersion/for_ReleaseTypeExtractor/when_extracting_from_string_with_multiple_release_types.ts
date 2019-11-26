/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import {ReleaseTypeExtractor} from '../ReleaseTypeExtractor'
import { expect } from 'chai';

describe('when extracting from string with multiple release types', () => {
    let extractor = new ReleaseTypeExtractor();
    let labels = 'major,minor';
    let exception: Error;
    try {
        extractor.extract(labels);
    }
    catch(error) {
        exception = error;
    }

    it('should throw an exception', () => expect(exception).to.not.be.undefined);
});
