const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

// SMTP 서버 설정
let transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST, // 메일 서비스 제공자의 SMTP 서버 주소
  port: 587, // 통상적인 SMTP 포트
  secure: false, // true면 465 포트 사용, false면 다른 포트 사용
  auth: {
    user: process.env.SMTP_USER, // 이메일 전송을 위한 유저명 (이메일 주소)
    pass: process.env.SMTP_PASS // 이메일 전송을 위한 패스워드
  }
});


router.post('/test', function(req, res, next) {
  console.log('test')

  const {to, status, data} = req.body

  console.log(status)
  console.log(to)
  if(data && to && to.length > 0) {
    for(let email of to) {
      console.log('Send Start :: ' + email)
      // 메일 옵션 설정
      let mailOptions = {
        from: '"바질 IT 트래커" <programming@vazilcompany.com>', // 발신자 정보
        to: email, // 수신자 이메일 주소
        subject: "[바질컴퍼니] ✔ 최신 IT 동향", // 제목
        html: data, // 내용 (텍스트)
      };

      // 메일 전송
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          return console.log(email, error);
        }
        console.log('Message sent: %s', email);
      });
    }
  }
  res.status(200).json('ok')
})




/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'GPT Daily Collector' });
});

// health
router.get('/health', function(req, res, next) {
  res.status(200).json('ok')
})

module.exports = router;
