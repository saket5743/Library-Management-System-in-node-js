const { CODE_400 } = require('../utils/translations');

class ApiResponse {

  constructor(statusCode, data, message, type) {
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
    this.type = type;

    statusCode < CODE_400;
  }
}

module.exports = ApiResponse;

