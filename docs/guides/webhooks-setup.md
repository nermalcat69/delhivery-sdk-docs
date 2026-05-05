---
title: Webhooks Setup
sidebar_position: 5
---

# Webhooks Setup

Delhivery pushes shipment status events to your server in real time — no polling needed.

## 1. Register your endpoint

Go to the [Delhivery One developer portal](https://one.delhivery.com/developer-portal) → **Webhook Settings** → enter your URL and save.

The URL must be:
- Publicly reachable (not `localhost`)
- Able to respond with HTTP 200 within a few seconds

For local development, use [ngrok](https://ngrok.com/) or [Cloudflare Tunnel](https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/).

## 2. Handle the payload

Delhivery sends a `POST` request with a JSON body. The payload can be a single object or an array.

```typescript
import express from "express";
import type { WebhookEvent } from "delhivery-sdk";

const app = express();
app.use(express.json());

app.post("/webhooks/delhivery", async (req, res) => {
  // Always respond quickly — process async if needed
  res.sendStatus(200);

  const raw: unknown = req.body;
  const events: WebhookEvent[] = Array.isArray(raw) ? raw : [raw as WebhookEvent];

  for (const event of events) {
    await handleShipmentEvent(event);
  }
});

async function handleShipmentEvent(event: WebhookEvent) {
  console.log(
    `[${event.waybill}] ${event.status} — ${event["Status DateTime"]}`,
  );

  switch (event.status) {
    case "Delivered":
      await markOrderDelivered(event.waybill);
      break;
    case "RTO Initiated":
      await notifyReturnInitiated(event.waybill);
      break;
    // handle other statuses...
  }
}
```

## 3. Status reference

| Status | Meaning | Action |
|---|---|---|
| `Manifested` | Created, not picked up yet | — |
| `In Transit` | En route | — |
| `Out for Delivery` | Delivering today | Notify customer |
| `Delivered` | Delivered | Mark complete, release COD |
| `NDR` | Delivery failed | Call customer, update via NDR API |
| `RTO Initiated` | Return started | Notify customer |
| `RTO Delivered` | Returned to sender | Restock inventory |

## 4. Testing locally with ngrok

```bash
# Install ngrok, then:
ngrok http 3000

# Copy the HTTPS URL, e.g.:
# https://abc123.ngrok.io/webhooks/delhivery
# → Paste into the Delhivery portal
```
