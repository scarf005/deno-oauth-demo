import { GithubUser } from "@/user.ts"

export async function getUser(accessToken: string): Promise<GithubUser> {
  return await fetch("https://api.github.com/user", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  }).then((res) => res.json() as Promise<GithubUser>)
}
