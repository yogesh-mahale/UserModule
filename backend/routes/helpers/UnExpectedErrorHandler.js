/**
 * Un Expected Error Handler
 * @param {Object} error Error Object with Message and Call Stack
 * @returns {null}
 */
exports.unExpectedErrorHandler = async (error) => {
  
  console.log("--> | unExpectedErrorHandler Error ", error.stack);
  return null;
}
