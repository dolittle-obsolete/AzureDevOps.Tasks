/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import {ReleaseTypeExtractor} from '../ReleaseTypeExtractor'
import { expect } from 'chai';

describe('when extracting from string with multiple release types', () => {
    let extractor = new ReleaseTypeExtractor();
    let labels = ['major','minor'];

    let release_type = extractor.extract(labels);

    it('should return a release type', () => expect(release_type).to.not.be.undefined);
    it('should return major', () => release_type!.should.equal('major'));
});
