import mongoose from "mongoose";
const Schema=mongoose.Schema
const channelPartnerSchema=new Schema({
  country:{
    type:Schema.Types.ObjectId, ref: 'country'
  },
  emailId:{
    type:String

  },
  phNum:{
    type:String
  },
  fname:{
    type:String
  },
  lname:{
    String
  },
  mname:{
    type:String
  },
  date: {
    type: Date,
    default: Date.now
  },
  referralCode:{
    type:String
  },
  BusinessName:{
    type:String
  },
  Address:{
    type:String
  },
  loyaltyPoints:{
    type:String
  },
   category:{
    type:String//types as 
    //Real Estate Promoter REP
    // Estate Agents   EA
    // Property Consultant  PC
    // Electrical Stores  ES
    // Hardware Stores  HS
    // Architecture  A
    // Interior Designer ID
    // Freelancer  F
    }
})
//its default key will be the channelPartnerId of user
const channelPartner= mongoose.model("channelPartner",channelPartnerSchema);
export default channelPartner;
