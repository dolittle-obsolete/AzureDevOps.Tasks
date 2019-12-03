/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import ma = require('azure-pipelines-task-lib/mock-answer');

const answers = <ma.TaskLibAnswers>{
    'getVariable': {
        'System.PullRequest.PullRequestNumber': '1',
        'System.PullRequest.SourceCommitId': 'some-other-id',
        'System.PullRequest.SourceBranch': 'some-branch',
        'System.PullRequest.TargetBranch': 'master',

        'Build.Repository.Name': 'org/repo-name',
        'Build.Repository.Provider': 'Github',
        'Build.SourceBranch': 'refs/pulls/1/merge',
        'Build.SourceBranchName': 'merge',
        'Build.SourceVersion': 'some-id',
        'Build.SourceVersionMessage': 'some-commit-message'
    }
};
export default answers;
