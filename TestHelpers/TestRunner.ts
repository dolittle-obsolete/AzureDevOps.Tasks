/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import ttm = require('azure-pipelines-task-lib/mock-test')

declare module 'azure-pipelines-task-lib/mock-test' {
    export interface MockTestRunner {
        hasOutputVariable(variable: string, value: string, isSecret?: boolean): boolean
        isMissingRequiredVariable(variable: string): boolean
        reportsIssue(issueMessage: string): boolean
    }
}
ttm.MockTestRunner.prototype.hasOutputVariable = function (variable: string, value: string, isSecret: boolean = false) {
    let self = this as ttm.MockTestRunner;
    return self.stdOutContained(`##vso[task.setvariable variable=${variable};issecret=${isSecret? 'true' : 'false'};]${value}`);
};

ttm.MockTestRunner.prototype.isMissingRequiredVariable = function (variable: string) {
    let self = this as ttm.MockTestRunner;
    return self.createdErrorIssue(`Input required: ${variable}`);
};

ttm.MockTestRunner.prototype.reportsIssue = function (issueMessage: string) {
    let self = this as ttm.MockTestRunner;
    return self.createdErrorIssue(issueMessage);
};
