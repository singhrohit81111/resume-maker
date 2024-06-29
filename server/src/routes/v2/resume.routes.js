const express=require('express');
const router=require('router');


router.route('/get-resume').get()
router.route('create-resume').post()

module.exports=router;
