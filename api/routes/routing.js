import express from "express";
import multer from "multer";
import mongoose from "mongoose";
import Content from "../model/contentmodel.js";
import path from "path";

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    if (file.mimetype.startsWith("image/")) {
      return cb(null, `${Date.now()}-${file.originalname}`);
    } else if (file.mimetype.startsWith("video/")) {
      return cb(null, `${Date.now()}-${file.originalname}`);
    } else {
      return cb(new Error("Invalid file type."));
    }
  },
});
const upload = multer({ storage: storage });

router.post("/upload", upload.single("file"), async (req, res) => {
  const { title, type, description ,category } = req.body;

  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded." });
  }

  let filePath;
  if (req.file.mimetype.startsWith("image/")) {
    filePath = `/uploads/${req.file.filename}`;
  } else if (req.file.mimetype.startsWith("video/")) {
    filePath = `/uploads/${req.file.filename}`;
  } else {
    return res.status(400).json({ error: "Invalid file type." });
  }

  const newContent = new Content({
    title,
    type,
    category,
    description,
    ...(req.file.mimetype.startsWith("image/") && { image: filePath }),
    ...(req.file.mimetype.startsWith("video/") && { video: filePath }),
    date: new Date(),
    exactTime: new Date().toLocaleTimeString(),
  });

  try {
    const savedContent = await newContent.save();
    res.status(201).json(savedContent);
  } catch (err) {
    res.status(500).json({ error: err.toString() });
  }
});

router.get("/contents", async (req, res) => {
  try {
    const { category } = req.query;
    let query = { type: "post" };
    if (category) {
      query.category = category;
    }
    const contents = await Content.find(query).sort({ date: -1, exactTime: -1 });
    res.status(200).json(contents);
  } catch (err) {
    res.status(500).json({ error: err.toString() });
  }
});


  router.get("/videos", async (req, res) => {
    try {
      const videos = await Content.find({ type: "video" }).sort({ date: -1, exactTime: -1 });
      res.status(200).json(videos);
    } catch (err) {
      res.status(500).json({ error: err.toString() });
    }
  });


  router.get("/contents/views", async (req, res) => {
    try {
      const contents = await Content.find({ type: "post" }).sort({ viewCount: -1 }).limit(20);
      res.status(200).json(contents);
    } catch (err) {
      res.status(500).json({ error: err.toString() });
    }
  });
  
  
  router.get("/videos/views", async (req, res) => {
    try {
      const videos = await Content.find({ type: "video" }).sort({ viewCount: -1 });
      res.status(200).json(videos);
    } catch (err) {
      res.status(500).json({ error: err.toString() });
    }
  });
  

  router.put('/content/:id/view', async (req, res) => {
    const { id } = req.params;
  
    try {
      const content = await Content.findById(id);
      if (!content) {
        return res.status(404).json({ message: 'Content not found' });
      }
  
      content.viewCount += 1;
      await content.save();
  
      res.json({ message: 'View count increased', content });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  });




  //for deleting


  router.delete("/content/cleanup", async (req, res) => {
    try {
      const types = ['post', 'video'];
  
      for (let type of types) {
        const contents = await Content.find({ type }).sort({ date: 1 }); 
  
        while (contents.length > 50) {
          const oldestContent = contents.shift(); 
          await Content.findByIdAndDelete(oldestContent._id); 
        }
      }
  
      res.json({ message: 'Cleanup completed' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  });
  

export default router;
