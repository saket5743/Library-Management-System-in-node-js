const ApiError = require("../errors/ApiError");
const Roles = require("../models/role.models");
const User = require("../models/user.models");
const { UNAUTHORIZED, CODE_403, USER_NOT_FOUND, CODE_404, PERMISSION_DENIED } = require("../utils/translations");

const checkPermission = (requiredPermission) => {
  return async (req, res, next) => {
    try {
      const userId = req.user?.userId;

      if (!userId) {
        return next(new ApiError(UNAUTHORIZED, CODE_403));
      }

      const user = await User.findById(userId).populate("role");

      if (!user) {
        return next(new ApiError(USER_NOT_FOUND, CODE_404));
      }

      const permissions = await Roles.findOne({ role: user.role });
      console.log("Permissions:", permissions);

      const hasPermission = permissions.permissions.includes(requiredPermission);
      console.log("Has Permission:", hasPermission);
      if (!hasPermission) {
        return next(new ApiError(PERMISSION_DENIED, CODE_403));
      }
      next();
    } catch (error) {
      console.error("Error in checkPermission:", error);
      next(new ApiError(PERMISSION_DENIED, CODE_403));
    }
  };
};

module.exports = checkPermission;
