/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { SemVerVersionSorter } from "../SemVerVersionSorter";

describe('when sorting list with one valid version', () => {
    let version_sorter = new SemVerVersionSorter();
    let version = '1.0.0';
    let res = version_sorter.sort([version]);
    it('should return a list with 1 element', () => res.should.have.lengthOf(1));
    it('should return a list with the version', () => res.should.include(version));
});
