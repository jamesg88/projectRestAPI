const Joi = require('joi');
const express = require('express');//loading express module 
const app = express();

app.use(express.json());

const courses = [
    {id: 1, name: 'Physics'},
    {id: 2, name: 'Calculus'},
    {id: 3, name: 'Quantum Theory'},
    {id: 4, name: 'Artificial Intelligence'},
    {id: 5, name: 'Machine Learning'}
];
app.get('/', (req, res) => {
    res.send('Top Of The Morning!!!'<br>'Welcome to Online Classes')
});

//all courses 
app.get('/api/courses', (req, res) => {
    res.send([courses]);
});

//single course 
app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) res.status(404).send('The course with the given id was not found')
    res.send(course);
});


app.post('/api/courses', (req, res) => {
    const { error } = validateCourse(req.body);
    if (error){
        res.status(400).send(error.details[0].message);
        return;
    }
    
    const course =  {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course)
});

app.put('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) res.status(404).send('The course with the given id was not found')

    const { error } = validateCourse(req.body);
    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }

    course.name = req.body.name;
    res.send(course);
});

app.delete('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) res.status(404).send('The course with the given id was not found')

    const index =courses.indexOf(course);
    courses.splice(index, 1)

    res.send(course);
});




    function validateCourse(course) {
        const schema = {
            name: Joi.string().min(3).required()
        };

         return Joi.validate(course, schema);
}   