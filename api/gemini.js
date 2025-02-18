const express = require('express');
const { GoogleGenerativeAI, GoogleAIFileManager } = require('@google/generative-ai');
const fetch = require('node-fetch');
require('dotenv').config();

const router = express.Router();
const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);
const fileManager = new GoogleAIFileManager(apiKey);

// Stockage de l'historique des conversations (en mémoire pour cet exemple)
const conversationHistory = {};

// Configuration du modèle
const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

// Fonction pour uploader une image
async function uploadImage(imageUrl) {
  const response = await fetch(imageUrl);
  if (!response.ok) {
    throw new Error("Échec du téléchargement de l'image");
  }
  const buffer = await response.buffer();
  const file = await fileManager.uploadFile(buffer, { mimeType: "image/jpeg", displayName: "image" });
  console.log(`Image téléchargée : ${file.displayName}`);
  return file;
}

router.get('/', async (req, res) => {
  try {
    const { prompt, uid, image } = req.query;

    if (!prompt || !uid) {
      return res.status(400).json({ error: "Le prompt et l'UID sont nécessaires" });
    }

    // Si l'UID n'a pas encore de conversation enregistrée, on initialise l'historique
    if (!conversationHistory[uid]) {
      conversationHistory[uid] = [
        { role: "user", parts: [{ text: "Bonjour, je peux vous aider ?" }] }
      ];
    }

    // Ajouter la question de l'utilisateur à l'historique
    conversationHistory[uid].push({
      role: "user",
      parts: [{ text: prompt }],
    });

    // Si une image est fournie, on l'upload
    let files = [];
    if (image) {
      try {
        const file = await uploadImage(image);
        files.push(file);
      } catch (error) {
        return res.status(500).json({ error: "Erreur lors du téléchargement de l'image" });
      }
    }

    // Créer une session de chat avec l'historique et les fichiers (si image présente)
    const chatSession = model.startChat({
      generationConfig,
      history: conversationHistory[uid],
    });

    // Effectuer la requête vers Gemini
    const result = await chatSession.sendMessage(prompt);

    // Ajouter la réponse du modèle à l'historique
    conversationHistory[uid].push({
      role: "model",
      parts: [{ text: result.response.text() }],
    });

    // Envoyer la réponse au client
    return res.json({ response: result.response.text() });

  } catch (error) {
    console.error("Erreur API Gemini:", error);
    res.status(500).json({ error: "Erreur lors de la requête à Gemini." });
  }
});

module.exports = router;
