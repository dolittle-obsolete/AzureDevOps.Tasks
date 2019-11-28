/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import {ReleaseTypeExtractor} from '../ReleaseTypeExtractor'
import { expect } from 'chai';

describe('when extracting from empty string', () => {
    let extractor = new ReleaseTypeExtractor();
    let labels: string[] = [];
    let result = extractor.extract(labels, true);

    it('should return undefined', () => expect(result).to.be.undefined);
});
