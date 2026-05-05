---
title: Bulk Operations
sidebar_position: 3
---

# Bulk Operations

## Bulk order creation

Pass multiple shipments in a single `create()` call (up to the API's per-request limit):

```typescript
const orders = [
  { client_order_id: "ORD-001", /* ... */ },
  { client_order_id: "ORD-002", /* ... */ },
  { client_order_id: "ORD-003", /* ... */ },
];

const response = await client.orders.create(orders);

for (const pkg of response.packages) {
  if (pkg.status === "Success") {
    console.log(`✓ ${pkg.client_order_id} → waybill ${pkg.waybill}`);
  } else {
    console.error(`✗ ${pkg.client_order_id} failed: ${pkg.remarks}`);
  }
}
```

## Bulk tracking

Track up to 10 waybills at once:

```typescript
const waybills = ["AAA", "BBB", "CCC", "DDD"];

const data = await client.tracking.trackMany(waybills);

for (const { Shipment } of data.ShipmentData) {
  console.log(Shipment.Waybill, "→", Shipment.Status);
}
```

## Pre-fetching waybills

For high-volume sellers, pre-allocate waybill numbers before creating orders:

```typescript
const { waybill_list } = await client.shipping.fetchWaybills(50);

// Now use waybill_list[i] in your order creation
const response = await client.orders.create(
  waybill_list.map((waybill, i) => ({
    waybill,
    client_order_id: `ORD-${i}`,
    // ...
  })),
);
```

## Bulk label generation

Generate a single PDF with multiple labels by comma-separating waybills:

```typescript
import { writeFileSync } from "fs";

const waybills = ["AAA", "BBB", "CCC"];

const pdf = await client.shipping.generateLabel({
  waybill: waybills.join(","),
});

writeFileSync("bulk-labels.pdf", Buffer.from(pdf));
```
