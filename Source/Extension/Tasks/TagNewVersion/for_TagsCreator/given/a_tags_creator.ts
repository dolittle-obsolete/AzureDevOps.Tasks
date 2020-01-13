/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { NullLogger } from '@dolittle/azure-dev-ops.tasks.shared';
import { ITagsCreator } from '../../ITagsCreator';
import { TagsCreator } from '../../TagsCreator';

export class a_tags_creator {
    tags_creator: ITagsCreator;
    constructor() {
        this.tags_creator = new TagsCreator(new NullLogger());
    }
}
