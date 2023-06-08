import React from 'react'
import {auth,provider} from '../firebase-config'
import {signInWithPopup} from 'firebase/auth'

import Cookies from 'universal-cookie'

const cookie = new Cookies();

export const Auth = (props) => {
    const {setAuth} = props;
    const signInWithGoogle = async ()=>{
        try{
        const result = await signInWithPopup(auth,provider);
        cookie.set("auth-token",result.user.refreshToken);
        setAuth(true);
        }catch(err){
            console.error(err);
        }
    }
  return (
    <div className='auth'>
        <p className='text-2xl text-red-700'>Sign in with google to continue</p>
        <button className='sign' onClick={signInWithGoogle}>Sign in</button>
    </div>
  )
}
