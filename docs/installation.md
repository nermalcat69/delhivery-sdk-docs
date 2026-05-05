---
title: Installation
sidebar_position: 2
---

# Installation

## Requirements

- Node.js ≥ 18 (uses native `fetch` — no polyfill needed)
- TypeScript ≥ 5.0 (optional but recommended)

## Install

```bash
# npm
npm install delhivery-sdk

# yarn
yarn add delhivery-sdk

# pnpm
pnpm add delhivery-sdk
```

## Usage (ESM / TypeScript)

```typescript
import { DelhiveryClient } from "delhivery-sdk";

const client = new DelhiveryClient({ token: process.env.DELHIVERY_TOKEN! });
```

## Usage (CommonJS)

```javascript
const { DelhiveryClient } = require("delhivery-sdk");

const client = new DelhiveryClient({ token: process.env.DELHIVERY_TOKEN });
```

## Sandbox vs production

```typescript
import { DelhiveryClient, STAGING_BASE_URL } from "delhivery-sdk";

const client = new DelhiveryClient({
  token: process.env.DELHIVERY_STAGING_TOKEN!,
  baseUrl: STAGING_BASE_URL, // https://staging-express.delhivery.com
});
```

## Custom timeout

```typescript
const client = new DelhiveryClient({
  token: process.env.DELHIVERY_TOKEN!,
  timeout: 60_000, // 60 seconds (default: 30 000)
});
```
