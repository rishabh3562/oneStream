
import { UserButton, auth } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
export default function Home() {
  const {user,userId,getToken}= auth();
  return (
    <div>
     <Link href="/home"> <a>home</a></Link>
      <h1>Page</h1>
      <UserButton afterSignOut={<div>Bye</div>} />
      <div>
        <h2>User</h2>
        <pre>{JSON.stringify(user, null, 2)}</pre>
      </div>
      <div>
        <h2>UserId</h2>
        <pre>{JSON.stringify(userId, null, 2)}</pre>
      </div>
      <div>
        <h2>Token</h2>
        <pre>{JSON.stringify(getToken(), null, 2)}</pre>
      </div>


      
    </div>
  );
}

