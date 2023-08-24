
import mongoose from "mongoose";

const Schema=mongoose.Schema
const paymentInfoSchema=new Schema({
userId:{
    type:String//id of cfd table auto gen id
},
referrerCommission:{
type:String
},
paymentDate:{
    type:Date
},
amount:{
    type:String
},
orderCreationResponse:{
    type:String,
},
ref1:{
    type:String,
},
ref2:{
    type:String,
},
ref3:{
    type:String,
}

})
const paymentInfoDetails=new mongoose.model("paymentInfo",paymentInfoSchema);
export default paymentInfoDetails
