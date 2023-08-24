import loggers from "../Models/Loggers.js";
import channelPartner from '../Models/ChannelPartner.js';
import commissionsRules from '../Models/CommissionsRules.js';
import user from "../Models/User.js";
import productsDetails from "../Models/Products.js";
import country from '../Models/Country.js';
import commissions from '../Models/Commissions.js';
import bcrypt from 'bcrypt';
export const signup=async(req,res)=>{
    try{
        const{data}=req.body;
        const userlog=await user.findOne({email:data.email});
        if(userlog){
              return res.send({message:"Account already exists!! Please login",status:"login"})
        }
        // const categories = {
        //     REP: 'Real Estate Promoter',
        //     EA: 'Estate Agents',
        //     PC: 'Property Consultant',
        //     ES: 'Electrical Stores',
        //     HS: 'Hardware Stores',
        //     A: 'Architecture',
        //     ID: 'Interior Designer',
        //     F: 'Freelancer'
        //   };

        //   const keys=Object.keys(categories);
        //   for (const key of keys) {
        //    const ans=new commissionsRules({
        //     category:key,
        //     rulesMaster:'20'
        //    })
        //    const ans1=await ans.save();
        //    console.log("ans is",ans1);
        
        //   }

        
        const hashedPassword=await bcrypt.hash(data.password,10);

        const newRceord=new user({email:data.email,password:hashedPassword,
        Name:data.name,date:Date.now(),category:data.category,referralCode:data.referralCode
        });

        const new_user=await newRceord.save();

        if(data.referralCode!==''){
            const rules=await commissionsRules.find({category:data.category});
            const newRecord=new commissions({
                amountGained:rules[0].rulesMaster,
                channelPartnerId:data.channelPartnerId,
                userId:new_user._id
            })
            await newRecord.save();
        }


      
        res.send({message:"User created Successfully!!",response:new_user,status:"success"});
        
    }
    catch(err){
        const newLogger=new loggers([{ 
            uniqueIdentifier:'signup', 
            errorValue: String(err),
            DateCreated:Date.now(),
            DateModified:Date.now(),
        }])
        await newLogger.save();
        console.log("err",err);
        res.send({Error:String(err),Status:"Error"})
    }
};

export const login=async(req,res)=>{
    try{
        const {email,password}=req.body;
        if(!email || !password){
            res.send(201).send({message:"Invalid data!!",error:'error'})
        }
        const result=await user.findOne({email:email});
        if(!result){
            return res.status(200).send({message:"signup",error:"User not exists. Please signup"});
        }
        else{
            const matchedPassword=await bcrypt.compare(password,result.password);
            if(!matchedPassword){
                res.status(400).send({message:"invalid credentials",error:"Invalid Credentials!!"});
            }
            else{
                const token = jsonwebtoken.sign({ userId: result._id }, process.env.SECRET_KEY, { expiresIn: '24h' });        
                res.status(200).send({message:"succesfully login",error:'NA',token:token,userId:result._id});
   }
}

}

    catch(err){
        const newLogger=new loggers([{ 
            uniqueIdentifier:'login', 
            errorValue: String(err),
            DateCreated:Date.now(),
            DateModified:Date.now(),
        }])
        await newLogger.save();
        console.log("err",err);
        res.send({Error:String(err),Status:"Error"})
        
        
    }
};


export const getCountries=async(req,res)=>{
    try{
        const data=await country.find({});
        res.send({Error:'NA',data:data});

    }
    catch(err){
        const newLogger=new loggers([{ 
            uniqueIdentifier:'getCountries', 
            errorValue: String(err),
            DateCreated:Date.now(),
            DateModified:Date.now(),
        }])
        await newLogger.save();
        console.log("err",err);
        res.send({Error:String(err),Status:"Error"})
        
    }

}

export const buyProduct=async(req,res)=>{
    try{

        const{userId,productId}=req.body;
        const PI=new PaymentResponse({

        })
        await PI.save();

        res.send({Error:'NA',Status:"Success"})

    }
    catch(err){
        const newLogger=new loggers([{ 
            uniqueIdentifier:'buyProduct', 
            errorValue: String(err),
            DateCreated:Date.now(),
            DateModified:Date.now(),
        }])
        await newLogger.save();
        console.log("err",err);
        res.send({Error:String(err),Status:"Error"})
    }
}


