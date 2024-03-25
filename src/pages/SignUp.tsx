import React from 'react';
import SignUpForm from '../components/feature/signup/SignUpForm';
import { SignUpProvider } from '../components/feature/signup/SignUpContext';

function SignUp() {
  return (
    <SignUpProvider>
      <SignUpForm />
    </SignUpProvider>
  );
}

export default SignUp;
