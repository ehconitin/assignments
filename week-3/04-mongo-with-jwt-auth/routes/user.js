const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { User, Course } = require("../db");
const jwt = require("jsonwebtoken");
const secretPass= "secret";


// User Routes
router.post('/signup', (req, res) => {
    // Implement user signup logic
    const username= req.body.username;
    const password= req.body.password;
    

    User.create({
        username: username,
        password: password
    })

    res.json({
        message: 'User created successfully'
    })
});

router.post('/signin', (req, res) => {
    // Implement admin signup logic
    const username = req.body.username;
    const password = req.body.password;
    const payload = {"username": username};
    User.findOne({
        username: username,
        password: password
    })
    .then(function(value){
        if(value){
            const token = jwt.sign(payload,secretPass);
            res.json({
                token: token
            })
        }else{
            res.status(403).json({
                msg : "User doenst exist"
            })
        }
    })
});

router.get('/courses', async (req, res) => {
    // Implement listing all courses logic
    const allCourses = await Course.find({});
    res.json({
        courses: allCourses
    })
});

router.post('/courses/:courseId', userMiddleware, async (req, res) => {
    // Implement course purchase logic
    const courseId = req.params.courseId;
    const user = req.decoded;
    await User.updateOne({
        username: user.username
    },{
        "$push":{
            purchasedCourses: courseId
        }
    });
    res.json({
        msg: "Course purchased"
    })

});

router.get('/purchasedCourses', userMiddleware, async (req, res) => {
    // Implement fetching purchased courses logic
    const user = req.decoded;
    const userDetails = await User.findOne({
        username: user.username
    });
    const courses = await Course.find({
        _id: {
            "$in": userDetails.purchasedCourses
        }
    })
    res.json({
        purchasedCourses: courses
    })
});

module.exports = router