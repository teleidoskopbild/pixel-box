-- Lösche die Tabelle, wenn sie existiert
DROP TABLE IF EXISTS pixelbox_ratings; 
DROP TABLE IF EXISTS pixelbox_gallery;
DROP TABLE IF EXISTS pixelbox_users;

-- Erstelle die Tabelle für Benutzer
CREATE TABLE pixelbox_users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Erstelle die Tabelle für die Galerie
CREATE TABLE pixelbox_gallery (
    id SERIAL PRIMARY KEY,
    image_data TEXT NOT NULL,
    title VARCHAR(100),
    user_id INT NOT NULL,  -- Hinzufügen einer Benutzer-ID für die Verknüpfung mit der Tabelle users
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES pixelbox_users(id) ON DELETE CASCADE  -- Verknüpfung mit pixelbox_users
);

-- Erstelle Table für Ratings 
CREATE TABLE pixelbox_ratings (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,  -- Die ID des Benutzers, der die Bewertung abgibt
    gallery_id INT NOT NULL,  -- Die ID des Bildes in der Galerie, das bewertet wird
    rating INT CHECK (rating >= 1 AND rating <= 5),  -- Bewertung zwischen 1 und 5
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  -- Zeitstempel der Bewertung
    UNIQUE (user_id, gallery_id),  -- Sicherstellen, dass ein Benutzer ein Bild nur einmal bewerten kann
    FOREIGN KEY (user_id) REFERENCES pixelbox_users(id) ON DELETE CASCADE,  -- Verknüpfung mit pixelbox_users
    FOREIGN KEY (gallery_id) REFERENCES pixelbox_gallery(id) ON DELETE CASCADE  -- Verknüpfung mit pixelbox_gallery
);

