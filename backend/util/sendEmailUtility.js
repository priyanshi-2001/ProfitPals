  import nodemailer from "nodemailer";

    
  const sendPartnerIdEmail=async(referralCode,toEmail)=>{
    try{
          var sender=nodemailer.createTransport({
            service:'gmail',
            auth:{
                user:process.env.SENDER_EMAIL,
                pass:process.env.SENDER_EMAIL_PWD
            }
            ,
            port:465,
            host:'smtp.gmail.com'
          });
        
          
            const mailOptions = {
              from: process.env.SENDER_EMAIL, // Sender's email address
              to: 'masav95698@stypedia.com', // replace with toEmail
              subject:'Successful Partner Channel ID',
              html: `<div><p>Hello!</p><br/>
              <h1>Welcome to ProfitPals</h1><br/><br/>
            <p>Your Referral ID <b>${referralCode}</b> has been activated now
            [When you refer the client don’t forget to mention your Referral ID while filling 
            the subscription form]
            </p>
              </div>`
            };
        
            try {
              const info = await sender.sendMail(mailOptions);
              console.log('Email sent:', info.response);
            } catch (error) {
              console.log('Error sending email:', error);
            }
          }
  
    catch(err){
          console.log("err",err);
          const newLogger=new loggers([{ 
            uniqueIdentifier:'channelPartnerSignup', 
            errorValue: String(err),
            DateCreated:Date.now(),
            DateModified:Date.now(),
          }])
          await newLogger.save();
        
    }
}

  export default sendPartnerIdEmail
  