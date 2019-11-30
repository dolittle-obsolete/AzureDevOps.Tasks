/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { SemVerVersionSorter } from "../SemVerVersionSorter";

describe('when sorting empty list', () => {
    let version_sorter = new SemVerVersionSorter();
    let res = version_sorter.sort([]);
    it('should return an empty list', () => res.should.be.empty);
});