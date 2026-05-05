---
title: Error Handling
sidebar_position: 4
---

# Error Handling

The SDK throws typed errors that you can catch and inspect.

## Error types

| Class | When thrown |
|---|---|
| `DelhiveryError` | Generic API error (4xx/5xx) |
| `DelhiveryAuthError` | 401/403 — invalid or expired token |
| `DelhiveryRateLimitError` | 429 — too many requests |
| `DelhiveryNetworkError` | Network failure (timeout, DNS, etc.) |

All classes are exported from `delhivery-sdk`.

## Catching specific errors

```typescript
import {
  DelhiveryClient,
  DelhiveryAuthError,
  DelhiveryRateLimitError,
  DelhiveryNetworkError,
  DelhiveryError,
} from "delhivery-sdk";

const client = new DelhiveryClient({ token: process.env.DELHIVERY_TOKEN! });

try {
  const data = await client.tracking.trackOne("1234567890");
} catch (err) {
  if (err instanceof DelhiveryAuthError) {
    console.error("Check your API token.");
  } else if (err instanceof DelhiveryRateLimitError) {
    console.error("Slow down — rate limit hit.");
  } else if (err instanceof DelhiveryNetworkError) {
    console.error("Network issue:", err.message);
  } else if (err instanceof DelhiveryError) {
    console.error(`API error ${err.statusCode}:`, err.message, err.raw);
  } else {
    throw err; // unexpected
  }
}
```

## Inspecting the raw response

`DelhiveryError` exposes the raw API response body as `err.raw`:

```typescript
} catch (err) {
  if (err instanceof DelhiveryError) {
    console.log(err.statusCode); // 422
    console.log(err.raw);        // { error: "Invalid pincode" }
  }
}
```

## Retrying with exponential back-off

For transient errors (network timeouts, 5xx), implement a simple retry wrapper:

```typescript
async function withRetry<T>(
  fn: () => Promise<T>,
  retries = 3,
): Promise<T> {
  for (let attempt = 0; attempt < retries; attempt++) {
    try {
      return await fn();
    } catch (err) {
      const isTransient =
        err instanceof DelhiveryNetworkError ||
        (err instanceof DelhiveryError && err.statusCode >= 500);

      if (!isTransient || attempt === retries - 1) throw err;

      await new Promise((r) =>
        setTimeout(r, 2 ** attempt * 500), // 500ms, 1s, 2s
      );
    }
  }
  throw new Error("unreachable");
}

const data = await withRetry(() => client.tracking.trackOne("1234567890"));
```
