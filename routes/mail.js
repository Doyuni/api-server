var express = require("express");
var router = express.Router();
const userModel = require("../models/user");
const linkModel = require("../models/link");
const directoryModel = require("../models/directory");
const mailModel = require("../models/mail");
const direcrotynameModel = require("../models/directoryName");

//메세지 전송
//display_name : 송신자
//sender : 수신자
//type :0 공유 btn 클릭할때  1 공유 거절할때  2 공유 수락할때
router.post('/:display_name/:sender/:type', async (req,res)=>{
   const displayName = req.params.display_name;
   const senderName = req.params.sender;
   const dirID = req.body.dir_id;
   const type = req.params.type;


  await direcrotynameModel.find({dir_id:dirID},{_id:0, name:1},function (err,name){
      console.log(name[0].name);
      const dirName = name[0].name;

      if(type ==0) {
          const Mail = new mailModel({
              display_name: displayName,
              sender: senderName,
              message: senderName + "님이 " +dirName+ " 디렉토리를 공유했습니다."
          })
          Mail.save();
          return res.status(200);

          //return res.json(Mail.message);
      }

      else if(type ==1){
          const Mail = new mailModel({
              display_name: displayName,
              sender: senderName,
              message: senderName + "님이 디렉토리를 공유를 거절했습니다."
          })
          Mail.save();
          return res.status(200);

         // return res.json(Mail.message);
      }
      else if(type ==2){
          const Mail = new mailModel({
              display_name: displayName,
              sender: senderName,
              message: senderName + "님이 디렉토리를 공유를 수락했습니다."
          })
          Mail.save();
          return res.status(200);

         // return res.json(Mail.message);
      }
  });
});

//메세지 갯수 알림
router.get("/:display_name/mailnumber", async(req,res)=>{
    mailModel.find({display_name:req.params.display_name},{_id:0, mail_id :1},function (err,mail_id){
        if(err) console.log(err);

        return res.json({mailnumber :mail_id.length});
    })
})

//유저 메세지함 출력
router.get("/:display_name/mailList", async(req,res)=>{
    mailModel.find({display_name:req.params.display_name},{_id:0, message:1,display_name:1,sender:1},function (err, message) {
        if(err) console.log(err);

        return res.json(message);
    })
} )
module.exports = router;