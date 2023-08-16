// Generic Responses

class ResponseHelper {
  /**
     * @param success  bool value
     * @param message  response message text
     * @param data  response data
     * @param statusCode response status
     */
  static getResponse (
    success = false,
    message = 'Error',
    data = {},
    statusCode = 400
  ) {
    const response = {
      success,
      status: statusCode,
      message,
      data
    }
    return response
  }
}

module.exports = ResponseHelper
