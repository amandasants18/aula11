const express = require("express");
const router = express.Router();

const controller = require("../controllers/travelsControllers");

router.get("/travels", controller.getAllTravels); //ok
router.get("/travels/:id", controller.getTravelsById); //ok


router.post("/travels/:id/passenger/create", controller.createPerson); //ok
router.post("/travels/:id/driver/create", controller.createDriver); //ok
router.get("/travels/capacity", controller.getAllPassengerCapacity);

router.delete("/passenger/:id/delete", controller.deletePerson); //ok
router.delete("/travels/:id/delete", controller.deleteTravel); //ok

router.put("travels/:id/driver", controller.replaceDriver) 
router.put("/passenger/:id/update", controller.updatePerson) // ok

router.patch("/passenger/:id/updateName", controller.updateName) //ok
router.patch("/driver/:id/updateDriver", controller.updateDriver)



module.exports = router; 