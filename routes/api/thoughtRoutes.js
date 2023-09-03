const router = require("express").Router();
const {
  getAllThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThoughtById,
  addReaction,
  removeReaction,
} = require("../../controllers/toughtControlller");

//--> /api/thought

router.route("/").get(getAllThoughts).post(createThought);

//--> /api/thought/:toughtId

router
  .route("/:thoughtId")
  .get(getSingleThought)
  .put(updateThought)
  .delete(deleteThoughtById);

//--> /api/thought/:thoughtId/reaction
router.route("/:thoughtId/reaction").post(addReaction);

//--> /api/thought/:thoughtId/reaction/:reactionId
router.route("/:reactionId").delete(removeReaction);

module.exports = router;
