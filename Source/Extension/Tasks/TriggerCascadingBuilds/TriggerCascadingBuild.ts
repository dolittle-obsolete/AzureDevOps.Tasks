/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import {ICanTriggerCascadingBuild} from './ICanTriggerCascadingBuild';
import {gitCommitPush} from "git-commit-push-via-github-api";
import { randomBytes } from 'crypto';

/**
 * Represents an implementation of {ICanTriggerCascadingBuild} that trigger the next build of the cascade with an empty commit
 *
 * @export
 * @class GithubBuildTrigger
 * @implements {ICanTriggerCascadingBuild}
 */

export class TriggerCascadingBuild implements ICanTriggerCascadingBuild {
    async trigger(triggerMessage: string, repositoryName: string, token: string): Promise<void> {
        process.env.GITHUB_API_TOKEN = token;
        let [owner, repo] = repositoryName.split('/', 2);
        console.log(`Triggering cascade build on ${owner}/${repo} with trigger message '${triggerMessage}'`);
        await gitCommitPush({
            owner,
            repo,
            files: [
                { path: '.cascadingcommit', content: randomBytes(1)}
            ],
            fullyQualifiedRef: "heads/master",
            forceUpdate: true, // optional default = false
            commitMessage: triggerMessage
        });
    }    
}