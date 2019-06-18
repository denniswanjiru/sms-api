import jwtDecode from "jwt-decode";
import Utils from "../helper/utils.mjs";

export default class UtilMiddleware {
  static async authenticate(req, res, next) {
    try {
      const user = await Utils.getLoggedInUser(req, res);
      console.log('USER', user)
      next();
    } catch (error) {
      console.log('ERROR', error);
      return res.status(500).json({
        error
      });
    }
  }
}
