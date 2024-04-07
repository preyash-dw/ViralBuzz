import express from "express";
import multer from "multer";
import mongoose from "mongoose";
import Content from "../model/contentmodel.js";
import path from "path";
import AWS from "aws-sdk";
import dotenv from 'dotenv';
dotenv.config();

const router = express.Router();

// Configure AWS
AWS.config.update({
  accessKeyId: process.env.ACCESS_KEY,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
  region: process.env.BUCKET_REGION
});

const s3 = new AWS.S3();

const upload = multer({
  storage: multer.memoryStorage() 
});

router.post("/upload", upload.single("file"), async (req, res) => {
  const { title, type, description, category } = req.body;
  console.log(req.body);

  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded." });
  }
  
  console.log(req.file);
  const params = {
    Bucket: viralbuzz-app,
    Key: `${Date.now()}-${req.file.originalname}`,
    Body: req.file.buffer
  };

  try {
    const data = await s3.upload(params).promise();

    const filePath = data.Location;
    const newContent = new Content({
      title,
      type,
      category,
      description,
      image: filePath, 
      ...(type === "video" && { video: filePath }), 
      date: new Date(),
      exactTime: new Date().toLocaleTimeString()
    });
    

    const savedContent = await newContent.save();
    res.status(201).json(savedContent);
  } catch (err) {
    console.error("Error uploading to S3:", err);
    res.status(500).json({ error: "Error uploading to S3" });
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
