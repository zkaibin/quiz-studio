# Prebuilt City Driving maps

Binary packs for **Real map** mode. Each `<city>.bin.gz` is OpenStreetMap geometry
converted offline by `npm run build:city-maps` — the browser only downloads and unpacks.

| File | Contents |
|------|----------|
| `manifest.json` | City list, radii, sizes |
| `<id>.bin.gz` | Gzipped `CMAP` pack (meshes + road/footprint extras) |

Map data © OpenStreetMap contributors ([ODbL](https://www.openstreetmap.org/copyright)).
