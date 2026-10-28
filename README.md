# Type-Safe API Client

A reusable, type-safe API client built with **TypeScript**, **Zod**, **Next.js**, and **Vitest**.

This project demonstrates how to validate API requests and responses at runtime, handle different types of errors, and write automated tests for API client behavior without depending on a real backend.

## Features

- **Type-safe requests and responses** using TypeScript generics.
- **Runtime validation** of request bodies and API responses with Zod.
- **Separate schemas and DTOs** for Products, Users, and Orders.
- **Custom error classes** for different failure scenarios:
  - `ApiError` — HTTP errors.
  - `NetworkError` — network failures.
  - `ApiParseError` — invalid JSON responses.
  - `ApiValidationError` — invalid request bodies or API response data.
- **Reusable API client** to centralize request handling and validation.
- **Automated tests** with Vitest and mocked `fetch` responses.

## Tech Stack

- Next.js
- TypeScript
- Zod
- Vitest
- React Hook Form

## How It Works

The API client follows a consistent request lifecycle:

1. Validate the request body against its Zod schema, when provided.
2. Serialize valid request data to JSON.
3. Send the request using the Fetch API.
4. Handle HTTP and network errors.
5. Parse the JSON response.
6. Validate the response structure and data using Zod.
7. Return validated, typed data or throw a specific error.

## Example Usage

```ts
const result = await apiClient(
  'products',
  ProductsSchema
)

console.log(result.data)
```

For a POST request:

```ts
const result = await apiClient(
  'products',
  ProductSchema,
  CreateProductSchema,
  {
    method: 'POST',
    body: {
      name: 'Laptop',
      price: 3000,
      stock: 5,
      active: true,
    },
  }
)

console.log(result.data)
```

## Error Handling

The client uses custom error classes to distinguish between different failure scenarios. This allows consumers to handle errors consistently without duplicating request-handling logic.

## Testing

Vitest is used to test the API client independently of a real backend by mocking `fetch`.

The tests cover:

- Successful responses.
- HTTP errors.
- Network failures.
- Invalid JSON responses.
- Invalid API response data.
- Invalid request bodies.
- JSON serialization and request headers.

Run the tests with:

```bash
npm run test
```

## Project Goal

The goal of this exercise is to demonstrate reliable API communication through TypeScript type safety, runtime data validation, centralized error handling, and automated testing.

The API client and its tests focus on frontend behavior and do not require a real backend for the test scenarios.
