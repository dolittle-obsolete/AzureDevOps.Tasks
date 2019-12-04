/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { a_sorter } from "./given/a_sorter";

describe('when sorting list with one valid version', () => {
    let version_sorter = new a_sorter().sorter;
    let version = '1.0.0';
    let res = version_sorter.sort([version]);
    it('should return a list with 1 element', () => res.should.have.lengthOf(1));
    it('should return a list with the version', () => res.should.include(version));
});
