# GRADA Fan App (base)

Native iOS + Android fan app template (one app per club, shared base).

## Stack
- Expo (React Native) + TypeScript
- expo-router (navigation)
- @tanstack/react-query (data fetching)

## Local dev
```bash
cp .env.example .env
npm i
npm run start
```

Configure backend:
- `EXPO_PUBLIC_API_BASE_URL` (defaults to `http://localhost:3002`)

## Notes / planned
- Auth: email + password (must match existing store account)
- Tickets: show owned tickets + QR codes
- Fan ID: in-app card + Apple Wallet / Google Wallet pass (later)
- Payments: mocked for now
