/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import {ICanTriggerCascadingBuild} from './ICanTriggerCascadingBuild';
import {gitCommitPush} from "git-commit-push-via-github-api";

/**
 * Represents an implementation of {ICanTriggerCascadingBuild} that trigger the next build of the cascade with an empty commit
 *
 * @export
 * @class GithubBuildTrigger
 * @implements {ICanTriggerCascadingBuild}
 */

export class TriggerCascadingBuild implements ICanTriggerCascadingBuild {
    async trigger(triggerMessage: string, repositoryName: string, token: string): Promise<void> {
        let [owner, repo] = repositoryName.split('/', 2);
        await gitCommitPush({
            owner,
            repo,
            files: [],
            fullyQualifiedRef: "heads/master",
            forceUpdate: false, // optional default = false
            commitMessage: triggerMessage,
            token
        })
    }    
}