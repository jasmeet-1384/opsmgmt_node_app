import nodeMailer from 'nodemailer';


export default{
    send: (to, message)=>{

        let transporter = nodeMailer.createTransport({
            host:process.env.MAIL_HOST,
            port:process.env.MAIL_PORT,
            secure:false,
            auth:{
                user:process.env.MAIL_USERNAME,
                pass:process.env.MAIL_PASSWORD,
            }
        });

        let mailOptions = {
            from:process.env.MAIL_FROM_ADDRESS,
            to:to,
            subject:"OPSMGNT",
            text: "OPSMGNT",
            html: '<b>' + message + '</b>',
        };

        transporter.sendMail(mailOptions,(error, info)=>{
            if(error){
                console.log(error);
                return error;
            }
        })
    }
}