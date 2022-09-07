const express = require('express');
const userController = require('../../controller/user.controler')
const router = express.Router()
router
    .route('/random')
    .get(userController.getARandomUser)

router
    .route('/all')
    .get(userController.getAllUser)
router
    .route('/save')
    .post(userController.saveAUser)
router
    .route('/update/:id')
    .patch(userController.updateAUser)
router
    .route('/delete/:id')
    .delete(userController.deleteAUser)
router
    .route('/bulk-update/:ids')
    .patch(userController.updateMultipleUser)

module.exports = router;