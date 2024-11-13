import db from "../util/db-connect.js";

// Sample painting array: 40x30 grid with a default color
let currentPainting = Array(1200).fill("#FFFFFF");

// Fetch the current painting
export const getPainting = (req, res) => {
  res.json(currentPainting);
};

// Update the painting
export const updatePainting = (req, res) => {
  const { newColors } = req.body; // Expecting newColors as an array of colors
  if (Array.isArray(newColors) && newColors.length === 1200) {
    currentPainting = newColors;
    res.json({ message: "Painting updated successfully!" });
  } else {
    res.status(400).json({ message: "Invalid painting data" });
  }
};

// upload image to gallery
export const uploadImage = async (req, res) => {
  const { imageData, title, userId } = req.body; // imageData als Array von Farbwerten
  console.log("Received request body:", req.body); // Hier den gesamten Request Body loggen
  console.log("Received userId:", userId);
  try {
    // Überprüfen, ob imageData und title vorhanden sind
    if (!imageData || !title || !userId) {
      return res
        .status(400)
        .json({ message: "Missing image data or title or userId" });
    }

    const result = await db("pixelbox_gallery")
      .insert({ image_data: JSON.stringify(imageData), title, user_id: userId })
      .returning("*");
    res
      .status(201)
      .json({ message: "Image uploaded successfully!", image: result[0] });
  } catch (error) {
    console.error("Error uploading image:", error);
    res.status(500).json({ message: "Error uploading image" });
  }
};

// Fetch all images from the gallery
export const getGalleryImages = async (req, res) => {
  try {
    const images = await db("pixelbox_gallery").select("*"); // Abrufen aller Bilder
    res.json(images);
  } catch (error) {
    console.error("Error fetching gallery images:", error);
    res.status(500).json({ message: "Error fetching gallery images" });
  }
};

// Registriere einen neuen Benutzer
export const registerUser = async (req, res) => {
  const { username, email } = req.body;

  // Überprüfe, ob der Benutzer bereits existiert
  try {
    const existingUser = await db("pixelbox_users").where({ email }).first();
    if (existingUser) {
      return res
        .status(409)
        .json({ message: "Benutzername oder E-Mail bereits vergeben." });
    }

    // Füge den neuen Benutzer hinzu
    const newUser = { username, email };
    const result = await db("pixelbox_users").insert(newUser).returning("*");
    res
      .status(201)
      .json({ message: "Registrierung erfolgreich!", user: result[0] });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Fehler bei der Registrierung" });
  }
};

// Die loginUser-Funktion definieren
export const loginUser = async (req, res) => {
  const { username } = req.body;
  try {
    // Hole alle Daten des Benutzers basierend auf dem Benutzernamen
    const user = await db("pixelbox_users")
      .select("*") // Wählt alle Spalten aus
      .where({ username })
      .first();

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Benutzer gefunden, sende die kompletten Daten zurück
    res.status(200).json({ userInfo: user, message: "Login successful" });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Funktion zum Löschen eines Bildes
// export const deleteImage = async (req, res) => {
//   const imageId = req.params.imageId;
//   const user_id = req.user.id;

//   try {
//     const result = await db("pixelbox_gallery")
//       .where({ id: imageId, user_id })
//       .del();

//     console.log("Delete result:", result);
//     if (result === 0) {
//       return res.status(404).json({
//         message: "Bild nicht gefunden oder keine Berechtigung zum Löschen.",
//       });
//     }

//     res.status(200).json({ message: "Bild erfolgreich gelöscht!" });
//   } catch (error) {
//     console.error("Error deleting image:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };
// Funktion zum Löschen eines Bildes
export const deleteImage = async (req, res) => {
  const imageId = req.params.imageId;

  // userId aus req.user extrahieren (nach Authentifizierung)
  const userId = req.body.userId;

  try {
    // Bild löschen, wenn id und userId übereinstimmen
    const result = await db("pixelbox_gallery")
      .where({ id: imageId, user_id: userId })
      .del();

    console.log("Delete result:", result);

    if (result === 0) {
      return res.status(404).json({
        message: "Bild nicht gefunden oder keine Berechtigung zum Löschen.",
      });
    }

    res.status(200).json({ message: "Bild erfolgreich gelöscht!" });
  } catch (error) {
    console.error("Error deleting image:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
