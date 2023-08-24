import express from "express";
import mongoose from "mongoose";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import {authorize} from './Middleware/authentication.js';
import {signup,login,getCountries,buyProduct} from './Controllers/portal.js';
import {channelPartnerLogin,channelPartnerSignup,fetchDetails,getCommissions,getMyReferrals} from './Controllers/channelPartner.js';
import cors from 'cors';
var app = express();
import bodyParser from "body-parser";
app.use(
    bodyParser.urlencoded({
      extended: true
    })
  );
app.use(bodyParser.json());
app.use(cors());
const router = express.Router();

router.route("/").get(async(req,res)=>{
  res.json("Hello");
})

router.route("/signup").post(signup);
router.route("/login").post(login);
router.route("/channelPartnerSignup").post(channelPartnerSignup);
router.route("/channelPartnerLogin").post(channelPartnerLogin);
router.route("/getCommissions/:channelId").get(getCommissions);
router.route("/buyProduct").post(buyProduct);
router.route("/getCountries").get(getCountries);
router.route("/getMyProfile/:channelId").get(fetchDetails);
router.route("/getMyReferrals").get(getMyReferrals);

export default router;
