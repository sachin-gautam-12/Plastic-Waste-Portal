const mongoose = require('mongoose');

const campaignSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a campaign title'],
    trim: true,
    maxlength: [200, 'Title cannot exceed 200 characters']
  },
  description: {
    type: String,
    required: [true, 'Please provide a campaign description']
  },
  shortDescription: {
    type: String,
    maxlength: [300, 'Short description cannot exceed 300 characters']
  },
  category: {
    type: String,
    enum: ['recycling', 'awareness', 'cleanup', 'innovation', 'education'],
    required: true
  },
  tags: [{
    type: String,
    trim: true
  }],
  organizer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  organizerName: {
    type: String,
    required: true
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point'
    },
    coordinates: {
      type: [Number], // [longitude, latitude]
      required: true
    },
    address: String,
    city: String,
    state: String
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  images: [{
    url: String,
    public_id: String,
    caption: String
  }],
  status: {
    type: String,
    enum: ['draft', 'pending', 'approved', 'rejected', 'active', 'completed'],
    default: 'pending'
  },
  targetParticipants: Number,
  currentParticipants: {
    type: Number,
    default: 0
  },
  impactMetrics: {
    plasticCollected: { type: Number, default: 0 },
    peopleReached: { type: Number, default: 0 },
    treesPlanted: { type: Number, default: 0 }
  },
  requirements: [String],
  resources: [{
    name: String,
    quantity: Number
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Create 2dsphere index for geospatial queries
campaignSchema.index({ location: '2dsphere' });

// Update timestamp on save
campaignSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Campaign', campaignSchema);