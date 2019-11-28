/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import {ReleaseTypeExtractor} from '../ReleaseTypeExtractor'

describe('when extracting and it is not a pull request', () => {
    let extractor = new ReleaseTypeExtractor();
    let result = extractor.extract(['major'], false);

    it('should return patch', () => result!.should.be.equal('patch'));
});
