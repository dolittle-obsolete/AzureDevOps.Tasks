/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { SemVerVersionSorter } from "../SemVerVersionSorter";
import { expect } from "chai";

describe('when sorting a list of versions where one version is invalid', () => {
    let version_sorter = new SemVerVersionSorter();

    let valid_version = '2.0.0';
    let invalid_version = 'something1.1.0';
    let exception: Error;
    try {
        version_sorter.sort([valid_version, invalid_version]);
    }
    catch (error) {
        exception = error;
    }

    it('should throw an exception', () => expect(exception).to.not.undefined);
});
