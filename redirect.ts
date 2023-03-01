export function redirect(location: string | URL) {
  const Location = typeof location === "string" ? location : location.href

  return new Response(null, {
    status: 302,
    headers: new Headers({ Location }),
  })
}
