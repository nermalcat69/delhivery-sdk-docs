---
slug: /
title: Getting Started
sidebar_position: 1
---

# Delhivery SDK

A fully-typed TypeScript SDK for the [Delhivery B2C API](https://one.delhivery.com/developer-portal).

## What's included

| Resource | Methods |
|---|---|
| `serviceability` | `check`, `expectedTAT` |
| `orders` | `create`, `update`, `cancel`, `updateEWaybill` |
| `tracking` | `track`, `trackOne`, `trackMany` |
| `shipping` | `calculateCost`, `fetchWaybills`, `generateLabel`, `schedulePickup` |
| `warehouses` | `create`, `update` |
| `ndr` | `update`, `rvpQC` |
| `documents` | `download` |

## Quick example

```typescript
import { DelhiveryClient } from "delhivery-sdk";

const client = new DelhiveryClient({ token: "YOUR_API_TOKEN" });

// Check if 400001 → 560001 is serviceable
const results = await client.serviceability.check({
  origin_pin: "400001",
  destination_pin: "560001",
  payment_mode: "Prepaid",
  weight: 0.5,
});

console.log(results);
```

## Next steps

- [Installation](./installation) — install the package
- [Authentication](./authentication) — get your API token
- [Create your first order](./guides/create-first-order)
