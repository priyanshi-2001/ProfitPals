import loggers from "../Models/Loggers.js";
import channelPartner from '../Models/ChannelPartner.js';
import commissionsRules from '../Models/CommissionsRules.js';
import user from "../Models/User.js";
import productsDetails from "../Models/Products.js";
import country from '../Models/Country.js';
import sendPartnerIdEmail from '../util/sendEmailUtility.js'
import mongoose from "mongoose";
import commissions from "../Models/Commissions.js";
export const channelPartnerSignup=async(req,res)=>{
    try{
        const{data}=req.body;

        if(data && data.email){
            const isPresent=await channelPartner.find({emailId:data.email})
            if(isPresent.length>0){
                res.send({Error:'Already Exists!',Status:'Exists Already'})
            }

        }
        else{
            res.send({Error:'Error in payload',Status:'Fail'})
        }
        
        const newRecord=new channelPartner({
            Address:data.address,
            date:Date.now(),
            BusinessName:data.businessName,
            category:data.category,
            country:mongoose.Types.ObjectId(data.country),
            emailId:data.email,
            fname:data.fname,
            lname:data.lname,
            loyaltyPoints:0,
            mname:data.mname,
            phNum:data.phNum

        })
        const result=await newRecord.save();
        await sendPartnerIdEmail(result._id,result.emailId);
        res.send({Error:'NA',Status:result._id});


    }
    catch(err){

        const newLogger=new loggers([{ 
            uniqueIdentifier:'channelPartnerSignup', 
            errorValue: String(err),
            DateCreated:Date.now(),
            DateModified:Date.now(),
        }])
        await newLogger.save();
        console.log("err",err);
        res.send({Error:String(err),Status:"Error"})


    }
}

export const channelPartnerLogin=async(req,res)=>{
    try{
        const {channelId}=req.body;
        const userRecord=await channelPartner.findById(channelId).lean().exec();
        if(userRecord!=undefined){
            res.send({Error:'NA',Status:'Success'})
        }
        else{
            res.send({Error:'Not Found',Status:'Error'})
        }


    }
    catch(err){
        const newLogger=new loggers([{ 
            uniqueIdentifier:'channelPartnerLogin', 
            errorValue: String(err),
            DateCreated:Date.now(),
            DateModified:Date.now(),
        }])
        await newLogger.save();
        console.log("err",err);
        res.send({Error:String(err),Status:"Error"})

    }
}

export const fetchDetails=async(req,res)=>{
    try{
        const{channelId}=req.params;
        const data=await channelPartner.findById(channelId).lean().exec();

        res.send({Error:'NA',data:data})


    }
    catch(err){

        const newLogger=new loggers([{ 
            uniqueIdentifier:'fetchDetails', 
            errorValue: String(err),
            DateCreated:Date.now(),
            DateModified:Date.now(),
        }])
        await newLogger.save();
        console.log("err",err);
        res.send({Error:String(err),Status:"Error"})

    }
}

export const getMyReferrals=async(req,res)=>{
    try{
        const{id}=req.params;

        const data=await commissions.find({channelPartnerId:id}).populate('userId')

        res.send({Error:"NA",data:data});

    }
    catch(err){
        const newLogger=new loggers([{ 
            uniqueIdentifier:'getMyReferrals', 
            errorValue: String(err),
            DateCreated:Date.now(),
            DateModified:Date.now(),
        }])
        await newLogger.save();
        console.log("err",err);
        res.send({Error:String(err),Status:"Error"})

    }
}

export const getCommissions=async(req,res)=>{
    try{
        const{channelId}=req.params;

        const data=await commissions.find({channelPartnerId:channelId}).populate('userId')

        res.send({Error:"NA",data:data});

    }
    catch(err){

        const newLogger=new loggers([{ 
            uniqueIdentifier:'getCommissions', 
            errorValue: String(err),
            DateCreated:Date.now(),
            DateModified:Date.now(),
        }])
        await newLogger.save();
        console.log("err",err);
        res.send({Error:String(err),Status:"Error"})
    }
}

