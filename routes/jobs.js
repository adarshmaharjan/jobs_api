const express = require("express");

const router = express.Router();

const {
  createJob,
  deleteJobs,
  getAllJobs,
  getJob,
  updateJob,
  
} = require("../controllers/jobs");

router.route("/").post(createJob).get(getAllJobs);
router.route("/:id").get(getJob).delete(deleteJobs).patch(updateJob);

module.exports = router;
