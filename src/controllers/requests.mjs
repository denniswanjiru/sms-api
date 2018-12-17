import Request from '../models/request';
import Utils from "../helper/utils.mjs";

export default class RequestsController {
  static async getRequests(req, res) {
    try {
      const { userId, role } = await Utils.getLoggedInUser(req, res);

      const requests =  role === 'admin' ?
        await Request.find().exec() :
        await Request.find().where('userId').equals(userId).exec();

       res.status(200).json({
        message: 'Requests retrived successfully',
        requests
      });
    } catch (error) {
      console.log(error);
    }
  }

  static async getRequestDetails(req, res) {
    try {
      const id = req.params.id;
      const request = await Request.findById(id).exec();
      res.status(200).json({
        message: "Request retrived successfully",
        request
      });
    } catch (error) {
      console.log(error);
    }
  }

  static async postRequests(req, res) {
    try {
      const { userId } = await Utils.getLoggedInUser(req, res);

      const request = await new Request({
        _id: Utils.generateUniqId(),
        title: req.body.title,
        location: req.body.location,
        desc: req.body.desc,
        status: 'pending',
        userId
      });

      const doc = await request.save();
      res.status(201).json({
        message: 'Requests was created successfully',
        doc
      });
    } catch (error) {
      console.log(error);
    }
  }

  static async updateRequest(req, res) {
    try {
      const id = req.params.id;
      const request = await Request.updateOne({ _id: id }, { $set: req.body }, { new: true });
      const updatedReq = await Request.findById(id);
      res.status(200).json({
        message: 'Request was updated successfully',
        updatedReq
      });
    } catch (error) {
      console.log(error);
    }
  }

  static async deleteRequest(req, res) {
    try {
      const id = req.params.id;
      await Request.remove({ _id: id }).exec();
      res.status(200).json({
        message: 'Request was deleted successfully'
      });
    } catch (error) {
      console.log(error);
    }
  }
}
