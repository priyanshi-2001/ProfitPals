import React from 'react'
import {Input,Button,TextField} from '@mui/material'
import { useState,useEffect } from 'react';
import Select from 'react-select';
import Snackbar from '@mui/material/Snackbar';
const url='http://localhost:8000/';


const ChannelPartnerLogin = () => {
  const [channelId,setChannelId]=useState('');
  const [isSnackbarMsg,setIsSnackbarMsg]=useState('');
  const[isSnackbar,setIsSnackBar]=useState(false);

  useEffect(() => {
    if (isSnackbar) {
      const timeout = setTimeout(() =>  setIsSnackBar(false), 5000);//means after 5s disappers
      return () => {
        clearTimeout(timeout);
      };
    }
  }, [isSnackbar]);
  const Login=async()=>{
    try{
      const resp=await fetch(url+'channelPartnerLogin',{
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify({channelId})

      })

      const res=await resp.json();
      if(res.Error=='NA'){
        localStorage.setItem("channelId",channelId);
        window.location='/channelPartnerPortal';

      }
      else if(res.Error=='Not Found'){
        setIsSnackBar(true);
        setIsSnackbarMsg(`ChannelId not found. Please Signup Your Business`);

      }


    }
    catch(err){
      console.log("err",err);
    }
  }
  
  return (
    <div>ChannelPartnerLogin


      <Input type="text"  name="channelId" value={channelId} onChange={(e)=>{setChannelId(e.target.value)}} />
      <Button onClick={()=>{Login()}}>Login</Button>
      <Button onClick={()=>{window.location='channelPartnerSignup'}}>Sign up as a Channel Partner click this link </Button>
      <Snackbar
      sx={{ vertical: 'bottom',
      horizontal: 'left'}}
        open={isSnackbar}
        message={isSnackbarMsg}
      />

    </div>
  )
}

export default ChannelPartnerLogin