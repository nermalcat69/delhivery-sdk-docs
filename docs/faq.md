---
title: FAQ
sidebar_position: 10
---

# Frequently Asked Questions

## General

### What Node.js version is required?

Node.js 18 or later. The SDK uses the native `fetch` API which was stabilised in Node 18.

### Does the SDK work in the browser?

Not recommended. Never expose your API token client-side. Use the SDK in your backend/server and proxy requests.

### What happens when the API is down?

The SDK throws a `DelhiveryNetworkError` for network failures and a `DelhiveryError` with a 5xx status for server errors. See the [Error Handling guide](./guides/error-handling).

---

## Orders

### What is `pickup_location`?

The `name` of an existing warehouse in your Delhivery account. You must create the warehouse first via `client.warehouses.create()` or the portal.

### Can I assign my own waybill?

Yes — pass your pre-fetched waybill in the `waybill` field of the shipment. Leave it empty to have Delhivery auto-assign one.

### What's the difference between `total_amount` and `cod_amount`?

- `total_amount` — the invoice value of the shipment (used for insurance and e-waybill).
- `cod_amount` — the amount actually collected at the door (COD only). Usually equal to `total_amount`, but can differ when partial payments are pre-collected.

### How do I cancel an order?

```typescript
await client.orders.cancel(["WAYBILL123"]);
```

Orders can only be cancelled before they are picked up.

---

## Tracking

### How many waybills can I track at once?

Up to 10 per request (comma-separated). For bulk tracking, batch your waybills into groups of 10.

### Can I track by my own order ID?

Yes, use `ref_ids` in `client.tracking.track()`:

```typescript
await client.tracking.track({ ref_ids: "ORDER-001,ORDER-002" });
```

---

## Payments & Billing

### When is COD remittance settled?

Delhivery typically settles COD amounts within 7–10 business days after delivery. Check the Delhivery One portal for your remittance schedule.

---

## Webhooks

### Do I need to verify webhook signatures?

Delhivery currently does not sign webhook payloads. It's good practice to whitelist their IP ranges and/or verify the waybill against your database before processing.

### What if my server misses a webhook?

Track shipments proactively via the tracking API for critical orders. Delhivery may retry failed webhooks, but it's not guaranteed.
