---
title: Tracking
sidebar_position: 3
---

# Tracking

`client.tracking`

## `trackOne(waybill)`

Track a single shipment by its waybill number.

```typescript
const data = await client.tracking.trackOne("1234567890");

const shipment = data.ShipmentData[0]?.Shipment;
console.log(shipment?.Status);          // "Delivered"
console.log(shipment?.["Delivery Date"]); // "2024-06-05"
```

---

## `trackMany(waybills)`

Track up to 10 shipments in a single request.

```typescript
const data = await client.tracking.trackMany([
  "1234567890",
  "9876543210",
]);

for (const { Shipment } of data.ShipmentData) {
  console.log(Shipment.Waybill, Shipment.Status);
}
```

---

## `track(params)`

Low-level method — accepts either `waybill` or `ref_ids` (your client order IDs), comma-separated.

### Parameters

| Name | Type | Required | Description |
|---|---|---|---|
| `waybill` | `string` | One of | Comma-separated waybill numbers (max 10) |
| `ref_ids` | `string` | One of | Comma-separated client order IDs (max 10) |

### Shipment fields in response

| Field | Description |
|---|---|
| `Status` | Current delivery status |
| `Status DateTime` | Last update timestamp |
| `Origin City` / `Destination City` | Route |
| `Pickup Date` / `Delivery Date` | Actual dates |
| `Expected Delivery Date` | EDD |
| `COD Amount` | Amount to be collected (COD only) |
| `Scans` | Full scan history array |

### Scan entry

```typescript
{
  "SL Date": "2024-06-01 14:22:00",
  "City": "Mumbai",
  "Location": "ANDHERI HUB",
  "Scan Type": "UD",
  "Scan": "Manifested",
  "Instructions": ""
}
```
