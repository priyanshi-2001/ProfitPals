import React from 'react'
import {Input,Button,TextField} from '@mui/material'
import { useState,useEffect } from 'react';
import Select from 'react-select';
import Snackbar from '@mui/material/Snackbar';

const url='http://localhost:8000/';
const ChannelPartnerSignup = () => {

  const[countryData,setCountrydata]=useState([]);

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

  const[data,setData]=useState({
    country:'',
    category:'',
    email:'',
    fname:'',
    lname:'',
    mname:'',
    businessName:'',
    phNum:'',
    address:''
  })
  useEffect(()=>{
    (async()=>{
      getCountries()
    })()

  },[])

  const getCountries=async()=>{
    try{
      const resp=await fetch(url+'getCountries',{
        method:'GET',
        headers:{
          'Content-name':'application/json',
        }
      })
      const res=await resp.json();
      if(res.Error=='NA'){
        var temp=res.data;
        temp.forEach(i=>{i.value=i._id;i.label=i.CountryName});
        setCountrydata(temp);
      }

     
    }
    catch(err){
      console.log("err",err);
    }
  }

  const onSubmit=async()=>{
    try{
      const resp=await fetch(url+'channelPartnerSignup',{
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify({
          data
        })
      });

      const res=await resp.json();
      if(res.Error='NA'){
       
        setIsSnackBar(true);
        setIsSnackbarMsg(`Successful Signup! Your Channel Partner ID ${res.Status}`);

        

      }
      else if(res.Error=="Already Exists!"){
        setIsSnackBar(true);
        setIsSnackbarMsg(`Please Login with your ChannelId. A Business with this emailId is registered already!!!`);
      }
      else{
        
        setIsSnackBar(true);
        setIsSnackbarMsg(`Some Error Ocurred`);
      }




    }
    catch(err){
      console.log('err',err);
    }
  }
  
  return (
    <div>ChannelPartnerSignup
       <div style={{marginBottom: '10px'}}>
        
      <Select options={countryData} 
      onChange={(e)=>{
        setData
        ((prev)=>({...prev,country:e.value}))
      }}
       placeholder="Select Country"
       name="country"
       isClearable
      />
      </div>
      <div style={{marginBottom: '50px'}}>

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
       

       <div style={{display: 'flex',
  flexDirection: 'column',
  gap: '10px'}}>
      <TextField name="email" label="Email"  placeholder="Enter email" type="email" value={data.email} onChange={(e)=>{setData((prev)=>({...prev,[e.target.name]:e.target.value}))}}  />
    
      <TextField name="fname" label="First Name"   placeholder="Enter First Name" type="text" value={data.fname} onChange={(e)=>{setData((prev)=>({...prev,[e.target.name]:e.target.value}))}}  />
      <TextField name="mname"  label="Middle Name"  placeholder="Enter Middle Name" type="text" value={data.mname} onChange={(e)=>{setData((prev)=>({...prev,[e.target.name]:e.target.value}))}}  />
      <TextField name="lname" label="Last Name"  placeholder="Enter Last Name" type="text" value={data.lname} onChange={(e)=>{setData((prev)=>({...prev,[e.target.name]:e.target.value}))}}  />
      <TextField name="businessName" label="Business Name"  placeholder="Enter Business Name" type="text" value={data.businessName} onChange={(e)=>{setData((prev)=>({...prev,[e.target.name]:e.target.value}))}}  />
      <TextField name="phNum" label="Phone Number"   placeholder="Enter Phone Number" type="number" value={data.phNum} onChange={(e)=>{setData((prev)=>({...prev,[e.target.name]:e.target.value}))}}  />
      <TextField name="address" label="Address"  placeholder="Enter Address" type="text" value={data.address} onChange={(e)=>{setData((prev)=>({...prev,[e.target.name]:e.target.value}))}}  />
      </div>

      <Button onClick={()=>{onSubmit()}}>Submit</Button>
      <Button onClick={()=>{window.location='/channelPartnerLogin'}}>Login</Button>
      <Snackbar
      sx={{ vertical: 'bottom',
      horizontal: 'left'}}
        open={isSnackbar}
        message={isSnackbarMsg}
      />



    </div>
  )
}


export default ChannelPartnerSignup


