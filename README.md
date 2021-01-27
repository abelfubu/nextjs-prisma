# Nextjs Typescript Prisma

1. Add prisma cli

```cmd
yarn add -D @prisma/cli
```

2. Add prisma client

```cmd
yarn add @prisma/client
```

3. Init prisma

```cmd
npx prisma init
```

4. Declare model in schema.prisma

```prisma
model Post {
  id Int @id @default(autoincrement())
  title String
  content String
  createdAt DateTime @updatedAt
}
```

5. Set the database url in .env file

```cmd
DATABASE_URL="postgresql://prisma:prisma@localhost:5432/prisma?schema=public"
```

6. Create migration for dev

```cmd
npx prisma migrate dev --preview-feature
```

7. Generate the client

```cmd
npx prisma generate
```

8. Prisma studio opens a visual interface to manage data in the database

```cmd
npx prisma studio
```
