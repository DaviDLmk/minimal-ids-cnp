# IDS Contract Negotiation Protocol implementation

This repo contains an implementation for handling [IDS negotiation protocol](https://docs.internationaldataspaces.org/ids-knowledgebase/v/dataspace-protocol/contract-negotiation/contract.negotiation.protocol) messages and flows that respect the specifications using 
- Nodejs & typescript
- Express for the web server - https binding defined by the IDSA specs
- MongoDB / mongoose to manage contract negotiations

## Installation

1. Install Node.js LTS
2. Install MongoDB. The [Community MongoDB Compass GUI](https://www.mongodb.com/try/download/compass) tool is a nice to have for visualising collections and handles all the necessary mongoDB installs necessary for working with Mongo databases locally.
3. Install pnpm package manager
```bash
npm install -g pnpm
```
4. Install packages using pnpm
```bash
pnpm i
```
5. (Optionally) Configure your .env file. Postinstall copies the .env.sample to a .env file if not existent on your machine for a quick start.
6. Run the dev server
```bash
pnpm dev
```

## Recommendations for developers

### Simulating Provider & Consumer

The project has a configuration to optionally be able to run 2 instances on different ports, allowing to simulate having a provider & a consumer.

After running pnpm i, the postinstall script will copy over the .env.sample to .env and will do the same for .env.consumer and .env.provider.

- .env.consumer will be the env file for the consumer
- .env.provider will be the env file for the provider

Since both run on different ports it is possible to open 2 different terminals and run the following commands:

```bash
# First terminal
pnpm dev:provider

# Second terminal
pnpm dev:consumer
```

This will launch 2 instances from the same project running on different ports and watch changes as they are made in the src files.

> Note: Of course, it remains possible to work on a single instance if you prefer by running `pnpm dev`.

### Schemas and Examples

The IDS protocol uses Message Types that follow a certain shape.

#### Schemas
The IDS team set up a list of Schemas, defining the properties and their requirements in a [github repository located here](https://github.com/International-Data-Spaces-Association/ids-specification/tree/main/negotiation/message/schema). This can be used as references to validate types / interfaces / message properties for development.

#### Examples
Similarly, there is a list of examples for the different message types in the same github repository, [at this location](https://github.com/International-Data-Spaces-Association/ids-specification/tree/main/negotiation/message/example).

These SHOULD be used for testing the endpoints of this project. Tools like `Postman` can be used for this.

## Roadmap

- [x] Implement provider endpoints
- [ ] Implement consumer endpoints
