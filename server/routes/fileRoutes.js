// const express = require("express");
// const multer = require("multer");
// //routes for file upload and management
// const { uploadVideo } = require("../controllers/fileController");
// const { protect } = require("../middleware/authMiddleware");
// const { isAdmin } = require("../middleware/roleMiddleware");

// const { uploadFile } = require("../controllers/fileController");

// const router = express.Router();

// const upload = multer({ storage: multer.memoryStorage() });

// router.post("/upload", upload.single("file"), uploadFile);
// router.get("/videos", protect, async (req, res) => {
//   const videos = await Video.find();
//   res.json(videos);
// });
// module.exports = router;
const express = require("express");
const router = express.Router();

const multer = require("multer");
const upload = multer(); // 🔥 REQUIRED

const { uploadFile } = require("../controllers/fileController");
const { protect } = require("../middleware/authMiddleware");

router.post("/upload", protect, upload.single("file"), uploadFile);

module.exports = router;