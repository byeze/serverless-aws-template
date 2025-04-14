# AWS Serverless Scalable API Template

Welcome to the AWS Serverless Scalable API Template! This template provides a robust and scalable foundation for building serverless APIs using AWS services. It is designed to help you quickly set up and deploy a serverless application with best practices in mind.

## Table of Contents

- [Features](#features)
- [Directory Structure](#directory-structure)
- [Getting Started](#getting-started)
- [Configuration](#configuration)
- [Scripts](#scripts)
- [Dependencies](#dependencies)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Serverless Framework**: Leverage the power of the Serverless Framework to manage and deploy your AWS resources.
- **TypeScript**: Write your code in TypeScript for better type safety and developer experience.
- **Modular Architecture**: Organized directory structure to keep your codebase clean and maintainable.
- **Testing**: Pre-configured with Jest for unit and integration testing.
- **Middleware**: Common middlewares like CORS, error handling, and JWT authentication.
- **Environment Configuration**: Separate configurations for different environments (development, staging, production).

## Directory Structure

```plaintext
.
├── biome.json
├── jest.config.js
├── package.json
├── pnpm-lock.yaml
├── README.md
├── serverless.ts
├── src
│   ├── application
│   │   └── services
│   │       └── helloWorld.service.ts
│   ├── config
│   │   ├── customConfig.ts
│   │   ├── environment
│   │   │   ├── dev.config.ts
│   │   │   ├── index.ts
│   │   │   ├── prod.config.ts
│   │   │   └── staging.config.ts
│   │   ├── environmentConfig.ts
│   │   ├── permissions
│   │   │   └── iamConfig.ts
│   │   ├── providers
│   │   │   ├── domainConfig.js
│   │   │   ├── providerConfig.ts
│   │   │   └── stackTagsConfig.ts
│   │   └── resources
│   │       ├── authorizerResources.ts
│   │       ├── index.ts
│   │       └── secretsResources.ts
│   ├── constants
│   │   ├── aws.constant.ts
│   │   ├── error.constant.ts
│   │   └── secrets.constant.ts
│   ├── domain
│   │   ├── entities
│   │   │   └── helloWorld.entity.ts
│   │   ├── interfaces
│   │   │   └── HelloWorld.repository.ts
│   │   └── value-objects
│   ├── infrastructure
│   │   ├── adapters
│   │   ├── factories
│   │   └── repositories
│   │       ├── database
│   │       │   └── seeds
│   │       └── helloWorld.repository.ts
│   ├── presentation
│   │   ├── functions
│   │   │   ├── helloWorld
│   │   │   │   └── getHello
│   │   │   │       ├── handler.ts
│   │   │   │       └── index.ts
│   │   │   └── index.ts
│   │   ├── middlewares
│   │   │   ├── cors.middleware.ts
│   │   │   ├── errorHandler.middleware.ts
│   │   │   ├── httpLambda.middleware.ts
│   │   │   ├── httpLogger.middleware.ts
│   │   │   ├── index.ts
│   │   │   ├── jsonBodyTransformer.middleware.ts
│   │   │   └── jwt.middleware.ts
│   │   └── schemas
│   ├── tests
│   │   ├── integration
│   │   └── unit
│   │       ├── domain
│   │       │   ├── entities
│   │       │   │   └── helloWorld.entity.test.ts
│   │       │   └── value-objects
│   │       ├── infrastructure
│   │       │   └── repositories
│   │       │       └── helloWorld.repository.test.ts
│   │       └── presentation
│   │           └── middlewares
│   │               ├── cors.middleware.test.ts
│   │               ├── errorHandler.middleware.test.ts
│   │               ├── httpLogger.middleware.test.ts
│   │               └── jsonBodyTransformer.middleware.test.ts
│   ├── types
│   │   ├── env.d.ts
│   │   ├── middlewares
│   │   │   └── cors.middleware.types.ts
│   │   ├── repositories
│   │   └── serverless.types.ts
│   └── utils
│       ├── apiGateway.utils.ts
│       ├── httpErrors.utils.ts
│       ├── jwt.utils.ts
│       ├── logger.utils.ts
│       └── serverless.utils.ts
├── STYLE_GUIDE.md
├── tsconfig.json
└── tsconfig.paths.json
```

## Getting Started

### Prerequisites

- Node.js (>=20.x)
- pnpm (>=8.x)
- AWS CLI configured with appropriate credentials

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/byeze/aws-serverless-api-template.git
   cd aws-serverless-api-template
   ```

2. Install dependencies:

   ```bash
   pnpm install
   ```

### Running Locally

To run the application locally, use the following command:

```bash
pnpm start
```

### Deploying to AWS

To deploy the application to AWS, use the following command:

```bash
pnpm deploy
```

## Configuration

Configuration files are located in the `src/config` directory. You can set up different configurations for different environments (development, staging, production) by modifying the respective files in the `src/config/environment` directory.

## Scripts

- `pnpm start`: Run the application locally.
- `pnpm deploy`: Deploy the application to AWS.
- `pnpm test`: Run all tests.
- `pnpm lint`: Lint the codebase using the configured linter.

## Dependencies

- `jsonwebtoken`: For handling JSON Web Tokens (JWT).
- `undici`: A modern HTTP client for Node.js.
- `winston`: A versatile logging library.
- `zod`: A TypeScript-first schema declaration and validation library.

## Contributing

We welcome contributions! Please read our [Contributing Guide](CONTRIBUTING.md) to learn how you can contribute to this project.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

---

Thank you for using the AWS Serverless Scalable API Template! If you have any questions or feedback, feel free to open an issue or submit a pull request. Happy coding! 🚀
