This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started


Before testing, please ensure the following environment variables are set in both .env.local and .env.production files: 
```
NEXT_PUBLIC_API_URL=http://localhost:3000
PORT=3000

```
To run the docker production build:

```
docker build -t my-app .
docker run -p 3000:3000 my-app
```



To run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Major Technical decisions: 
- Next.js App Router for implementation 
- Zustand for state management 
- Tailwind CSS and shadcn/ui for styling and components 
 
## Bonus points: 
- Backend-for-Frontend (BFF) pattern using Next.js API routes (api/store)
- Dockerized production build with testing capabilities

## Extra features:
- Local storage integration for cart persistence 
- Responsive design for desktop and tablet devices 
- Full TypeScript implementation 