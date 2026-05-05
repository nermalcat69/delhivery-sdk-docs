---
title: COD Orders
sidebar_position: 2
---

# Cash-on-Delivery Orders

COD orders are identical to Prepaid orders with two differences:
- `payment_mode` must be `"COD"`
- `cod_amount` (the amount to collect at the door) is required

## Example

```typescript
const response = await client.orders.create([
  {
    client_order_id: "COD-2024-001",
    order: "2024-06-01",
    pickup_location: "Primary Warehouse",
    payment_mode: "COD",
    cod_amount: 799,   // collect ₹799 at delivery
    total_amount: 799,
    weight: 1.0,
    name: "Amit Singh",
    phone: "9123456789",
    add: "12, Lajpat Nagar",
    city: "New Delhi",
    state: "Delhi",
    pin: "110024",
    country: "India",
  },
]);
```

## Checking COD availability

Always verify COD serviceability before accepting a COD order:

```typescript
const [s] = await client.serviceability.check({
  origin_pin: "201301",
  destination_pin: "110024",
  payment_mode: "COD",
  weight: 1.0,
});

if (!s?.cod) {
  // fall back to Prepaid or show error to customer
  throw new Error("COD not available for this pincode");
}
```

## Estimating COD fees

```typescript
const cost = await client.shipping.calculateCost({
  origin_pin: "201301",
  destination_pin: "110024",
  payment_mode: "COD",
  weight: 1.0,
  cod_amount: 799,
});

console.log("COD charge:", cost.cod_charge);
console.log("Total shipping:", cost.total_amount);
```
