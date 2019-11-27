/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import taskLib = require('azure-pipelines-task-lib/task');
import path from 'path';
import { ReleaseTypeExtractor } from './ReleaseTypeExtractor';
import { VersionIncrementor } from './VersionIncrementor';
import { GithubPullRequestChecker } from 'GithubPullRequestChecker';

const VERSION_NOT_SET = 'NOT_SET';

taskLib.setResourcePath(path.resolve(__dirname, '..', 'task.json'));

async function run() {
    try {
        const releaseTypeExtractor = new ReleaseTypeExtractor();
        const versionIncrementor = new VersionIncrementor();
        const pullRequestChecker = new GithubPullRequestChecker
        const version = taskLib.getInput('version', true)!;
        const labels = taskLib.getDelimitedInput('labels', ',');
        const sourceBranch = taskLib.getVariable('Build.SourceBranch')!;

        taskLib.debug(`Got version ${version}`);
        taskLib.debug(`Got labels: ${labels}`);
        taskLib.debug(`Got sourceBranch: ${sourceBranch}`);

        let isPullRequest = pullRequestChecker.check(sourceBranch);

        let releaseType = releaseTypeExtractor.extract(labels, isPullRequest);
        if (releaseType === undefined) {
            taskLib.setVariable('Version', VERSION_NOT_SET);
            taskLib.setResult(taskLib.TaskResult.Succeeded, `There were no labels denoting a new version. Version output set to '${VERSION_NOT_SET}'`);
            return;
        }
        taskLib.debug(`Updating version for new ${releaseType}`);
        let newVersion = versionIncrementor.increment(version, releaseType);

        taskLib.setVariable('Version', newVersion);
        taskLib.setResult(taskLib.TaskResult.Succeeded, `Successfully updated version from '${version}' to ${newVersion}`);
    }
    catch (err) {
        taskLib.setResult(taskLib.TaskResult.Failed, err.message);
    }
}

run();