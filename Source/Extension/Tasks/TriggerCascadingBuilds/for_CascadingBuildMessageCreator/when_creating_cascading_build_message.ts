/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { CascadingBuildMessageCreator } from '../CascadingBuildMessageCreator';

describe('when doing something', () => {
    const cascading_build_message_creator = new CascadingBuildMessageCreator();
    const repo = 'some/repo';
    const version = '1.0.0';
    const result = cascading_build_message_creator.create(repo, version);
    it('should create the correct message', () => result.should.equal(`[Cascading release] ${repo} released ${version}`));
});
