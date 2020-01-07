/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { a_sorter } from './given/a_sorter';

describe('when sorting empty list', () => {
    const version_sorter = new a_sorter().sorter;
    const res = version_sorter.sort([]);
    it('should return an empty list', () => res.should.be.empty);
});
