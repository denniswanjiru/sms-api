import Request from '../models/request';

export default class ApprovalsController {
    static async approveRequest(req, res){
        try{
            const id = req.params.id;
            const approval = { status: 'approved' };
            await Request.updateOne({ _id:id }, {$set: approval});
            const approvedRequest = await Request.findById(id).exec();
            res.status(200).json({
                message: 'Request approved successfully',
                approvedRequest
            });
        } catch (error) {
            console.log(error);
        }
    }

    static async rejectRequest(req, res){
        try{
            const id = req.params.id;
            const approval = { status: 'rejected' };
            await Request.updateOne({ _id:id }, {$set: approval});
            const rejectedRequest = await Request.findById(id).exec();
            res.status(200).json({
                message: 'Request rejected successfully',
                rejectedRequest
            });
        } catch (error) {
            console.log(error);
        }
    }

    static async resolveRequest(req, res){
        try{
            const id = req.params.id;
            const approval = { status: 'resolved' };
            await Request.updateOne({ _id:id }, {$set: approval});
            const resolvedRequest = await Request.findById(id).exec();
            res.status(200).json({
                message: 'Request resolved successfully',
                resolvedRequest
            });
        } catch (error) {
            console.log(error);
        }
    }
}
