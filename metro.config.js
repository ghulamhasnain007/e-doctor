const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Add this to ensure proper handling of Touch events 
config.resolver.sourceExts = process.env.RN_SRC_EXT
  ? [...process.env.RN_SRC_EXT.split(',').concat(config.resolver.sourceExts), 'mjs']
  : [...config.resolver.sourceExts, 'mjs'];

// Ensure that all node_modules dependencies are included in the bundle
config.resolver.extraNodeModules = {
  ...config.resolver.extraNodeModules,
};

// Metro will handle JS differently for ESM modules
config.transformer.allowOptionalDependencies = true;

// Add Reanimated and Gesture Handler to the list of transformIgnorePatterns
config.resolver.resolverMainFields = ['react-native', 'browser', 'main'];

module.exports = config;
