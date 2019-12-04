/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { expect } from 'chai';
import { an_extractor } from './given/an_extractor';

describe('when extracting from empty string', () => {
    let extractor = new an_extractor().extractor;
    let labels: string[] = [];
    let result = extractor.extract(labels);

    it('should return undefined', () => expect(result).to.be.undefined);
});
