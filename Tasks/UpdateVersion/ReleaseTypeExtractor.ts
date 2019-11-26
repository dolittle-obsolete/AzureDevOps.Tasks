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
    
    extract(labels: string | undefined): ReleaseType | undefined {
        if (labels === undefined) return 'patch';
        let labelList = labels.split(',').map(_ => _.trim());
        let major = labelList.includes('major');
        let minor = labelList.includes('minor');
        let patch = labelList.includes('patch');
        let preview = labelList.includes('preview');
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
