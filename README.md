# news-app

This app displays a news feed of various articles. Built using [Next.js](https://nextjs.org/) and [Currents API](http://currentsapi.services/) to fetch news.

The `firestore` branch contains the exact project built with Firestore.

The `rt-db` branch contains the exact project built with Realtime Database.

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

```env
API_KEY=
```

The `API_KEY` is your [Currents API](http://currentsapi.services/) API key

Run the dev server:

```bash
npm run dev
```

Build out the project for production:

```bash
npm run build
```
