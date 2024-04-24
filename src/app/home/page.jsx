
import React from 'react'
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import ConnectWithOAuthButton from '@/components/ConnectWithOAuthButton'
import Subscribe from '@/components/Hero/Subscribe'
import FirstHero from '@/components/Hero/FirstHero'
import Info from '@/components/Hero/Info'
// import GoogleLoginButton from "@/components/login"
// import GoogleLogoutButton from "@/components/logout"
const Hero = () => {
  return (<>
    {/* <div>Home</div> */}
    <FirstHero/>
    <Subscribe/>
    <Info/>
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