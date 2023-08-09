const appMessages = require("../config/message");
/**
 * MessageHelper
 * @description Server-side messages for incoming requests.
 * @date 8th Apri 2021
 */

class MessageHelper {
  /**
   * @param message_slug  string value
   * @param language  string value
   * @description Method to get a response message
   */
  static getMessage(message_slug = "general_error", language = "english") {
    if (language.toLowerCase() == "english") {
      return appMessages.message.english[message_slug];
    }
    return appMessages.message.english.language_error;
  }

  static checkLanguage(req) {
    const headers = req.headers;
    let language = "english";
    if (
      headers["x-language"] !== undefined &&
      headers["x-language"] !== null &&
      headers["x-language"] !== ""
    ) {
      language = headers["x-language"];
    }
    return language;
  }

}

module.exports = MessageHelper;
