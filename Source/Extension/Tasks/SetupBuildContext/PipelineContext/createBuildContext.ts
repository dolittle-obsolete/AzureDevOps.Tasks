/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { BuildContext } from "./BuildContext";
import taskLib = require('azure-pipelines-task-lib/task');

export function createBuildContext() {
    return {
        repositoryName: taskLib.getVariable('Build.Repository.Name'),
        repositoryProvider: taskLib.getVariable('Build.Repository.Provider'),
        sourceBranch: taskLib.getVariable('Build.SourceBranch') ,
        sourceBranchName: taskLib.getVariable('Build.SourceBranchName'),
        sourceVersion: taskLib.getVariable('Build.SourceVersion'),
        sourceVersionMessage: taskLib.getVariable('Build.SourceVersionMessage')
    } as BuildContext;
}
