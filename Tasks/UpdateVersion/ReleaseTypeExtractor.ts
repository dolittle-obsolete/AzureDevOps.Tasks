/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { ReleaseType } from "semver";
import { IReleaseTypeExtractor } from "./IReleaseTypeExtractor";

/**
 * Represents an implementation of {IReleaseTypeExtractor}
 *
 * @export
 * @class ReleaseTypeExtractor
 * @implements {IReleaseTypeExtractor}
 */
export class ReleaseTypeExtractor implements IReleaseTypeExtractor {
    
    extract(labels: string[], isPullRequest: boolean): ReleaseType | undefined {
        if (labels === undefined || !isPullRequest) return 'patch';
        labels = labels.map(_ => _.trim());
        let major = labels.includes('major');
        let minor = labels.includes('minor');
        let patch = labels.includes('patch');
        let preview = labels.includes('preview');
        let releaseLabelBoolList = [major, minor, patch, preview];
        
        this._throwIfMultipleReleaseLabels(releaseLabelBoolList);

        if (major) return 'major';
        else if (minor) return 'minor';
        else if (patch) return 'patch';
        else if (preview) return 'prerelease';
        return undefined;
    }
    private _throwIfMultipleReleaseLabels(releaseLabelBoolList: boolean[]) {
        if (releaseLabelBoolList.filter(_ => _).length > 1)
            throw new Error('There are multiple release labels');
    }
}
