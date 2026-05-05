---
title: Shipping
sidebar_position: 4
---

# Shipping

`client.shipping`

## `calculateCost(params)`

Get an estimated shipping charge between two pincodes.

### Parameters

| Name | Type | Required | Description |
|---|---|---|---|
| `origin_pin` | `string` | Yes | Pickup pincode |
| `destination_pin` | `string` | Yes | Delivery pincode |
| `payment_mode` | `"Prepaid" \| "COD" \| "Pickup"` | Yes | Payment mode |
| `weight` | `number` | Yes | Weight in kg |
| `length` / `breadth` / `height` | `number` | No | Volumetric dimensions in cm |
| `cod_amount` | `number` | COD only | Amount to collect |

### Example

```typescript
const cost = await client.shipping.calculateCost({
  origin_pin: "400001",
  destination_pin: "110001",
  payment_mode: "COD",
  weight: 1.5,
  cod_amount: 599,
});

console.log("Total charge:", cost.total_amount);
console.log("COD fee:", cost.cod_charge);
```

---

## `fetchWaybills(count)`

Pre-fetch waybill numbers to use in shipment creation. `count` must be 1–100.

```typescript
const { waybill_list } = await client.shipping.fetchWaybills(10);
// ["1000001", "1000002", ...]
```

---

## `generateLabel(params)`

Generate a shipping label PDF. Returns the raw `ArrayBuffer` — write it to a file or stream it.

```typescript
import { writeFileSync } from "fs";

const pdf = await client.shipping.generateLabel({
  waybill: "1234567890,9876543210", // comma-separated for bulk
});

writeFileSync("label.pdf", Buffer.from(pdf));
```

---

## `schedulePickup(params)`

Schedule a courier pickup from a warehouse.

### Parameters

| Name | Type | Required | Description |
|---|---|---|---|
| `pickup_date` | `string` | Yes | Pickup date (YYYY-MM-DD) |
| `expected_package_quantity` | `number` | Yes | Expected parcel count |
| `client_warehouse_code` | `string` | No | Warehouse name/code |
| `waybill_list` | `string[]` | No | Specific waybills to pick up |

### Example

```typescript
const result = await client.shipping.schedulePickup({
  pickup_date: "2024-06-10",
  expected_package_quantity: 5,
  client_warehouse_code: "Mumbai Warehouse",
});

console.log("Scheduled pickup ID:", result.pickup_id);
```
