---
title: Authentication
sidebar_position: 3
---

# Authentication

The Delhivery API uses **token-based authentication**. Every request is sent with an HTTP header:

```
Authorization: Token <your_token>
```

The SDK handles this for you automatically — you just pass the token once when constructing the client.

## Getting your token

1. Log in to the [Delhivery One developer portal](https://one.delhivery.com/developer-portal).
2. Navigate to **API Credentials**.
3. Copy your **API Token**.

Separate tokens exist for the **staging** and **production** environments. Never use a production token in development.

## Storing the token securely

Never hard-code API tokens. Use environment variables:

```typescript
// .env
DELHIVERY_TOKEN=your_token_here

// client setup
import { DelhiveryClient } from "delhivery-sdk";

const client = new DelhiveryClient({
  token: process.env.DELHIVERY_TOKEN!,
});
```

## Error on invalid token

If your token is wrong or expired the SDK throws `DelhiveryAuthError`:

```typescript
import { DelhiveryClient, DelhiveryAuthError } from "delhivery-sdk";

try {
  const result = await client.tracking.trackOne("ABC123");
} catch (err) {
  if (err instanceof DelhiveryAuthError) {
    console.error("Invalid token — check your credentials.");
  }
}
```
