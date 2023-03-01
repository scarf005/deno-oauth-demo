import { load } from "$std/dotenv/mod.ts"

type Env = Record<
  "PORT" | "CLIENT_SECRET" | "CLIENT_ID" | "REDIRECT_PATH",
  string
>

const envFile = await load() as Env

export const env = {
  ...envFile,
  PORT: parseInt(envFile.PORT),
}
