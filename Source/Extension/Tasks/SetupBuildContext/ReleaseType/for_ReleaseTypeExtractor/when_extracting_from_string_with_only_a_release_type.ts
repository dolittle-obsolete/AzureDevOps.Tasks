/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { an_extractor } from './given/an_extractor';

describe('when extracting from string with only a release type', () => {
    let extractor = new an_extractor().extractor;
    let labels = ['major'];
    let result = extractor.extract(labels);

    it('should return major', () => result!.should.be.equal('major'));
});
