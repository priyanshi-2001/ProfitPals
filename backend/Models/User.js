import mongoose from "mongoose";
const Schema=mongoose.Schema
const userSchema=new Schema({
    Name:{
        type:String,
        required:true,
    },
    email: {
    type: String,
    required: true
    },
    password: {
    type: String,
    required: true
    },
    date: {
    type: Date,
    default: Date.now
    },
    referralCode:{
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
const user= mongoose.model("authUser",userSchema);
export default user;
