import { PageProps } from "$fresh/server.ts"

export default function Greet({ params: { name } }: PageProps) {
  return <h1>Hello {name}!</h1>
}
