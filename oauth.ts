import { IUrlParse, urlParse } from "https://deno.land/x/url_parse@1.1.0/mod.ts"
import { env } from "./env.ts"
import { ReadonlyDeep } from "npm:type-fest"
/**
 * the url github will redirect to after the user has authenticated
 *
 * it will contain a `code` query parameter that can be used to get an access token.
 * after that, the access token can be used to get the user's profile.
 */
const redirectUri = urlParse({
  protocol: "http",
  hostname: "localhost",
  port: env.PORT,
  pathname: env.REDIRECT_PATH,
})
export const githubAuth = {
  protocol: "https",
  hostname: "github.com",
  query: [
    { key: "client_id", value: env.CLIENT_ID },
  ],
} as const satisfies ReadonlyDeep<Partial<IUrlParse>>

/**
 * will take user to github's oauth authorization page
 * where they can authenticate
 */
export const githubAuthUri = urlParse({
  ...githubAuth,
  pathname: "/login/oauth/authorize",
  query: [...githubAuth.query, {
    key: "redirect_uri",
    value: redirectUri.href,
  }],
})
