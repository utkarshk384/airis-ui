This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Setup

Run `yarn` or `npm install` to install all dependencies.

## Running the project

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

NOTE: You can use `dev-expose` to run the server locally in the network.

## Technologies used

1. Tailwind CSS - USed for styling
2. Stitiches - Used for custom styling where tailwind is not enough
3. Zustand - Used for state management
4. Next JS - Used for SSR
5. Typescript - Used for type safety
6. ESLint & Prettier - Used for linting and formatting

## Styling guide

1. Use tailwind classes as much as possible
2. Use stitches for custom styling
3. Any `10px` font size used in the figma design file will be rounded to `12px` in the code
4. Any `13px` font size used in the figma design file will be rounded to `14px` in the code

## Creating a new API route

Run the command `yarn create-api API_NAME`.

This will create three new files in the `src/api` folder.

1. The first one is the handler file which will contain the logic for the API.

2. The second one is the hook file which will export custom react query hook.

3. Finally, the last is the types file which will contain the types for the API.

NOTE: It is preferrable to use small case for the `API_NAME` while using the command. The text case will be automatically be handled.
