/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { expect } from 'chai';
import { an_extractor } from './given/an_extractor';

describe('when extracting from string with only a non release type', () => {
    let extractor = new an_extractor().extractor;
    let labels = ['something'];
    let result = extractor.extract(labels);

    it('should return undefined', () => expect(result).to.be.undefined);
});
