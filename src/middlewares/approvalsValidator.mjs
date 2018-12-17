import Request from '../models/request';

export default class ApprovalValidator {

    static validateApproval(action, condition) {
        return async (req, res, next) => {
            try {
                const id = req.params.id;
                const request = await Request.findById(id).exec();

                if (!request) {
                    return res.status(404).json({
                        success: false,
                        message: 'Request does not exists'
                    });

                }
                const currentStatus = request.status;
                if (currentStatus !== condition) {
                    return res.status(400).json({
                        success: false,
                        message: `You can only ${action} ${condition} requests`
                    });

                }
                next();

            } catch (error) {
                console.log(error);
            }
        }
    }

}