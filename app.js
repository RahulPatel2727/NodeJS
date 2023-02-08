const express = require('express');
const app = express();
const Joi = require('joi');
app.use(express.json());


app.get('/', (req, res) => {
    res.send('Hi temp');
});
let courses = [
    { id: 1, name: "course 1" },
    { id: 2, name: "course 2" },
    { id: 3, name: "course 3" },
];

app.get('/api/courses', (req, res) => {
    res.send(courses);
});


app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course)
        res.status(404).send("The course u r looking for is not available");
    else
        res.send(course);
});


app.post('/api/courses', (req, res) => {
    const schema = {
        name: Joi.string().min(3).required()
    }

    const result = Joi.validate(req.body, schema);
    // console.log(result);
    if (result.error) {
        res.status(400).send(result.error.details[0].message)
        return;
    }

    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
});

app.delete('/api/courses/:id', (req, res) => {
    const courseIndex = courses.findIndex(c => c.id === parseInt(req.params.id));

    if (courseIndex !== -1) {
        const deletedCourse = courses.splice(courseIndex, 1)[0];
        res.status(200).send(`Course "${deletedCourse.name}" has been deleted.`);
    } else {
        res.status(400).send(`No course found with id "${req.params.id}".`);
    }
});


app.post('/comments'. (req, res) => {
    const{user, text} = req;
    body;
})


const port = process.env.PORT || 3000;

app.listen(port);