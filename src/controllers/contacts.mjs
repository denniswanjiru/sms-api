import Contact from '../models/contact';
import Utils from "../helper/utils.mjs";

export default class ContactsController {
  static async getContacts(req, res) {
    try {
      const { userId } = await Utils.getLoggedInUser(req, res);

      const contacts = await Contact.find().where('userId').equals(userId).exec();

      res.status(200).json({
        message: 'Contacts retrived successfully',
        contacts
      });
    } catch (error) {
      console.log(error);
    }
  }

  static async getContact(req, res) {
    try {
      const id = req.params.id;
      const contact = await Contact.findById(id).exec();

      if (contact) {
        res.status(200).json({
          message: "Contact retrived successfully",
          contact
        });
      } else {
        res.status(404).json({
          message: "Contact not found"
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  static async postContacts(req, res) {
    try {
      const { userId } = await Utils.getLoggedInUser(req, res);

      const contact = await new Contact({
        _id: Utils.generateUniqId(),
        name: req.body.name,
        phone: req.body.phone,
        userId
      });

      const doc = await contact.save();
      res.status(201).json({
        message: 'Contact was created successfully',
        doc
      });
    } catch (error) {
      console.log(error);
    }
  }

  static async updateContact(req, res) {
    try {
      const id = req.params.id;
      const contact = await Contact.updateOne({ _id: id }, { $set: req.body }, { new: true });
      const updatedContact = await Contact.findById(id);
      res.status(200).json({
        message: 'Contact was updated successfully',
        updatedContact
      });
    } catch (error) {
      console.log(error);
    }
  }

  static async deleteContact(req, res) {
    try {
      const id = req.params.id;
      await Contact.remove({ _id: id }).exec();
      res.status(200).json({
        message: 'contact was deleted successfully'
      });
    } catch (error) {
      console.log(error);
    }
  }
}
