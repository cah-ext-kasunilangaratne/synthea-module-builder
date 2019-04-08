# Proxi<sup>TM</sup> Model Builder

The Proxi<sup>TM</sup> Model Builder is a visual editor for creating and modifying  [Synthea<sup>TM</sup> Patient Generator](https://synthetichealth.github.io/module-builder) models using the
[Synthea<sup>TM</sup> Generic Model Framework](https://github.com/synthetichealth/synthea/wiki/Generic-Module-Framework).
It supports the entire Generic Model Framework specification and allows users to create full-featured models
without needing to directly edit JSON files.  It is preloaded with all models contained within the current
[Synthea<sup>TM</sup> Github Repository](https://github.com/synthetichealth/synthea).  Users can either edit these models
or create new ones to extend the capabilities of Synthea<sup>TM</sup>.
 
## Getting Started

Users are encouraged to use the hosted version of the Model Builder: 

https://synthetichealth.github.io/module-builder/

If you are new to authoring Proxi<sup>TM</sup> models, please review the [Generic Model Framework (GMF) Documentation](https://github.com/synthetichealth/synthea/wiki/Generic-Module-Framework).
Some familiarity with the GMF is required before beginning the authoring process.

## Local Installation

Local installation typically is not necessary, unless you plan on contributing improvements the Model Builder itself.
It is written in Javascript using React and requires [Node.js](https://nodejs.org/) to run locally. Once Node.js is installed,
run the following commands to run a local copy of the Model Builder:

1. Install dependencies

```bash
npm install
```

2. Run API Server & React Client

```bash
npm start
```

This will start a local copy running at `http://localhost:3000/`

## Saving Models

Models created and edited through the Model Builder must be downloaded and saved as a JSON file.
The Model Builder currently does not persist local changes across browser sessions, so do not close or navigate
away from the page without first saving your work as a local file first.  Click the `Download` button at the
top of the interface, and you can either copy the JSON in the modal text box, or click the `Download` button on the bottom
of the modal to save as a local file.

Once saved as a JSON file (using the `.json` extension), you can use the model within your own local installation of Synthea.
See the [Generic Model Framework](https://github.com/synthetichealth/synthea/wiki/Generic-Module-Framework#relevant-files-and-paths) for information on where to place the file.

## Developer Tasks

The following information is only relevant to developers improving the Module Builder itself.


### Synchronizing Generic models in Proxi

This application currently embeds all generic models within the application.  In order to 
update these models to match the most recent ones available in the Synthea repository,
run the `build-modules` script, pointing to the modules directory within a local copy of `Synthea`.

```sh
npm run build-modules ../synthea/src/main/resources/modules # Point to the models directory of synthea
git status # This should have changed ./src/data/modules.js
npm test # Run tests to ensure the new models file valid
```

### Running Tests

To run tests on the Model Builder, execute the following command: 

```sh
npm test
```

### Deploying Updated Version of Synthea

If you have administrative access to the Generic Model Builder repository, you can deploy updates to 
the [Module Builder site](https://synthetichealth.github.io/module-builder/).  Before deploying,
you should consider synchronizing the models in the repository and must run the tests.

```sh
npm run deploy
```

This updates the `gh-pages` branch on the repository with the new build, and changes will be reflected on the
site within a few minutes.


# License

Copyright 2016-2018 The MITRE Corporation

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
