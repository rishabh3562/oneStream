"use client"
import { useSession, signIn, signOut } from "next-auth/react"


export default function Component() {
  const { data:session,status, } = useSession()
  console.log(session)
  if(session) {
    return <>
      Signed in as {session.user.email} <br/>
      <button onClick={() => signOut()}>Sign out</button>
    </>
  }
  return (<>
    Not signed in <br/>
    <button onClick={() => signIn("credentials")}>Sign in using credentails</button>
<br/>
    <button onClick={() => signIn("google")}>Sign in using Google</button> 
  </>)
}