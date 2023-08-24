import React from 'react'
import {Input,Button,TextField} from '@mui/material'
import { useState,useEffect } from 'react';
import Select from 'react-select';
import Snackbar from '@mui/material/Snackbar';

const url='http://localhost:8000/';


const ChannelPartnerPortal = () => {
  const[data,setData]=useState([]);
  const[commissions,setCommissions]=useState([]);
  const categories = {
    REP: 'Real Estate Promoter',
    EA: 'Estate Agents',
    PC: 'Property Consultant',
    ES: 'Electrical Stores',
    HS: 'Hardware Stores',
    A: 'Architecture',
    ID: 'Interior Designer',
    F: 'Freelancer'
  };

  useEffect(()=>{
    (async()=>{
      await getData();
    })()
    
  },[])
  useEffect(()=>{
    (async()=>{
      await getCommissions();
    })()
    
  },[])
  

  const getData=async()=>{
    try{
      const channelId=localStorage.getItem("channelId");
      const resp=await fetch(url+`getMyProfile/${channelId}`,{
        method:'GET',
        headers:{
          'Content-Type':'application/json',
        }
      })
      const res=await resp.json();
      if(res.Error=='NA'){
       setData(res.data);

      }

     
    }
    catch(err){
      console.log("err",err);
    }
  }

  const getCommissions=async()=>{
    try{
      const channelId=localStorage.getItem("channelId");
      const resp=await fetch(url+`getCommissions/${channelId}`,{
        method:'GET',
        headers:{
          'Content-Type':'application/json',
        }
      })
      const res=await resp.json();
      if(res.Error=='NA'){
       setCommissions(res.data);

      }

     
    }
    catch(err){
      console.log("err",err);
    }
  }
  
  return (
    <div>

      Welcome {data.fname} !!

      <div>
      Welcome to “ProfitPals” Channel 
       Partner Dashboard
      </div>

      {/* <div>
        Account Details
        <div>
          My Referral Id : {data._id}
          Business Category : {categories[data.category]}
          Business Name  : {data.BusinessName}
          ID Activated on :{data.date}
          Email ID : {data.emailId}
          First Name : {data.fname}
          Last Name : {data.lname}
          Contact : {data.phNum}
          Address : {data.Address}

        </div>

      </div> */}

        <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px', border: '1px solid #ddd', borderRadius: '5px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
          <h2 style={{ marginBottom: '15px', fontSize: '24px', color: '#333' }}>Account Details</h2>
          <div style={{ lineHeight: '1.6', fontSize: '16px' }}>
            <p><strong>My Referral Id:</strong> {data._id}</p>
            <p><strong>Business Category:</strong> {categories[data.category]}</p>
            <p><strong>Business Name:</strong> {data.businessName}</p>
            <p><strong>ID Activated on:</strong> {data.date}</p>
            <p><strong>Email ID:</strong> {data.emailId}</p>
            <p><strong>First Name:</strong> {data.fname}</p>
            <p><strong>Last Name:</strong> {data.lname}</p>
            <p><strong>Contact:</strong> {data.phNum}</p>
            <p><strong>Address:</strong> {data.address}</p>
          </div>
        </div>


  

        <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px', border: '1px solid #ddd', borderRadius: '5px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
          <div style={{ fontSize: '24px', color: '#333', marginBottom: '15px' }}>My Commissions</div>
          
          {commissions && commissions.map((o, index) => (
            <div key={index} style={{ marginBottom: '15px', padding: '10px', backgroundColor: '#f5f5f5', borderRadius: '3px', boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)' }}>
              <p style={{ fontSize: '16px', marginBottom: '5px' }}>Amount Earned: {o.amountGained}</p>
              <p style={{ fontSize: '16px', marginBottom: '5px' }}>User: {o.userId && o.userId.Name}</p>
              <p style={{ fontSize: '16px', marginBottom: '5px' }}>Category: {categories[o.userId.category]}</p>
            </div>
          ))}
        </div>





    </div>
  )
}

export default ChannelPartnerPortal