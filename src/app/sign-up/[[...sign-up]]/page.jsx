"use client"

// import { SignUp } from '@clerk/nextjs';
import { useState } from 'react';

function SignUpPage() {
  const [userData, setUserData] = useState(null);

 

  return (
    <div>
      <h1>Sign Up</h1>
      {/* <SignUp
      redirectUrl='/choice'
      /> */}
    </div>
  );
}

export default SignUpPage;
