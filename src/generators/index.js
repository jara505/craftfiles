const { generateBiome } = require('./biome');
const { generatePrettier } = require('./prettier');
const { generateEnv } = require('./env');
const { generateAgents } = require('./agents');

module.exports = {
  generateBiome,
  generatePrettier,
  generateEnv,
  generateAgents
};