import { useState } from 'react'
import { useSession, signIn, signOut } from "next-auth/react"

export default function Component() {
  const { data: session } = useSession()

  // Add state for the form inputs
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  if (session) {
    return (
      <>
        Signed in as {session.user.email} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    )
  }

  // Add a form for the credentials
  return (
    <>
      Not signed in <br />
      <form onSubmit={() => signIn('credentials', { username, password })}>
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Sign in with credentials</button>
      </form>
      <button onClick={() => signIn()}>Sign in with Google or GitHub</button>
    </>
  )
}