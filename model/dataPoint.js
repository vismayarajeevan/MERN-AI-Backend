const mongoose = require('mongoose');

const dataPointSchema = new mongoose.Schema({
  value: Number,
  timestamp: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('DataPoint', dataPointSchema);
