import mongoose from "mongoose";
const Schema=mongoose.Schema
const commissionsSchema=new Schema({
channelPartnerId:{
    type:String,
},
userId:{
    type:Schema.Types.ObjectId, ref: 'authUser'
},
amountGained:{
    type:String
}
})
const commissions= mongoose.model("commissions",commissionsSchema);
export default commissions;
