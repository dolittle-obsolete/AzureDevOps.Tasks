This Source contains the source code and configurations for the Dolittle Pipeline Tasks extension.

## Pre requisites
* Node >= 10
* npm
* yarn
* tfx cli - For creating the extension.
```bash
npm i -g tfx-cli
```

## Extensions and Tasks

### Extension
An extension is an versioned tool or set of tools that can be published to the Azure DevOps marketplace by a publisher and installed by others. It can be set to be a public or a private extension that can be shared to specific organizations.

The extension is described by its configuration file 'vss-extension.json'. You can read about the configuration [here](https://docs.microsoft.com/en-us/azure/devops/extend/develop/manifest?view=azure-devops). For this extension it is important to note the 'files' and the 'contributions' fields. 
* The 'files' field is where you tell the extension which files and folders are included.
* For each Task in the extension there is a contribution object in the 'contributions' list.
* 'type' and 'targets' denote what kind of contribution it is.
* 'id' is unique for each contribution and is typically the name of the Task
* 'properties' is an object with one field called 'name' which is the relative path to the folder of the Task. Note that the file or folder that the relative path describes already needs to be included in the extension using the 'files' field. 

The extension is just a compressed file which contains
* 'vss-extension.json'
* The files pointed to in the 'content' field
* The files and folders in the 'files' field

### Task
A Task is an executable that can be run in a Azure DevOps Pipeline. It can have inputs, outputs, use [pre-defined variables](https://docs.microsoft.com/en-us/azure/devops/pipelines/build/variables?view=azure-devops&tabs=yaml), succeed, fail or be skipped.

All tasks needs to have a configuration file called 'task.json'. You can read about the schema [here](https://github.com/microsoft/azure-pipelines-task-lib/blob/master/tasks.schema.json). The important fields are:
* 'id' - A GUID unique for each Task
* 'name' - The name of the Task
* 'version' - The current version of the task
* 'execution' - Describes how to run the task. (For Node there is a field called either 'Node' or 'Node10' denoting which version of Node to use, which has a field called 'target' which is the relative path to the executable Task file. Also important to note that this relative path needs to be the actual path to the executable in the packed extension.)

There are many different ways of writing custom Tasks. They can, for example, be PowerShell scripts or Node projects. This extension consists of Tasks as Node projects, written in TypeScript.

A Node-based task needs a 'package.json' describing its dependencies, where the "azure-pipelines-task-lib" dependency and the "@types/q" and "sync-request" devDependencies are required for development.

The version of the Task is important. It seems like the Build Agent stores the tasks by version. So publishing a new version of the Extension with Tasks where the version has previously been released seems to not overwrite the Task of that version on the Build Agent. Incrementing a version of a Task triggers the Build Agent to store a new version of that Task with the content of that Task contribution found in the packed extension. Therefore it is important to ensure that the Task has actually been built (using the custom script: yarn extension:build) before you publish a new version of the Task.

#### Development
When writing tasks we should strive to adhere to [SOLID](https://itnext.io/solid-principles-explanation-and-examples-715b975dcad4). Separate the logic of the Task out from the executable of the Task. The executable should only define the pipeline of the Task, getting inputs and setting outputs and the result of the Task. By sticking to the SOLID principles it makes it easy to test and maintain. 

#### Tests
For Tasks we have separated the specs / tests into two different categories:
* Specs testing the logic and components of the Task. They are normal mocha tests sitting together with the source files of the Task. They are supposed to test the actual logic of the Task, so the components being tested should not have dependencies to the executable Task.
* Specs testing the execution of a Task from start to finish. These tests are kind of special as they mock out the execution of a Task where you can give it inputs and set up the variables. It's kinda hard to explain how it works, but you can look at TestRunnerTests/CalculateNewVersion for examples on how this works. Note that there is no direct dependency between a TestRunner test and the actual Task that it tests.

The reason that these tests are separated is that the tests for the execution of a Task does not work well with wallaby for some reason. It might be worth coming back and improving this later.

There are also some problems currently with wallaby, so for now we rely on the 'yarn test' script for running the specs.

## Structure
* The 'Extension' folder contains the actual code and configurations for the extension.
* The 'Tasks' folder contains a folder for each Task. which are node packages. Each Task is a TypeScript project with source files and specs.
* The 'Shared' folder currently consists of a single Node package which has common building blocks for the Tasks. The Tasks have a dependency on that shared package, specifically a specific version of the packaged 'shared' project. The dependency looks like this:
```json
{
    "dependencies": {
        "@dolittle/azure-dev-ops.tasks.shared": "../../Shared/dolittle-azure-dev-ops.tasks.shared-<version>.tgz"
    }
}
```
So prior to publishing a new version of a Task it will attempt to install that dependency. The shared folder needs to have the packed file that the Tasks are asking for. You can pack the project by being in the root of 'Shared' and do 
```bash
npm pack 
```
Since we ignore the packaged .tgz files for git the Tasks should always use the latest version of the shared package. 

Outside the 'Extension there are two other folders called 'TestHelpers' and 'TestRunnerTests'.
* 'TestRunnerTests' contains the tests that runs mocked instances of the Tasks. There should be a folder for each Task
* 'TestHelpers' contains helper functions for the TestRunnerTests
All of this should be improved later as it is not that easy to work with.

## Development and Publishing life cycle
You can work on one or multiple Tasks at the same time. Before development you should make sure that all the dependencies are installed by running:
```bash
yarn
```

When changes has been made to a Task and you wish to publish you need to increment the version of the Task(s) appropriately reflecting the type of the change (major, minor, patch). Then you can run the custom script:
```bash
yarn extension:build
```
This script installs all the dependencies, builds and runs the specs, deletes the specs, deletes the node_modules and yarn.lock and finally installs the dependencies in production mode. The reason for deleting and reinstalling the dependencies is that we don't want to include all the devDependencies in the finalized packaged extension. When the Tasks that has been modified have had their versions incremented and been built using the extension:build script you can finally increment the version of the extension in 'vss-extension.json' and execute the command:
```bash
tfx extension create --manifests vss-extension.json
```
from the root of the 'Extension' folder. That command produces a .vsix file which then can be published by uploading it or updating the extension [here](https://marketplace.visualstudio.com/manage/publishers/dolittle) given that you have permission to do so.