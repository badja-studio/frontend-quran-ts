# Docker Usage for Quran Frontend

## Quick Start

Jalankan aplikasi dengan satu perintah sederhana:

```bash
docker compose up --build
```

## What it does:

- ✅ **Single Service**: Hanya menjalankan satu service `frontend` (production build)
- ✅ **No Profiles**: Tidak perlu profile development/production lagi 
- ✅ **Auto Build**: Menggunakan production Dockerfile dengan `--build` flag
- ✅ **Port 3001**: Aplikasi dapat diakses di `http://localhost:3001`

## Environment Configuration

Aplikasi menggunakan file `.env` untuk konfigurasi:

- `VITE_API_BASE_URL`: Backend API URL
- Theme colors (PRIMARY, SECONDARY, dll)

## Production Ready

- ✅ Built menggunakan `npm run build`
- ✅ Served menggunakan `serve` package
- ✅ Optimized static files
- ✅ Nginx tidak diperlukan (menggunakan serve)

## Stop Services

```bash
docker compose down
```

## View Logs

```bash
docker compose logs -f
```
