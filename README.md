This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).
![Screen Shot 2025-02-04 at 12 00 19 am](https://github.com/user-attachments/assets/5ec2c57b-e7b6-4719-8a88-de4c618dd8e0)
![Screen Shot 2025-02-04 at 7 07 29 am](https://github.com/user-attachments/assets/9ed8bb63-3aa5-47c3-aa80-18daf35b53ba)
![Screen Shot 2025-02-04 at 7 06 42 am](https://github.com/user-attachments/assets/69e61e91-5b56-4489-bb83-ced867179d62)
![Screen Shot 2025-02-04 at 7 07 03 am](https://github.com/user-attachments/assets/66b2f928-9d85-4b3e-9e33-60277fd1364e)
![Screen Shot 2025-02-04 at 7 08 18 am](https://github.com/user-attachments/assets/08f35e60-7587-41ad-8bed-7be30a4f4f20)

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
