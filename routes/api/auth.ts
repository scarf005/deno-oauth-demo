import { Handlers } from "$fresh/server.ts"
import { urlParse } from "https://deno.land/x/url_parse@1.1.0/mod.ts"
import { env } from "@/env.ts"
import { githubAuth } from "@/oauth.ts"
import { redirect } from "@/redirect.ts"
import { getUser } from "./getUser.ts"

export const handler: Handlers = {
  GET: async (req, _ctx) => {
    const code = new URL(req.url).searchParams.get("code") as string
    const tokenResponse = await getAccessToken(code)
    const accessToken = tokenResponse.access_token
    const { login } = await getUser(accessToken)

    return redirect(`/user/${login}?access_token=${accessToken}`)
  },
}

async function getAccessToken(code: string) {
  const url = urlParse({
    ...githubAuth,
    pathname: "/login/oauth/access_token",
    query: [
      ...githubAuth.query,
      { key: "client_secret", value: env.CLIENT_SECRET },
      { key: "code", value: code },
    ],
  })
  // console.log("url: ", url.href)

  const response = await fetch(url.href, {
    method: "POST",
    headers: {
      "Accept": "application/json",
    },
  })
  // console.log("response: ", response)
  return response.json() as Promise<
    Record<"access_token" | "scope" | "token_type", string>
  >
}
