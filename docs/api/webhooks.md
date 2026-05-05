---
title: Webhooks
sidebar_position: 8
---

# Webhooks

Delhivery sends real-time shipment status updates to a URL you configure in the developer portal.
The SDK provides TypeScript types for the webhook payload so you can type your handler safely.

## Setup

1. Log in to the [Delhivery One portal](https://one.delhivery.com/developer-portal).
2. Navigate to **Webhook Settings**.
3. Enter your publicly accessible URL (e.g. `https://yourapp.com/webhooks/delhivery`).
4. Save and test.

## Payload type

```typescript
import type { WebhookEvent } from "delhivery-sdk";
```

| Field | Type | Description |
|---|---|---|
| `waybill` | `string` | Shipment waybill |
| `status` | `string` | Current status |
| `Status DateTime` | `string` | Timestamp |
| `City` | `string` | City of scan |
| `Scan Type` | `string` | Scan category |
| `Scan` | `string` | Scan description |
| `ReferenceNo` | `string \| undefined` | Your client order ID |
| `Instructions` | `string \| undefined` | Courier instructions |

## Express handler example

```typescript
import express from "express";
import type { WebhookEvent } from "delhivery-sdk";

const app = express();
app.use(express.json());

app.post("/webhooks/delhivery", (req, res) => {
  const events: WebhookEvent[] = Array.isArray(req.body)
    ? req.body
    : [req.body];

  for (const event of events) {
    console.log(`[${event.waybill}] ${event.status} @ ${event["Status DateTime"]}`);

    if (event.status === "Delivered") {
      // mark order as delivered in your DB
    }
    if (event["Scan Type"] === "NDR") {
      // handle non-delivery report
    }
  }

  res.sendStatus(200);
});
```

## Common status values

| Status | Meaning |
|---|---|
| `Manifested` | Order created, not yet picked up |
| `In Transit` | Shipment is moving |
| `Out for Delivery` | Courier is delivering today |
| `Delivered` | Successfully delivered |
| `RTO Initiated` | Return to origin started |
| `RTO Delivered` | Returned to warehouse |
| `Lost` | Shipment lost |
| `NDR` | Non-delivery report raised |
