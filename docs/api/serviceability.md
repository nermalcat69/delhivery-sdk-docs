---
title: Serviceability
sidebar_position: 1
---

# Serviceability

`client.serviceability`

## `check(params)`

Check whether a destination pincode is serviceable from an origin pincode.

### Parameters

| Name | Type | Required | Description |
|---|---|---|---|
| `origin_pin` | `string` | Yes | Origin/pickup pincode |
| `destination_pin` | `string` | Yes | Destination pincode to check |
| `payment_mode` | `"Prepaid" \| "COD"` | Yes | Payment mode |
| `weight` | `number` | Yes | Shipment weight in kg |

### Returns

`Promise<ServiceabilityResult[]>`

| Field | Type | Description |
|---|---|---|
| `destination_sensitive` | `boolean` | Whether the pin is restricted |
| `cod` | `boolean` | COD availability |
| `pickup` | `boolean` | Pickup availability |
| `delivery` | `boolean` | Delivery availability |
| `origin_city` | `string` | Origin city name |
| `destination_city` | `string` | Destination city name |

### Example

```typescript
const results = await client.serviceability.check({
  origin_pin: "400001",
  destination_pin: "560001",
  payment_mode: "COD",
  weight: 1.2,
});

if (results[0]?.cod) {
  console.log("COD is available!");
}
```

---

## `expectedTAT(params)`

Get the expected Turn-Around Time (delivery date estimate) between two pincodes.

### Parameters

| Name | Type | Required | Description |
|---|---|---|---|
| `origin_pin` | `string` | Yes | Origin pincode |
| `destination_pin` | `string` | Yes | Destination pincode |
| `payment_mode` | `"Prepaid" \| "COD"` | No | Payment mode |

### Returns

`Promise<TATResponse>`

| Field | Type | Description |
|---|---|---|
| `estimated_date` | `string` | Estimated delivery date (YYYY-MM-DD) |
| `origin` | `string` | Origin city |
| `destination` | `string` | Destination city |
| `tat` | `number` | TAT in days |

### Example

```typescript
const tat = await client.serviceability.expectedTAT({
  origin_pin: "400001",
  destination_pin: "110001",
});

console.log(`Estimated delivery: ${tat.estimated_date}`);
```
