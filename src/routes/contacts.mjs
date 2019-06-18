import express from 'express';
import ContactsController from '../controllers/contacts.mjs';
// import UtilMiddleware from '../middlewares/utilMiddlewares.mjs';

const router = express.Router();

router.get('/', ContactsController.getContacts);
router.get('/:id', ContactsController.getContact);
router.post('/', ContactsController.postContacts);
router.patch('/:id', ContactsController.updateContact);
router.delete('/:id', ContactsController.deleteContact);

export default router;
