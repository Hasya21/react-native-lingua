const { getDefaultConfig } = require("expo/metro-config");
const { withNativewind } = require("nativewind/metro");
const path = require("path");

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

const clerkNativeModulePath = path.join(
  __dirname,
  "node_modules",
  "@clerk",
  "expo",
  "dist",
  "specs",
  "NativeClerkModule.web.js",
);
const defaultResolveRequest = config.resolver.resolveRequest;

config.resolver.resolveRequest = (context, moduleName, platform) => {
  if (
    platform === "web" &&
    moduleName === "../specs/NativeClerkModule.js" &&
    context.originModulePath.includes(
      `${path.sep}@clerk${path.sep}expo${path.sep}dist${path.sep}`,
    )
  ) {
    return {
      filePath: clerkNativeModulePath,
      type: "sourceFile",
    };
  }

  if (defaultResolveRequest) {
    return defaultResolveRequest(context, moduleName, platform);
  }

  return context.resolveRequest(context, moduleName, platform);
};

module.exports = withNativewind(config);
