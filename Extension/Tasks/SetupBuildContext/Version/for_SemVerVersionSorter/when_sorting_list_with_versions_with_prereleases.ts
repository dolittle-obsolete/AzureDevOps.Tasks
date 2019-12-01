/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { SemVerVersionSorter } from "../SemVerVersionSorter";

describe('when sorting list with versions with prereleases', () => {
    let version_sorter = new SemVerVersionSorter();
    let version1 = '2.0.0-preview.2';
    let version2 = '2.0.0-preview.1';
    let version3 = '2.0.0-beta.2';
    let version4 = '2.0.0-beta.1';
    let version5 = '2.0.0-alpha.2';
    let version6 = '2.0.0-alpha.1';
    let res = version_sorter.sort([version2, version3, version1, version5, version4, version6], true);
    it('should return a list with three elements', () => res.should.have.lengthOf(6));
    it('should return biggest version as the first element ', () => res[0].should.equal(version1));
    it('should return second biggest version as the second element', () => res[1].should.equal(version2));
    it('should return third biggest version as the third element', () => res[2].should.equal(version3));
    it('should return biggest version as the first element ', () => res[3].should.equal(version4));
    it('should return second biggest version as the second element', () => res[4].should.equal(version5));
    it('should return third biggest version as the third element', () => res[5].should.equal(version6));

});
