import mongoose from "mongoose";
const Schema=mongoose.Schema
const commissionRulesSchema=new Schema({
category:{
    type:String,
},
rulesMaster:{
type:String
},
})
const commissionsRules= mongoose.model("commissionsRules",commissionRulesSchema);
export default commissionsRules;
