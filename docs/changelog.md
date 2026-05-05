---
title: Changelog
sidebar_position: 11
---

# Changelog

## 0.1.0 — 2025-05-05

Initial release.

### Added

- `DelhiveryClient` with full B2C API coverage
- `serviceability.check` — pincode serviceability
- `serviceability.expectedTAT` — expected delivery date
- `orders.create` — create shipments (Prepaid, COD)
- `orders.update` — update shipment fields
- `orders.cancel` — cancel by waybill
- `orders.updateEWaybill` — attach GST e-waybill
- `tracking.trackOne` / `trackMany` / `track`
- `shipping.calculateCost` — shipping cost estimator
- `shipping.fetchWaybills` — pre-fetch waybill numbers
- `shipping.generateLabel` — PDF label generation
- `shipping.schedulePickup` — courier pickup scheduling
- `warehouses.create` / `update`
- `ndr.update` — NDR action submission
- `ndr.rvpQC` — reverse pickup QC
- `documents.download` — label/invoice/manifest/POD download
- Typed error classes: `DelhiveryError`, `DelhiveryAuthError`, `DelhiveryRateLimitError`, `DelhiveryNetworkError`
- Dual ESM + CJS build output
- TypeScript declaration files
