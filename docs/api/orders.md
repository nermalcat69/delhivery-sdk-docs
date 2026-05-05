---
title: Orders
sidebar_position: 2
---

# Orders

`client.orders`

## `create(shipments)`

Create one or more shipments. Supports both **Prepaid** and **COD** payment modes, single and multi-piece shipments.

### Shipment fields

| Field | Type | Required | Description |
|---|---|---|---|
| `client_order_id` | `string` | Yes | Your unique order identifier |
| `order` | `string` | Yes | Order date (YYYY-MM-DD) |
| `pickup_location` | `string` | Yes | Warehouse name (must exist in your account) |
| `payment_mode` | `"Prepaid" \| "COD" \| "Pickup"` | Yes | Payment mode |
| `total_amount` | `number` | Yes | Invoice value |
| `weight` | `number` | Yes | Weight in kg |
| `name` | `string` | Yes | Customer name |
| `phone` | `string` | Yes | Customer phone |
| `add` | `string` | Yes | Delivery address line 1 |
| `city` | `string` | Yes | Delivery city |
| `state` | `string` | Yes | Delivery state |
| `pin` | `string` | Yes | Delivery pincode |
| `country` | `string` | Yes | Delivery country |
| `cod_amount` | `number` | COD only | Amount to collect at delivery |
| `waybill` | `string` | No | Leave empty to auto-assign |
| `length` / `breadth` / `height` | `number` | No | Dimensions in cm |
| `invoice` | `string` | No | Invoice number |
| `e_way_bill_no` | `string` | No | E-waybill number |
| `shipment_items` | `ShipmentItem[]` | No | Line-item breakdown |

### Returns

`Promise<CreateOrderResponse>`

```typescript
{
  packages: [
    {
      waybill: "1234567890",
      client_order_id: "ORDER-001",
      status: "Success",
      remarks: null,
    }
  ]
}
```

### Example

```typescript
const response = await client.orders.create([
  {
    client_order_id: "ORDER-001",
    order: "2024-06-01",
    pickup_location: "Mumbai Warehouse",
    payment_mode: "Prepaid",
    total_amount: 999,
    weight: 0.5,
    name: "Rahul Sharma",
    phone: "9876543210",
    add: "123, MG Road",
    city: "Bengaluru",
    state: "Karnataka",
    pin: "560001",
    country: "India",
  },
]);

const waybill = response.packages[0]?.waybill;
console.log("Created waybill:", waybill);
```

---

## `update(shipments)`

Update fields on existing shipments. Only pass the fields you want to change.

### Example

```typescript
await client.orders.update([
  {
    waybill: "1234567890",
    name: "Rahul Kumar",
    phone: "9999999999",
    pin: "400001",
  },
]);
```

---

## `cancel(waybills)`

Cancel one or more shipments by waybill number.

### Example

```typescript
const results = await client.orders.cancel(["1234567890", "9876543210"]);

for (const r of results) {
  console.log(r.waybill, r.status); // "1234567890" "Success"
}
```

---

## `updateEWaybill(params)`

Attach or update the GST e-waybill number on a shipment.

### Example

```typescript
await client.orders.updateEWaybill({
  waybill: "1234567890",
  e_way_bill_no: "EWB1234567890",
});
```
