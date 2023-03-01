import { Head } from "$fresh/runtime.ts"
import { Button } from "@/components/Button.tsx"
import { githubAuthUri } from "@/oauth.ts"

export default function Home() {
  return (
    <>
      <Head>
        <title>Deno OAuth Demo</title>
      </Head>
      <div>
        <img
          src="/logo.svg"
          width="128"
          height="128"
          alt="the fresh logo: a sliced lemon dripping with juice"
        />
        <h1>
          Press the button below to login with github!
        </h1>
        <a href={githubAuthUri.href}>Login with Github</a>
      </div>
    </>
  )
}
