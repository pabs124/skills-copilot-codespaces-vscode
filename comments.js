// Create web server
// 1. Create a web server
// 2. Create a route for GET /comments
// 3. Create a route for POST /comments
// 4. Create a route for GET /comments/:id
// 5. Create a route for PUT /comments/:id
// 6. Create a route for DELETE /comments/:id
// 7. Create a route for GET /comments/:id/children
// 8. Create a route for DELETE /comments/:id/children

// Load modules
const express = require('express');
const Joi = require('joi');
const fs = require('fs');
const app = express();
const port = 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Data
let comments = [];
let id = 0;

// Routes
app.get('/comments', (req, res) => {
    res.send(comments);
});

app.post('/comments', (req, res) => {
    const schema = Joi.object({
        text: Joi.string().min(1).required(),
        user: Joi.string().min(1).required(),
        parent: Joi.number().min(0).optional()
    });

    const result = schema.validate(req.body);

    if (result.error) {
        res.status(400).send(result.error.details[0].message);
        return;
    }

    const comment = {
        id: ++id,
        text: req.body.text,
        user: req.body.user,
        parent: req.body.parent
    };

    comments.push(comment);
    res.send(comment);
});

app.get('/comments/:id', (req, res) => {
    const comment = comments.find(c => c.id === parseInt(req.params.id));

    if (!comment) {
        res.status(404).send('The comment with the given ID was not found.');
        return;
    }

    res.send(comment);
});

app.put('/comments/:id', (req, res) => {
    const comment = comments.find(c => c.id === parseInt(req.params.id));

    if (!comment) {
        res.status(404).send('The comment with the given ID was not found.');
        return;
    }

    const schema = Joi.object({
        text: Joi.string().min(1).required(),
        user: Joi.string().min(1).required(),
        parent: Joi.number().min(0).optional()
    });

    const result = schema.validate(req.body);

    if (result.error) {
        res.status(400).send(result.error.details[0].message);
        return;
    }

    comment.text = req.body.text;
    comment.user = req.body.user;
    comment.parent = req.body.parent;

    res.send(comment);
});

app.delete('/comments/:id', (req, res) => {
    const comment = comments.find(c => c.id === parseInt(req.params.id));

    if (!comment) {
        res.status(404).send('The comment with the given ID was not found.');
        return;
    }

    const index = comments.indexOf(comment);
    comments.splice(index, 1);

    res.send(comment);
});

app.get('/comments/:id/children', (req, res) => {
    const comment = comments.find(c => c.id === parseInt(req.params.id));

    if (!comment) {
        res.status(404).send('The comment with the given ID was not found.');
        return;
    }

    const children = comments.filter(c => c.parent === comment.id);

    res.send(children);
});

app.delete('/comments/:id/children', (req, res) => {
    const comment = comments.find(c => c.id === parseInt(req.params.id));

    if (!comment) {
        res.status(404).send('The comment with the given ID was not found.');
        return;
    }

    const children = comments.filter(c => c.parent === comment.id);

    children.forEach(c => {
        const index = comments.indexOf(c);
        comments.splice(index, 1);
    });

    res.send(children);
});

// Start the server
app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});