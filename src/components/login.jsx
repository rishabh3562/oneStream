import React from 'react'
// import GoogleLogin from 'react-google-login';
// import {GoogleLogin} from 'react-google-login';
const login = () => {
    const failure=(res)=>{
        console.log("LOGIN_FAILED ,res:",res.profileObj)    }
        const success=(res)=>{
            console.log("LOGIN_SUCCESS ,res:",res.profileObj)    }
  return (<>
    <div>login</div>
  
  {/* <GoogleLogin
  clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}
  buttonText='login'
  onFailure={failure}
  onSuccess={success}
  cookiePolicy={'single_host_origin'}
isSignedIn={true}
/> */}
  </>
  )
}

export default login