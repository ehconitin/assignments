const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const { Admin, Course } = require("../db");
const router = Router();
const jwt = require("jsonwebtoken");
const secretPass = "secret";


// Admin Routes
router.post('/signup', (req, res) => {
    // Implement admin signup logic
    const username= req.body.username;
    const password= req.body.password;
    

    Admin.create({
        username: username,
        password: password
    })

    res.json({
        message: 'Admin created successfully'
    })
});

router.post('/signin', async (req, res) => {
    // Implement admin signup logic
    const username = req.body.username;
    const password = req.body.password;
    const payload = {"username": username};
    Admin.findOne({
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
                msg : "Admin doenst exist"
            })
        }
    })

});

router.post('/courses', adminMiddleware, async (req, res) => {
    // Implement course creation logic
    const title = req.body.title;
    const description = req.body.description;
    const imageLink = req.body.imageLink;
    const price = req.body.price;

    const course = await Course.create({
        title: title,
        description: description,
        price: price,
        imageLink: imageLink
    })
    res.json({
        message: 'Course created successfully', courseId: course._id
    })

    
});

router.get('/courses', adminMiddleware, async (req, res) => {
    // Implement fetching all courses logic
    const allCourses = await Course.find({});
    res.json({
        courses: allCourses
    })
});

module.exports = router;