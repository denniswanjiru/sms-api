import express from 'express';
import RequestsController from '../controllers/requests.mjs';
import UtilMiddleware from '../middlewares/utilMiddlewares.mjs';

const router = express.Router();

router.get('/', RequestsController.getRequests);
router.post('/', RequestsController.postRequests);
router.patch('/:id', RequestsController.updateRequest);
router.delete('/:id', RequestsController.deleteRequest);
router.get('/:id', RequestsController.getRequestDetails);

export default router;
