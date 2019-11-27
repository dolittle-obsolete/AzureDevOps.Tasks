/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
const build = require('@dolittle/typescript.build');

module.exports = build.wallaby((w, settings) => {

    let hasPatternToIgnore = (_) => {
        let pattern = _.pattern || _;

        return !pattern.includes('package.json') 
            && (pattern.includes('TestRunnerTests') || pattern.includes('TestHelpers'));
    };
    settings.files = settings.files.filter(_ => !hasPatternToIgnore(_))
    settings.tests = settings.tests.filter(_ => !hasPatternToIgnore(_))
});