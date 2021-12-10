import { Button } from '@mui/material';
import React from 'react';
import styled from 'styled-components';
import { auth, provider } from '../firebase';
import { signInWithPopup } from 'firebase/auth';

function Login() {
  const signIn = async e => {
    try {
      await signInWithPopup(auth, provider);
    } catch (e) {
      alert(e.message);
    }
  };

  return (
    <LoginContainer>
      <LoginInnerContainer>
        <img src='https://luna1.co/dc739c.png' alt='slack' loading='lazy' />
        <h1>Signin to Patroes Chat App</h1>
        <p>patroes.slack.com</p>
        <Button onClick={signIn}>Signin with Google</Button>
      </LoginInnerContainer>
    </LoginContainer>
  );
}

export default Login;

const LoginContainer = styled.div`
  height: 100vh;
  display: grid;
  place-items: center;
`;
const LoginInnerContainer = styled.div`
  padding: 100px;
  text-align: center;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);

  > img {
    object-fit: contain;
    height: 100px;
    margin-bottom: 40px;
  }

  > button {
    margin-top: 50px;
    text-transform: inherit !important;
    background-color: #0a8d48;
    color: white;
  }

  > button:hover {
    background-color: #0a8d48;
    color: white;
    opacity: 0.9;
  }
`;
