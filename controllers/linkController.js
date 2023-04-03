const Link = require('../models/Link');


const getAllLinks = async (req, res) => {
    try {
        const docs = await Link.find({})
        // res.send(doc);
        res.render('all', { links: docs })
    } catch (error) {
        console.log(error)
    }
}

const redirect = async (req, res, next) => {
    const title = req.params.title;
    try {
        let doc = await Link.findOneAndUpdate({ title }, {$inc: {click: 1}});
        // res.send(doc);
        if (doc) {
            res.redirect(doc.url);
        } else {
            next();
        }
    } catch (error) {
        res.send(error)
    }
}

const addLink = async (req, res) => {
    const body = req.body
    console.log(body)

    //Instanciando um modelo Link para criar um novo link
    const link = new Link(body)
    try {
        let doc = await link.save()
        res.redirect('/')
    } catch (error) {
        res.render('add', { error, body })
    }
}

const deleteLink = async (req, res) => {
    
    let id = req.params.id;

    if (!id) {
        id = req.body.id;
    }

    try {
        await Link.findByIdAndRemove(id);
        res.send(id);
    } catch (error) {
        res.status(404).send(error)
    }

}

const loadLink = async (req, res) => {
    let id = req.params.id;
    if (!id) {
        id = req.body.id;
    }
    try {
        let doc = await Link.findById(id);
        res.render('edit', { error: false, body: doc});
    } catch (error) {
        res.status(404).send(`<h1><i>${error.message}</i></h1>`)
    }
}

const editLink = async (req, res) => {
    let id = req.params.id;
    let link = {};
    link.title = req.body.title;
    link.description = req.body.description;
    link.url = req.body.url;

    try {
        let doc = await Link.updateOne({ _id: id}, link);
        res.redirect('/')
    } catch (error) {
        res.render('edit', { error, body: req.body});
    }
    
}

module.exports = { redirect, addLink, getAllLinks, deleteLink, loadLink, editLink }