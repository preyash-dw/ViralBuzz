import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const contentSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['video', 'post'],
    required: true
  },
  category: {
    type: String,
    required: true
  },
  video: {
    type: String,
    required: function () {
      return this.type === 'video';
    }
  },
  image: {
    type: String,
    required: function () {
      return this.type === 'post';
    }
  },
  description: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  exactTime: {
    type: String,
    default: function() {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      const seconds = now.getSeconds().toString().padStart(2, '0');
      return `${hours}:${minutes}:${seconds}`;
    }
  },
  viewCount: {
    type: Number,
    default: 0
  }
});

const Content = model('Content', contentSchema);

export default Content;

