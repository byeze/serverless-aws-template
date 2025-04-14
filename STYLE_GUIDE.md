### Project Style Guide

This style guide outlines the coding standards and best practices for this project. We use Biome for formatting and linting to ensure code quality and consistency.

#### Table of Contents

1. [General Guidelines](#general-guidelines)
2. [Code Formatting](#code-formatting)
3. [Linting](#linting)
4. [TypeScript](#typescript)
5. [Comments](#comments)
6. [File and Folder Structure](#file-and-folder-structure)
7. [Testing](#testing)
8. [Commit Messages](#commit-messages)

### General Guidelines

- Write clean, readable, and maintainable code.
- Follow the Single Responsibility Principle (SRP).
- Use meaningful and descriptive names for variables, functions, and classes.
- Avoid using magic numbers and strings; use constants instead.
- Keep functions and methods small and focused on a single task.
- Use ES6+ features where applicable.

### Code Formatting

We use Biome for code formatting. Ensure that your code is formatted correctly before committing.

#### Biome Configuration

Create a `.biomerc.json` file in the root of your project with the following content:

```json
{
  "formatter": {
    "lineWidth": 80,
    "indentStyle": "space",
    "indentWidth": 2,
    "quoteStyle": "double",
    "trailingComma": true,
    "semiColons": true
  },
  "linter": {
    "rules": {
      "suspicious/noConfusingVoidType": "error",
      "suspicious/noUnusedVariables": "error",
      "suspicious/noUnusedExpressions": "error",
      "style/noEmptyFunction": "error",
      "style/noMagicNumbers": "warn",
      "style/noVar": "error",
      "style/preferConst": "error",
      "style/preferTemplate": "error",
      "style/sortImports": "error"
    }
  }
}
```

#### Running Biome

To format your code, run:

```sh
npx biome format
```

To lint your code, run:

```sh
npx biome lint
```

### Linting

Linting helps catch potential errors and enforce coding standards. We use Biome for linting.

- Fix all linting errors before committing your code.
- Use the provided `.biomerc.json` configuration for linting rules.

### TypeScript

- Use TypeScript for type safety and better code quality.
- Define types and interfaces for function parameters and return values.
- Use `unknown` instead of `any` where applicable.
- Prefer `const` and `let` over `var`.
- Use `readonly` for properties that should not be modified after initialization.

### Comments

- Use JSDoc for function and class documentation.
- Write meaningful comments that explain the "why" behind the code.
- Avoid redundant comments that explain the "what" the code is doing.

#### Example

```ts
/**
 * Middleware to transform the JSON body of an incoming request.
 * Parses `event.body` into a JavaScript object if it is a JSON string.
 * @param {APIGatewayProxyEvent} event - The API Gateway event object.
 * @returns {Promise<void>}
 * @throws {HttpErrors.BadRequest} If the JSON body is invalid.
 */
const jsonBodyTransformer = async (
  event: APIGatewayProxyEvent,
): Promise<void> => {
  // Implementation
};
```

### File and Folder Structure

- Organize files by feature or module.
- Use meaningful names for files and folders.
- Follow the convention of lowercase and hyphen-separated names for files and folders.

#### Example Structure

```
src/
  application/
    services/
      helloWorld.service.ts
  domain/
    entities/
      helloWorld.entity.ts
  infrastructure/
    repositories/
      helloWorld.repository.ts
  presentation/
    middlewares/
      cors.middleware.ts
      errorHandler.middleware.ts
      httpLambda.middleware.ts
      httpLogger.middleware.ts
      jsonBodyTransformer.middleware.ts
      jwt.middleware.ts
  utils/
    apiGateway.utils.ts
    httpErrors.utils.ts
    logger.utils.ts
    jwt.utils.ts
  handlers/
    helloWorld.ts
```

### Testing

- Write tests for all new features and bug fixes.
- Use Jest for testing.
- Organize test files alongside the files they test or in a separate `tests` directory.
- Use descriptive names for test cases.

#### Example Test File

```ts
// src/presentation/middlewares/jsonBodyTransformer.middleware.test.ts

import jsonBodyTransformer from "./jsonBodyTransformer.middleware";
import HttpErrors from "@/utils/httpErrors.utils";
import type { APIGatewayProxyEvent } from "aws-lambda";

describe("jsonBodyTransformer", () => {
  it("should parse JSON body", async () => {
    const event = {
      headers: { "Content-Type": "application/json" },
      body: '{"key": "value"}',
    } as APIGatewayProxyEvent;

    await jsonBodyTransformer(event);

    expect(event.body).toEqual({ key: "value" });
  });

  it("should throw error for invalid JSON", async () => {
    const event = {
      headers: { "Content-Type": "application/json" },
      body: "invalid-json",
    } as APIGatewayProxyEvent;

    await expect(jsonBodyTransformer(event)).rejects.toThrow(
      HttpErrors.BadRequest,
    );
  });
});
```

### Commit Messages

- Write clear and concise commit messages.
- Use the present tense ("Add feature" not "Added feature").
- Use the imperative mood ("Move cursor to..." not "Moves cursor to...").
- Include the issue number if applicable.

#### Example

```
feat: Add JSON body transformer middleware

- Add middleware to parse JSON body in API Gateway events
- Handle invalid JSON with a BadRequest error
```
