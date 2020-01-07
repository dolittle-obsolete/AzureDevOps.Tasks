/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { expect } from 'chai';
import { an_extractor } from './given/an_extractor';

describe('when extracting from undefined string', () => {
    const extractor = new an_extractor().extractor;
    const result = extractor.extract(undefined as any);

    it('should return undefined', () => expect(result).to.be.undefined);
});
