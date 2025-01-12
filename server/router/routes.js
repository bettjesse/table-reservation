import { Router } from "express";
const router= Router()

// import all controller
import * as controller from "../controllers/userLogin.js"
import { registerMail } from "../controllers/mailer.js";
import * as reservationcontroller from "../controllers/tableReservation.js"

//import middleware
import { verifyUser,verifyAdmin,localVariables } from "../middleware/auth.js";
//POST methods
router.route("/register").post(controller.register)
router.route("/createtable").post(verifyUser,verifyAdmin, reservationcontroller.createTable)
router.route('/registerMail').post(registerMail)

router.route("/authenticate").post()
router.route("/login").post(controller.login)
router.route("/logout").post(controller.logoutUser)

router.route("/reservations").post(verifyUser,reservationcontroller.createReservation)

//get methods
router.route("/user").get( verifyUser, controller.getUser)
router.route("/generateOTP").get(verifyUser,localVariables, controller.generateOTP)
router.route("/verifyOTP").get( verifyUser, controller.verifyOTP)
router.route("/createResetSession").get(controller.createResetSession)
router.route('/allreservations').get(verifyUser,verifyAdmin,reservationcontroller.getAllReservations)
router.route('/reservations/:id').get(reservationcontroller.getReservationById)
router.route('/table-availability').get(verifyUser,verifyAdmin, reservationcontroller.getTableAvailability)
router.route('/reservations/guest/:id').get(reservationcontroller.getGuestDetails)
router.route('/my-reservations').get( verifyUser, reservationcontroller.getCustomerReservations)
router.route("/reservations/report").get(reservationcontroller.getReservationReport)
router.route("/redirect/google").get(controller.googleOauthHandler )

// jeyse1@gmail.com
// Jesse@123

//put methods
router.route("/updateuser").put(verifyUser, controller.updateUser)
router.route("/resetPassword").put( verifyUser, controller.resetPassword)
router.route('/reservations/:reservationId').put(verifyUser, reservationcontroller.updateReservation)
// Update reservation status to canceled
router.route('/reservations/:reservationId/cancel').put(verifyUser, reservationcontroller.cancelReservation);

router.route('/assigntable').put(verifyUser,verifyAdmin, reservationcontroller.assignTable)

//delete methods
router.route('/reservations/:id').delete(reservationcontroller.deleteReservation)

export default router
