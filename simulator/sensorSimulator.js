
const DataPoint = require('../model/dataPoint');

let interval;
let isRunning = false;

const generateRandomValue = () => {
  return Math.floor(Math.random() * 100); // Random value between 0 and 99
};

const saveDataPoint = async (value) => {
  try {
    const newData = new DataPoint({ value });
    await newData.save();
    return newData;
  } catch (err) {
    console.error('Error saving data point:', err);
    return null;
  }
};

const startSimulator = (io) => {
  if (isRunning) return;
  isRunning = true;

  interval = setInterval(async () => {
    const value = generateRandomValue();
    const newData = await saveDataPoint(value);
    if (newData) {
      io.emit('new-data', newData); // Emit the new data point to clients
    }
  }, 2000);
};

const stopSimulator = () => {
  if (interval) clearInterval(interval);
  isRunning = false;
};

module.exports = { startSimulator, stopSimulator };
