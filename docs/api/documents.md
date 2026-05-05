---
title: Documents
sidebar_position: 7
---

# Documents

`client.documents`

## `download(params)`

Download a document (shipping label, invoice, manifest, or proof of delivery) as a PDF.

### Parameters

| Name | Type | Required | Description |
|---|---|---|---|
| `waybill` | `string` | Yes | Shipment waybill number |
| `type` | `DocumentType` | Yes | `"label"` \| `"invoice"` \| `"manifest"` \| `"pod"` |

### Returns

`Promise<ArrayBuffer>` — raw PDF bytes.

### Example — save to disk (Node.js)

```typescript
import { writeFileSync } from "fs";
import { DelhiveryClient } from "delhivery-sdk";

const client = new DelhiveryClient({ token: process.env.DELHIVERY_TOKEN! });

const pdf = await client.documents.download({
  waybill: "1234567890",
  type: "label",
});

writeFileSync("shipping-label.pdf", Buffer.from(pdf));
```

### Example — stream to HTTP response (Express)

```typescript
app.get("/label/:waybill", async (req, res) => {
  const pdf = await client.documents.download({
    waybill: req.params.waybill,
    type: "label",
  });

  res.set("Content-Type", "application/pdf");
  res.set("Content-Disposition", `inline; filename="${req.params.waybill}.pdf"`);
  res.send(Buffer.from(pdf));
});
```
