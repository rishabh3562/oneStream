import Link from "next/link";
export default function Home() {
  return (
    <>
      <div><Link href="/home">home</Link> </div>
      <div> <Link href="/media-management/upload">media-management/upload</Link></div>
      <div><Link href="/media-management/">media-management/</Link> </div>
      <div> <Link href="/dashboard">dashboard</Link></div>
      <div> <Link href="/profile">profile</Link> </div>
      <div> <Link href="/youtube-upload">youtube-upload</Link> </div>
      <div> <Link href="/mail">mail</Link> </div>
      <div> <Link href="/login">login</Link> </div>
      <div> <Link href="/signup">signup</Link> </div>
      <div> <Link href="/logout">logout</Link> </div>
    </>
  );
}

