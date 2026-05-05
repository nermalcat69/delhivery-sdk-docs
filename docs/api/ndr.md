---
title: NDR & RVP QC
sidebar_position: 6
---

# NDR & Reverse Pickup QC

`client.ndr`

## NDR (Non-Delivery Report)

When a delivery attempt fails, Delhivery raises an NDR. Use `client.ndr.update()` to instruct the courier on what to do next.

### `update(params)`

| Name | Type | Required | Description |
|---|---|---|---|
| `waybill` | `string` | Yes | Waybill number |
| `action` | `NDRAction` | Yes | Action to take |
| `reattempt_date` | `string` | Conditional | Re-attempt date (YYYY-MM-DD) for `re-attempt`/`reschedule` |
| `updated_address` | `string` | Conditional | New address for `address-update` |
| `updated_contact` | `string` | Conditional | New phone for `phone-update` |
| `seller_note` | `string` | No | Message to courier |

### NDR actions

| Action | Description |
|---|---|
| `re-attempt` | Schedule another delivery attempt |
| `return` | Return the package to sender |
| `confirm` | Confirm the customer wants delivery |
| `address-update` | Update delivery address |
| `phone-update` | Update customer phone |
| `reschedule` | Reschedule to a specific date |

### Example

```typescript
// Re-attempt delivery tomorrow
await client.ndr.update({
  waybill: "1234567890",
  action: "re-attempt",
  reattempt_date: "2024-06-12",
  seller_note: "Customer will be home after 6pm",
});

// Return to sender
await client.ndr.update({
  waybill: "9876543210",
  action: "return",
});
```

---

## `rvpQC(params)`

Submit QC for a reverse pickup shipment upon collection from the customer.

| Name | Type | Required | Description |
|---|---|---|---|
| `waybill` | `string` | Yes | Waybill number |
| `qc_status` | `"Pass" \| "Fail"` | Yes | QC outcome |
| `remarks` | `string` | No | Reason for failure |
| `otp` | `string` | No | OTP from customer |

### Example

```typescript
await client.ndr.rvpQC({
  waybill: "1234567890",
  qc_status: "Pass",
  otp: "456789",
});
```
