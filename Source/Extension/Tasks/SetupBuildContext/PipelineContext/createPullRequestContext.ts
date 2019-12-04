/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { PullRequestContext } from "./PullRequestContext";
import taskLib = require('azure-pipelines-task-lib/task');

export function createPullRequestContext() {
    let pullRequestNumberString = taskLib.getVariable('System.PullRequest.PullRequestNumber');
    const pullRequestNumber = pullRequestNumberString === undefined? 
        pullRequestNumberString
        : parseInt(pullRequestNumberString);
    return {
        pullRequestNumber,
        sourceCommitId: taskLib.getVariable('System.PullRequest.SourceCommitId'),
        sourceBranch: taskLib.getVariable('System.PullRequest.SourceBranch') ,
        targetBranch: taskLib.getVariable('System.PullRequest.TargetBranch'),
        
    } as PullRequestContext;
}
