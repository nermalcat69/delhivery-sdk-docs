---
title: Create Your First Order
sidebar_position: 1
---

# Create Your First Order

This guide walks through the end-to-end flow for shipping a Prepaid order.

## Step 1 — Set up the client

```typescript
import { DelhiveryClient } from "delhivery-sdk";

const client = new DelhiveryClient({
  token: process.env.DELHIVERY_TOKEN!,
});
```

## Step 2 — Create a warehouse (once)

Every shipment requires a pickup location. Create one if you haven't already.

```typescript
await client.warehouses.create({
  name: "Primary Warehouse",
  address: "Unit 5, Sector 63",
  city: "Noida",
  state: "Uttar Pradesh",
  country: "India",
  pin: "201301",
  phone: "9876543210",
});
```

## Step 3 — Check serviceability (optional but recommended)

```typescript
const [serviceability] = await client.serviceability.check({
  origin_pin: "201301",
  destination_pin: "560001",
  payment_mode: "Prepaid",
  weight: 0.5,
});

if (!serviceability?.delivery) {
  throw new Error("Destination not serviceable");
}
```

## Step 4 — Create the order

```typescript
const response = await client.orders.create([
  {
    client_order_id: "ORD-2024-001",
    order: "2024-06-01",
    pickup_location: "Primary Warehouse",
    payment_mode: "Prepaid",
    total_amount: 1499,
    weight: 0.5,
    length: 20,
    breadth: 15,
    height: 10,
    name: "Priya Mehta",
    phone: "9876543210",
    add: "45, Indiranagar, 12th Main",
    city: "Bengaluru",
    state: "Karnataka",
    pin: "560038",
    country: "India",
    invoice: "INV-001",
  },
]);

const pkg = response.packages[0];
if (pkg?.status !== "Success") {
  throw new Error(`Order failed: ${pkg?.remarks}`);
}

const waybill = pkg.waybill;
console.log("Waybill:", waybill);
```

## Step 5 — Download the shipping label

```typescript
import { writeFileSync } from "fs";

const label = await client.shipping.generateLabel({ waybill });
writeFileSync(`${waybill}.pdf`, Buffer.from(label));
```

## Step 6 — Schedule pickup

```typescript
await client.shipping.schedulePickup({
  pickup_date: "2024-06-02",
  expected_package_quantity: 1,
  client_warehouse_code: "Primary Warehouse",
});
```

## Step 7 — Track the shipment

```typescript
const tracking = await client.tracking.trackOne(waybill);
const shipment = tracking.ShipmentData[0]?.Shipment;

console.log("Status:", shipment?.Status);
console.log("EDD:", shipment?.["Expected Delivery Date"]);
```
