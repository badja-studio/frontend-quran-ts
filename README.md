# Frontend Quran TypeScript

Aplikasi frontend untuk Al-Quran menggunakan React, TypeScript, Material-UI, dan Tailwind CSS dengan tema warna hijau-putih yang Islami.

## 🚀 Teknologi

- ⚛️ **React 18** - Library UI modern
- 📘 **TypeScript** - Type safety
- 🎨 **Material-UI (MUI)** - Component library dengan custom theme
- 🎯 **Tailwind CSS** - Utility-first CSS
- 📡 **Axios** - HTTP client
- ⚡ **Vite** - Build tool yang cepat
- 🐳 **Docker** - Containerization untuk dev & prod

## 🎨 Tema Warna

Aplikasi ini menggunakan tema warna hijau-putih yang dapat dikonfigurasi melalui environment variables:

- **Primary Green**: `#2E7D32` (Islamic Green)
- **Light Green**: `#4CAF50`
- **Dark Green**: `#1B5E20`
- **Background**: `#FFFFFF` (White)
- **Paper**: `#F5F5F5` (Light Gray)

## 📦 Instalasi

### Prerequisites

- Node.js 20 atau lebih tinggi
- npm atau yarn
- Docker & Docker Compose (untuk menjalankan dengan container)

### Setup Lokal

```bash
# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# Jalankan development server
npm run dev

# Build untuk production
npm run build

# Preview production build
npm run preview
```

## 🐳 Docker

### Development Mode

```bash
# Jalankan dengan Docker Compose
docker-compose up frontend-dev

# Atau build manual
docker build -f Dockerfile.dev -t quran-frontend-dev .
docker run -p 3000:3000 -v $(pwd):/app quran-frontend-dev
```

### Production Mode

```bash
# Jalankan dengan Docker Compose
docker-compose --profile production up frontend-prod

# Atau build manual
docker build -t quran-frontend-prod .
docker run -p 80:80 quran-frontend-prod
```

## 🔧 Konfigurasi Environment

Edit file `.env` untuk mengubah konfigurasi:

```env
# API Configuration
VITE_API_BASE_URL=http://localhost:8000/api

# Theme Colors - Customize your colors
VITE_PRIMARY_COLOR=#2E7D32
VITE_PRIMARY_LIGHT=#4CAF50
VITE_PRIMARY_DARK=#1B5E20
VITE_SECONDARY_COLOR=#388E3C
VITE_BACKGROUND_COLOR=#FFFFFF
VITE_PAPER_COLOR=#F5F5F5
```

## 📁 Struktur Folder

```
frontend-quran-ts/
├── src/
│   ├── services/        # API services (Axios)
│   │   └── api.ts
│   ├── theme.ts         # MUI theme configuration
│   ├── App.tsx          # Main App component
│   ├── main.tsx         # Entry point
│   ├── index.css        # Global styles
│   └── vite-env.d.ts    # TypeScript declarations
├── public/              # Static assets
├── docker-compose.yml   # Docker Compose configuration
├── Dockerfile           # Production Dockerfile
├── Dockerfile.dev       # Development Dockerfile
├── nginx.conf           # Nginx configuration for production
├── .env                 # Environment variables
└── package.json         # Dependencies
```

## 🎯 Fitur

- ✅ React dengan TypeScript
- ✅ Material-UI dengan custom theme hijau-putih
- ✅ Tailwind CSS untuk utility styling
- ✅ Axios dengan interceptors untuk API calls
- ✅ Environment-based configuration
- ✅ Docker support untuk development dan production
- ✅ Hot reload di development mode
- ✅ Nginx untuk production serving
- ✅ Font Amiri untuk teks Arab

## 📝 Scripts

```bash
npm run dev      # Jalankan development server
npm run build    # Build untuk production
npm run preview  # Preview production build
npm run lint     # Jalankan ESLint
```

## 🌐 Port

- **Development**: `http://localhost:3000`
- **Production**: `http://localhost:80`

## 📖 API Integration

Service API sudah dikonfigurasi di `src/services/api.ts` dengan:
- Base URL dari environment variable
- Request/Response interceptors
- Authentication token handling
- Error handling

Contoh penggunaan:

```typescript
import apiClient from './services/api';

// GET request
const response = await apiClient.get('/surahs');

// POST request
const response = await apiClient.post('/auth/login', { 
  username, 
  password 
});
```

## 🎨 Custom Theme

Theme MUI dapat dikustomisasi melalui file `src/theme.ts`. Warna-warna mengambil nilai dari environment variables, sehingga mudah diubah tanpa perlu mengubah kode.

## 📄 License

Lihat file [LICENSE](LICENSE) untuk detail.

## 🤲 بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ

Semoga aplikasi ini bermanfaat untuk memudahkan akses membaca Al-Quran.