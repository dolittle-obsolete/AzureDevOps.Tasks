/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { NullLogger } from '@dolittle/azure-dev-ops.tasks.shared';
import { ReleaseTypeExtractor } from '../../ReleaseTypeExtractor';
import { IReleaseTypeExtractor } from '../../IReleaseTypeExtractor';

export class an_extractor {
    extractor: IReleaseTypeExtractor;

    constructor() {
        this.extractor = new ReleaseTypeExtractor(new NullLogger());
    }

}
