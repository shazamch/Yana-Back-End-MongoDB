// utils/ApiResponse.js

class ApiResponse {
    constructor(statusCode, data = null, message = null) {
      this.statusCode = statusCode;
      this.data = data;
      this.message = message;
    }
  
    toJSON() {
      return {
        statusCode: this.statusCode,
        success: this.statusCode >= 200 && this.statusCode < 300,
        data: this.data,
        message: this.message,
      };
    }
  }
  
  module.exports = ApiResponse;
  