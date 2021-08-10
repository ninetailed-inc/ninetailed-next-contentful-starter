# Ninetailed Starter for Next.js & Contentful

## Setting up environment 

To use your Contentful space please provide the `CONTENTFUL_GRAPHQL_ENDPOINT` in the .env file (an example is in the repo). The Standard Graphql Endpoint is `https://graphql.contentful.com/content/v1/spaces/{SPACE}`- find more information at the [https://www.contentful.com/developers/docs/references/graphql/](Contentful)

Run the command `yarn codegen`. This will generate the graphql client and types. Redo this whenever you change some gql files.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.tsx`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.