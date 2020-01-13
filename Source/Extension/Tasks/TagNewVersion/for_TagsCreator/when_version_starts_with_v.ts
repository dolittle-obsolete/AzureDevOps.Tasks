/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { a_tags_creator } from './given/a_tags_creator';
import { expect } from 'chai';

describe('when version is invalid semver', () => {
    const tags_creator = new a_tags_creator().tags_creator;
    const result = tags_creator.create('v1.0.0');

    it('should return a result', () => expect(result).to.not.be.undefined);
    it('should return a list with two elements', () => result.length.should.equal(2));
    it('should return a list where first element is 1.0.0', () => result[0].should.equal('1.0.0'));
    it('should return a list where second element is v1.0.0', () => result[1].should.equal('v1.0.0'));
});
