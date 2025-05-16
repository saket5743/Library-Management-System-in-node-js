const express = require('express');
const { createRole, getAllRoles, getRoleById, updateRole, deleteRole } = require('../controllers/role.controller');
const router = express.Router();


router.route('/createRole').post(createRole);
router.route('/getAllRoles').get(getAllRoles);
router.route('/:id').get(getRoleById).put(updateRole).delete(deleteRole);

module.exports = router;


