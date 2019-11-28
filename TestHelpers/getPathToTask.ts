/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import path from 'path';
import { existsSync } from 'fs';

export function getPathToTask(taskName: string) {
    let taskPath = path.resolve(__dirname, '..', '..', 'Extension', 'Distribution', 'Tasks', taskName, 'task.js');
    if (!existsSync(taskPath)) throw new Error(`There is no task called ${taskName}`)
    return path.resolve(__dirname, '..', '..', 'Tasks', taskName, 'Distribution', 'index.js');
}
