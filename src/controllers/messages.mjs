import Message from '../models/message';
import Utils from "../helper/utils.mjs";

export default class MessagesController {
  static async getMessages(req, res) {
    try {
      // const { userId } = await Utils.getLoggedInUser(req, res);

      // const messages = await Message.find().where('userId').equals(userId).exec();
      const messages = await Message.find().exec();

      res.status(200).json({
        messages
      });
    } catch (error) {
      console.log(error);
    }
  }

  static async getMessage(req, res) {
    try {
      const id = req.params.id;
      const message = await Message.findById(id).exec();
      if (message) {
        res.status(200).json({
          message: "Message retrived successfully",
          message
        });
      } else {
        res.status(404).json({
          message: "Message does not exists"
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  static async sendMessage(req, res) {
    try {
      // const { userId, name } = await Utils.getLoggedInUser(req, res);

      const message = await new Message({
        _id: Utils.generateUniqId(),
        status: 'sent',
        senderId: req.body.senderId,
        receiverId: req.body.receiverId,
        message: req.body.message
      });

      const doc = await message.save();
      res.status(201).json({
        message: 'Messages was sent successfully',
        doc
      });
    } catch (error) {
      console.log(error);
    }
  }

  static async updateMessage(req, res) {
    try {
      const id = req.params.id;
      const message = await Message.updateOne({ _id: id }, { $set: req.body }, { new: true });
      const updatedMessage = await Message.findById(id);
      res.status(200).json({
        message: 'Message was updated successfully',
        updatedMessage
      });
    } catch (error) {
      console.log(error);
    }
  }

  static async deleteMessage(req, res) {
    try {
      const id = req.params.id;
      await Message.remove({ _id: id }).exec();
      res.status(200).json({
        message: 'Message was deleted successfully'
      });
    } catch (error) {
      console.log(error);
    }
  }
}
