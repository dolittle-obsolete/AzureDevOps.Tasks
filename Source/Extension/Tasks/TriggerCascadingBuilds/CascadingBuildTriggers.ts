/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { BuildContext, RepositoryProviders, ILogger } from '@dolittle/azure-dev-ops.tasks.shared';
import { ICanTriggerCascadingBuild } from './ICanTriggerCascadingBuild';
import { ICascadingBuildTriggers } from './ICascadingBuildTriggers';
import { GithubBuildTrigger } from './Github/GithubBuildTrigger';
import { ICascadingBuildMessageCreator } from './ICascadingBuildMessageCreator';
import { CascadingBuildMessageCreator } from './CascadingBuildMessageCreator';

/**
 * Represents an implementation of {ICascadingBuildTriggers}
 *
 * @export
 * @class CascadingBuildTriggers
 * @implements {ICascadingBuildTriggers}
 */
export class CascadingBuildTriggers implements ICascadingBuildTriggers {

    /**
     * Instantiates an instance of {CascadingBuildTriggers}.
     * @param {ICanTriggerCascadingBuild[]} [_triggers=[]]
     */
    constructor(private _messageCreator: ICascadingBuildMessageCreator, private _triggers: ICanTriggerCascadingBuild[] = []) {}

    static fromContext(logger: ILogger, buildContext: BuildContext, cascadingRepositories: string[], token?: string) {
        if (buildContext.repositoryProvider !== RepositoryProviders.GitHub) throw new Error(`Cannot make triggers from context ${buildContext}`);
        const triggers = cascadingRepositories.map(cascadingRepo => {
            const [owner, repo] = cascadingRepo.split('/', 2);
            return new GithubBuildTrigger(logger, owner, repo, token);
        });
        return new CascadingBuildTriggers(new CascadingBuildMessageCreator(), triggers);
    }

    async trigger(buildContext: BuildContext, version: string) {
        const triggers = this._triggers.filter(_ => _.canTrigger(buildContext));
        if (triggers.length === 0) throw new Error(`There are no trigger that can trigger build from context: ${buildContext}`);
        const triggerMessage = this._messageCreator.create(buildContext.repositoryName, version);
        await Promise.all(triggers.map(_ => _.trigger(triggerMessage)));
    }

}
