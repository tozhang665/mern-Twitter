const express = require("express");
const router = express.Router();
const passport = require("passport")
const validateTweetInput = require("../../../validation/tweet")
const Tweet = require("../../../models/Tweet")


router.get("/test", (req, res) => res.json({ msg: "This is the tweets route" }));


router.get("/",(req,res) =>{
  Tweet
    .find()
    .sort({date: -1})
    .then(tweets => res.json(tweets))
    .catch(err => res.status(400).json(err))
})

router.get("/user/:user_id", (req,res)=>{
  Tweet
    .find({user: req.params.user_id})
    .then(tweets => res.json(tweets))
    .catch(err => res.status(400).json(err))
})

router.get("/:id" , (req,res)=>{
  Tweet
    .findById(req.params.id)
    .then(tweet => res.json(tweet))
    .catch(err => res.status(400).json(err))
});

  
router.post("/",
  passport.authenticate("jwt",{session:false}),
  (req,res)=>{
    console.log("hit1")
    const {isValid, errors} = validateTweetInput(req.body);
    console.log("hit2")
    if(!isValid){
      return res.status(400).json(errors);
    }
    console.log("hit3")
    const newTweet = new Tweet({
      user: req.user.id,
      text: req.body.text
    })
     newTweet.save().then(tweet => res.json(tweet));
  }
)


module.exports = router;
