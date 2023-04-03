const express = require('express');
const router = express.Router();
const linkController = require('../controllers/linkController.js');

const { redirect, getAllLinks, addLink, deleteLink, loadLink, editLink } = linkController;


/*=================ROTAS===============*/
// router.get('/all', getAllLinks)

//Rotas de API
router.get('/:title', redirect)
router.get('/edit/:id', loadLink);

router.post('/', express.urlencoded({extended: true}), addLink);
router.post('/edit/:id', express.urlencoded({extended: true}), editLink)

router.delete('/:id', deleteLink)
router.delete('/', express.json(), deleteLink)


//Rotas de redirecionamento
router.get('/', getAllLinks)
router.get('/add', (req, res) => res.render('add', { error: false, body: {} }))

 
/*=================EXPORTAÇÃO DAS ROTAS===============*/
module.exports = router;