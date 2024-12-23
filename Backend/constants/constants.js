const STATUS_CODES = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
};

const MESSAGES = {
  REVIEW_NOT_FOUND: "Review not found",
  DELETE_SUCCESS: "Review deleted successfully",
  INVALID_ID: "Invalid ID format",
  SERVER_ERROR: "Internal server error",
};

module.exports = { STATUS_CODES, MESSAGES };
