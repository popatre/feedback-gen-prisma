# Project Feedback/Guidance

Hosted version: https://guidance-feedback-gen.vercel.app/

**.env**

DATABASE_URL="postgresql://YOURUSERNAME:YOURPASSWORD@localhost:5432/feedback"

DATABASE_URL_PROD - ask for prod connection string

NEXT_PUBLIC_FIREBASEAPI - ask for api key.

## Setup

npm run setup-db

npm run prepare

npx prisma migrate reset

npx prisma generate


