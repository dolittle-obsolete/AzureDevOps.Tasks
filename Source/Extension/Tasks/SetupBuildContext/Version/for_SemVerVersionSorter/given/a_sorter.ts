/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { NullLogger } from "@dolittle/azure-dev-ops.tasks.shared";
import { SemVerVersionSorter } from "../../SemVerVersionSorter";
import { IVersionSorter } from "../../IVersionSorter";

export class a_sorter {
    sorter: IVersionSorter;
    constructor() {
        this.sorter = new SemVerVersionSorter(new NullLogger());
    }
}