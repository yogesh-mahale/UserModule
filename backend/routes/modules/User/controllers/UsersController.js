const UsersService = require("../services/UsersService");
const {
  ErrorResponse,
  SuccessResponse,
} = require("../../../helpers/ResponseHelper");
const { validationResult } = require("express-validator");

exports.getUsers = async (request, response, next) => {
  try {
    
    let query = request.query;
    
    const result = await UsersService.getUsers(request.query);

    console.log("--> | result ", result);

    const successResponse = new SuccessResponse(
      "Records found",
      200,
      result
    );

    return response.status(successResponse.statusCode).send(successResponse);
  } catch (error) {
    if (error.statusCode) {
      return response.status(error.statusCode).send(error.getErrorBody());
    }
    const errorResponse = new ErrorResponse(error.message, error.message, 400);
    return response
      .status(errorResponse.statusCode)
      .send(errorResponse.getErrorBody());
  }
};

exports.createUser = async (request, response, next) => {
  try {
    const params = request.body;

    // 1. validation of body params
    const error = validationResult(request);
    if (!error.isEmpty()) {
      const errorResponse = new ErrorResponse(
        "User validation Error",
        "Validation Error",
        400,
        error.errors
      );
      response.status(errorResponse.statusCode).send(errorResponse);
      return;
    }

    const result = await UsersService.createUser(params);

    const successResponse = new SuccessResponse(
      "User created successfully",
      200,
      result
    );
    return response.status(successResponse.statusCode).send(successResponse);
  } catch (error) {
    if (error.statusCode) {
      return response.status(error.statusCode).send(error.getErrorBody());
    }
    const errorResponse = new ErrorResponse(error.message, error.message, 400);
    return response
      .status(errorResponse.statusCode)
      .send(errorResponse.getErrorBody());
  }
};

exports.getUser = async (request, response, next) => {
  try {
    const email = request.params.email;

    const query = request.query;
    const result = await UsersService.getUser(email, query);

    const successResponse = new SuccessResponse(
      "Record found",
      200,
      result
    );
    return response.status(successResponse.statusCode).send(successResponse);
  } catch (error) {
    if (error.statusCode) {
      return response.status(error.statusCode).send(error.getErrorBody());
    }
    const errorResponse = new ErrorResponse(error.message, error.message, 400);
    return response
      .status(errorResponse.statusCode)
      .send(errorResponse.getErrorBody());
  }
};

exports.updateUser = async (request, response, next) => {
  try {
    const email = request.params.email;

    const query = request.query;
    const user = await UsersService.getUser(email, query);

    if (!user) {
      return response.status(404).json({
        success: false,
        message: `User with email ${email} is not found`,
      });
    }

    const params = request.body;
    const userId = user._id;

    const result = await UsersService.updateUser(
      userId,
      params
    );

    const successResponse = new SuccessResponse(
      "User updated successfully",
      200,
      result
    );
    return response.status(successResponse.statusCode).send(successResponse);
  } catch (error) {
    if (error.statusCode) {
      return response.status(error.statusCode).send(error.getErrorBody());
    }
    const errorResponse = new ErrorResponse(error.message, error.message, 400);
    return response
      .status(errorResponse.statusCode)
      .send(errorResponse.getErrorBody());
  }
};

exports.deleteUser = async (request, response, next) => {
  try {
    const email = request.params.email;
    
    const query = request.query;
    const user = await UsersService.getUser(email, query);

    if (!user) {
      return response.status(404).json({
        success: false,
        message: `User with id ${email} is not found`,
      });
    }

    // Delete
    const deleteQuery = request.query;
    const result = await UsersService.deleteUser(
      user._id,
      deleteQuery
    );

    const successResponse = new SuccessResponse(
      "User deleted successfully",
      200,
      result
    );
    return response.status(successResponse.statusCode).send(successResponse);
  } catch (error) {
    if (error.statusCode) {
      return response.status(error.statusCode).send(error.getErrorBody());
    }
    const errorResponse = new ErrorResponse(error.message, error.message, 400);
    return response
      .status(errorResponse.statusCode)
      .send(errorResponse.getErrorBody());
  }
};
