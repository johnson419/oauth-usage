import { useState } from 'react'
import { useSession, signIn, signOut } from "next-auth/react"

export default function Home() {
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

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <>
        Not signed in <br />
      <form onSubmit={(e) => {
        e.preventDefault();
        signIn('credentials', { username, password })
      }}>
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Sign in with credentials</button>
      </form>
      <button onClick={() => signIn()}>Sign in with Google or GitHub</button>
      </>
    </main>
  )
}