# Ecommerce

Moderna ecommerce aplikacija sa Node.js backend-om i Next.js frontend-om.

## Struktura projekta

```
Ecommerce/
├── backend/          # Node.js/Express backend
│   ├── server.js
│   └── package.json
└── frontend/         # Next.js frontend
    ├── app/
    │   ├── page.js   # Početna stranica
    │   └── ...
    └── package.json
```

## Instalacija i pokretanje

### Backend

```bash
cd backend
npm install
npm run dev
```

Backend će biti dostupan na `http://localhost:5000`

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend će biti dostupan na `http://localhost:3000`

## Funkcionalnosti

- ✅ Node.js/Express backend API
- ✅ Next.js frontend sa React-om
- ✅ Navigacija između stranica
- ✅ Moderna početna stranica
- ✅ Responsive dizajn

## Tehnologije

**Backend:**
- Node.js
- Express
- CORS
- dotenv

**Frontend:**
- Next.js 14
- React 18
- CSS Modules
