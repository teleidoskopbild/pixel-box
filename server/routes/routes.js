import express from "express";
const router = express.Router();
import {
  // getPainting,
  updatePainting,
  uploadImage,
  getGalleryImages,
  registerUser,
  loginUser,
  deleteImage,
} from "../controllers/controllers.js";

// Test route
router.get("/", (req, res) => {
  res.send("API is working!");
});

// Route to fetch the painting
// router.get("/painting", getPainting);

// Route to update the painting
router.post("/painting", updatePainting);

router.post("/gallery/upload", uploadImage);

router.get("/gallery", getGalleryImages);

// Route for user registration
router.post("/register", registerUser);

router.post("/login", loginUser);

// Route zum Löschen eines Bildes
router.delete("/gallery/delete/:imageId", deleteImage);

export default router;
