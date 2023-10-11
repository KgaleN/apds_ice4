const express = require('express')
const router = express.Router();

const Post = require('../models/post')






router.get('', (req, res) =>
{
    Post.find().then((posts) =>{
        res.json(
            {
                message: 'yasseen add a success message',
                posts:posts
            })
    })
})

router.post('', (req, res) => {
    const post = new Post (
        {
            id: req.body.id,
            caption: req.body.caption,
            likes: req.body.likes,
            imgUrl: req.body.imgUrl    
        }
    )
    post.save();
    res.status(201).json({
        message: 'yasseen add a success message',
        post:post
    })
})

module.exports = router