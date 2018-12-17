import jwtDecode from "jwt-decode";
import Utils from "../helper/utils.mjs";

export default class UtilMiddleware {
  static async authenticate(req, res, next) {
    try {
      const user = await Utils.getLoggedInUser(req, res);
      next(user);
    } catch (error) {
      return res.status(500).json({
        error
      });
    }
  }

  static checkUserRole(allowedRoles) {
    return async (user, req, res, next) => {
      try {
        const isAllowed = await allowedRoles.find(req => req === user.role);
        if(!isAllowed) {
          return res.status(401).json({
            message: "You are not authorized to perform this action"
          });
        };

        next();
      } catch (error) {
        return res.status(500).json({
          error
        });
      }
    }
  }
}
