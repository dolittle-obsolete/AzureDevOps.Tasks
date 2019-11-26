/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import path from 'path';

export default function get_path_to_task(task_name: string) {
    return path.resolve(__dirname, '..', '..', 'Tasks', task_name, 'Distribution', 'index.js');
}