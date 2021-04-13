# news-app

This app displays a news feed of various articles and each article has a section for comments. Built using NextJS, Mobx, Firebase Firestore and [Currents API](http://currentsapi.services/) to fetch news.

## How to use

Clone the project:

```bash
git clone https://github.com/ViaxCo/news-app.git
```

Install dependencies:

```bash
npm install
```

Create a `.env.local` file for these environment variables:

```
API_KEY=
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_DATABASE_URL=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
```

Run the dev server:

```bash
npm run dev
```

Build out the project for production:

```bash
npm run build
```
