/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import {ReleaseTypeExtractor} from '../ReleaseTypeExtractor'

describe('when extracting from undefined string', () => {
    let extractor = new ReleaseTypeExtractor();
    let result = extractor.extract(undefined as any, true);

    it('should return patch', () => result!.should.be.equal('patch'));
});
