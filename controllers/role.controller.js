const ApiError = require("../errors/ApiError");
const ApiResponse = require("../errors/ApiResponseCode");
const asyncWrapper = require("../middleware/asyncWrapper.middleware");
const Roles = require("../models/role.models");
const { CODE_400, BOOL_FALSE, CODE_200, BOOL_TRUE, CODE_404 } = require("../utils/translations");

// Create a role
const createRole = asyncWrapper(async (req, res) => {
  const role = await Roles.create(req.body);

  if (!role) {
    return res.status(CODE_400).json(new ApiError("Role not found", CODE_400, BOOL_FALSE));
  }
  res.status(CODE_200).json(new ApiResponse(CODE_200, role, "Role Created Successfully", BOOL_TRUE));
});

// Get All role
const getAllRoles = asyncWrapper(async (req, res) => {
  const roles = await Roles.find();
  if (!roles) {
    res.status(CODE_404).json(new ApiError("Roles are not found", CODE_404, BOOL_FALSE));
  }
  res.status(CODE_200).json(new ApiResponse(CODE_200, roles, "Roles are found", BOOL_TRUE));
});

// Get role by Id
const getRoleById = asyncWrapper(async (req, res) => {
  const { id: roleId } = req.params;
  const role = await Roles.findById({ _id: roleId });
  if (!role) {
    res.status(CODE_404).json(new ApiError("Role not found", CODE_404, BOOL_FALSE));
  }
  res.status(CODE_200).json(new ApiResponse(CODE_200, role, "Role found", BOOL_TRUE));
});

// Update role
const updateRole = asyncWrapper(async (req, res) => {
  const { id: roleId } = req.params;
  const role = await Roles.findByIdAndUpdate({ _id: roleId }, req.body, {
    new: true,
    runValidators: true,
    overwrite: true
  });
  if (!role) {
    res.status(CODE_400).json(new ApiError("Role not updated", CODE_404, BOOL_FALSE));
  }
  res.status(CODE_200).json(new ApiResponse(CODE_200, role, "Role Updated Successfully", BOOL_TRUE));
});

// Delete role
const deleteRole = asyncWrapper(async (req, res) => {
  const { id: roleId } = req.params;
  const role = await Roles.findByIdAndDelete({ _id: roleId });
  if (!role) {
    res.status(CODE_400).json(new ApiError("Role not deleted", CODE_404, BOOL_FALSE));
  }
  res.status(CODE_200).json(new ApiResponse(CODE_200, role, "Role Deleted Successfully", BOOL_TRUE));
});

module.exports = {
  createRole,
  getAllRoles,
  getRoleById,
  updateRole,
  deleteRole
}




