import React from 'react';
import { useState,useEffect } from 'react';
import { TextField,Button } from '@mui/material';
import Select from 'react-select';
import Snackbar from '@mui/material/Snackbar';
const url="http://localhost:8000/";

const Signup = () => {
const[data,setData]=useState({
  name:'',
  email:'',
  password:'',
  category:'',
  referralCode:'',
  channelPartnerId:localStorage.getItem("channelId")

});
const businessCategory=[
  { label: 'Real Estate Promoter', value: 'REP' },
  { label: 'Estate Agents', value: 'EA' },
  { label: 'Property Consultant', value: 'PC' },
  { label: 'Electrical Stores', value: 'ES' },
  { label: 'Hardware Stores', value: 'HS' },
  { label: 'Architecture', value: 'A' },
  { label: 'Interior Designer', value: 'ID' },
  { label: 'Freelancer', value: 'F' }
]

const signup=async()=>{
  try{

    const resp=await fetch(url+"signup",{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({
        data
      })
    }
    
    )
    const res=await resp.json();
    if(res.message=='Account already exists!! Please login'){
      window.location='/login';
    }
    else if(res.message=='User created Successfully!!'){


    }
    

  }
  catch(err){
    console.log("err",err);
  }
}

  return (
    <div>Signup

       
        <div> Name </div>
          <div style={{marginRight:'80px'}}>
          <TextField
            placeholder='Name'
            name="name"
            type='text'
            value={data.name}
            onChange={(e)=>{
              setData
              ((prev)=>({...prev,name:e.target.value}))
            }}
            />
          </div>

          <div>
          <div> EmailID </div>
          <div style={{marginRight:'80px'}}>
          <TextField
            placeholder='Email'
            name="email"
            type='email'
            value={data.email}
            onChange={(e)=>{

              setData
              ((prev)=>({...prev,email:e.target.value}))
            }}
            />
          </div>
          </div>

          <div>
          <div> Password </div>
          <div style={{marginRight:'80px'}}>
          <TextField
            placeholder='Password'
            name="password"
            type='password'
            value={data.password}
            onChange={(e)=>{

              setData
              ((prev)=>({...prev,password:e.target.value}))
            }}
            />
          </div>
          </div>

      <div>
          <div> Referral Code</div>
          <div style={{marginRight:'80px'}}>
          <TextField
            placeholder='Referral Code'
            name="referralCode"
            type='text'
            value={data.referralCode}
            onChange={(e)=>{ setData
              ((prev)=>({...prev,referralCode:e.target.value}))}}
            />
          </div>

         <div>
          <Select 
          options={businessCategory}
          onChange={(e)=>{
            setData
            ((prev)=>({...prev,category:e.value}))
          }}
          placeholder="Select Business Category"
          name="category"
          isClearable
          />
          </div>


          
      </div>
      <Button onClick={()=>{signup()}}>signup</Button>

      </div>
      
  )
}

export default Signup