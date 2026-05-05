---
title: Warehouses
sidebar_position: 5
---

# Warehouses

`client.warehouses`

Warehouses (also called pickup locations) are the origin addresses for your shipments.
The `pickup_location` field in order creation must match an existing warehouse name.

## `create(params)`

Create a new warehouse/pickup location.

### Parameters

| Name | Type | Required | Description |
|---|---|---|---|
| `name` | `string` | Yes | Unique warehouse name |
| `address` | `string` | Yes | Address line 1 |
| `city` | `string` | Yes | City |
| `state` | `string` | Yes | State |
| `country` | `string` | Yes | Country (e.g. `"India"`) |
| `pin` | `string` | Yes | Pincode |
| `phone` | `string` | Yes | Contact phone |
| `address2` | `string` | No | Address line 2 |
| `email` | `string` | No | Contact email |
| `return_address` | `string` | No | Return address (if different) |
| `return_city` | `string` | No | Return city |
| `return_pin` | `string` | No | Return pincode |
| `gst_no` | `string` | No | GSTIN |

### Example

```typescript
const result = await client.warehouses.create({
  name: "Mumbai Warehouse",
  address: "Plot 7, Andheri Industrial Estate",
  city: "Mumbai",
  state: "Maharashtra",
  country: "India",
  pin: "400093",
  phone: "9876543210",
  email: "ops@example.com",
});

console.log("Warehouse created:", result.status);
```

---

## `update(params)`

Update an existing warehouse by name. Only pass the fields you want to change.

```typescript
await client.warehouses.update({
  name: "Mumbai Warehouse",
  phone: "9999999999",
  email: "newops@example.com",
});
```
