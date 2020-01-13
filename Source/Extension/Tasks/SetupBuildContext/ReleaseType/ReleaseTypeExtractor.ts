/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { ReleaseType } from 'semver';
import { IReleaseTypeExtractor } from './IReleaseTypeExtractor';
import { ILogger } from '@dolittle/azure-dev-ops.tasks.shared';

/**
 * Represents an implementation of {IReleaseTypeExtractor}
 *
 * @export
 * @class ReleaseTypeExtractor
 * @implements {IReleaseTypeExtractor}
 */
export class ReleaseTypeExtractor implements IReleaseTypeExtractor {

    /**
     * Instantiating an instance of {ReleaseTypeExtractor}.
     * @param {ILogger} _logger
     */
    constructor(private _logger: ILogger) {}

    extract(labels: string[]): ReleaseType | undefined {
        if (labels === undefined) return undefined;
        this._logger.debug(`Extracting release type from list of labels: [${labels.join(', ')}]`);
        labels = labels.map(_ => _.trim());

        const major = labels.includes('major');
        const minor = labels.includes('minor');
        const patch = labels.includes('patch');
        const preview = labels.includes('preview');

        if (major) return 'major';
        else if (minor) return 'minor';
        else if (patch) return 'patch';
        else if (preview) return 'prerelease';
        return undefined;
    }

}
