/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { SemVerVersionSorter } from "../SemVerVersionSorter";

describe('when sorting list with three unordered versions with and without v in front', () => {
    let version_sorter = new SemVerVersionSorter();
    let version1 = 'v2.0.0';
    let version2 = '1.1.0';
    let version3 = 'v1.0.0';
    let res = version_sorter.sort([version2, version3, version1]);
    it('should return a list with three elements', () => res.should.have.lengthOf(3));
    it('should return biggest version as the first element ', () => res[0].should.equal(version1));
    it('should return second biggest version as the second element', () => res[1].should.equal(version2));
    it('should return third biggest version as the third element', () => res[2].should.equal(version3));
});
