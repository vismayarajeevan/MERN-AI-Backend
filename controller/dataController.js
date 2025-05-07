// controllers/dataController.js
const { startSimulator, stopSimulator } = require('../simulator/sensorSimulator');
const DataPoint = require('../model/dataPoint');

let ioRef;

const setupSocketIO = (io) => {
  ioRef = io;
};

const startSimulation = (req, res) => {
  startSimulator(ioRef);
  res.json({ message: 'Simulation started' });
};

const stopSimulation = (req, res) => {
  stopSimulator();
  res.json({ message: 'Simulation stopped' });
};

const getHistory = async (req, res) => {
  const history = await DataPoint.find().sort({ timestamp: -1 }).limit(100);
  res.json(history.reverse());
};

module.exports = { setupSocketIO, startSimulation, stopSimulation, getHistory };
