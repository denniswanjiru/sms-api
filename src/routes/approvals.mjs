import express from 'express';

import ApprovalsController from '../controllers/approvals.mjs';
import Validator from '../middlewares/approvalsValidator';

const router = express.Router();
router.patch(
    '/approve/:id',
    Validator.validateApproval('approve', 'pending'),
    ApprovalsController.approveRequest
);

router.patch(
    '/reject/:id',
    Validator.validateApproval('reject', 'pending'),
    ApprovalsController.rejectRequest
);

router.patch(
    '/resolve/:id',
    Validator.validateApproval('resolve', 'approved'),
    ApprovalsController.resolveRequest
);

export default router;