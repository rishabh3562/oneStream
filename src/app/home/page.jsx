
import React from 'react'
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import ConnectWithOAuthButton from '@/components/ConnectWithOAuthButton'
// import GoogleLoginButton from "@/components/login"
// import GoogleLogoutButton from "@/components/logout"
const Hero = () => {
  return (<>
    <div>Home</div>
    <ConnectWithOAuthButton/>
    {/* <GoogleLoginButton/> */}
    {/* <GoogleLogoutButton/> */}
    {/* <ResizablePanelGroup direction="horizontal">
  <ResizablePanel>One</ResizablePanel>
  <ResizableHandle />
  <ResizablePanel>Two</ResizablePanel>
</ResizablePanelGroup>
<ResizablePanelGroup direction="horizontal">
  <ResizablePanel>One</ResizablePanel>
  <ResizableHandle />
  <ResizablePanel>Two</ResizablePanel>
</ResizablePanelGroup> */}

  </>
  )
}

export default Hero