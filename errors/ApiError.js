class ApiError extends Error {
  constructor(message, statusCode, type) {
    super(message);
    this.message = message;
    this.statusCode = statusCode;
    this.type = type;
  }
}

module.exports = ApiError