import React from 'react';
import { Paper, Button } from '@mantine/core';
import { BrandGoogle } from 'tabler-icons-react';
import { getAuth, onAuthStateChanged, signInWithPopup } from 'firebase/auth';
import { setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

export function AuthenticationForm() {
  let navigate = useNavigate();
 
  async function authenticator(){
    const auth = getAuth();
    onAuthStateChanged(auth, async(currUser) => {
      if (currUser) {
        return navigate("/tracking");
      }
      else{
        const result = await signInWithPopup(auth, provider)
        await setDoc(doc(db, 'users', result.user.uid), {
          user:result.user.uid,        
        }) 
        return navigate("/tracking");
      }
    });
  }
  
  return (
    <Paper className=" w-4/5 md:w-1/2 py-10 flex flex-col justify-center items-center border-2 border-black" radius="md" p="xl" withBorder>
      <h1 className='text-center font-semibold text-2xl'>Welcome to Metabus</h1>
      <h2 className='text-center my-2 text-gray-500 text-sm'>Signing up takes less than a minute, just link your existing google account!</h2>
      <Button leftIcon={<BrandGoogle />} variant="white" className='border-black mx-auto text-center text-black my-5' onClick={authenticator}>
        Connect to Google
      </Button>
    </Paper>
  );
}