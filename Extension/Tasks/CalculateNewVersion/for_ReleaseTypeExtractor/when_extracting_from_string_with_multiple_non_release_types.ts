/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import {ReleaseTypeExtractor} from '../ReleaseTypeExtractor'
import { expect } from 'chai';

describe('when extracting from string with multiple non release types', () => {
    let extractor = new ReleaseTypeExtractor();
    let labels = ['something','somethingElse'];
    let result = extractor.extract(labels, true);

    it('should return undefined', () => expect(result).to.be.undefined);
});
