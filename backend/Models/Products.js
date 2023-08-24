
import mongoose from "mongoose";

const Schema=mongoose.Schema
const productsSchema=new Schema({
name:{
    type:String
},
image:{
type:String
},
amount:{
    type:String
},
ref1:{
    type:String
},
ref2:{
    type:String
}

})
const productsDetails=new mongoose.model("products",productsSchema);
export default productsDetails
