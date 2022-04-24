const UserService = require("../services/UserService");
const {
  ErrorResponse,
  SuccessResponse,
} = require("../../../helpers/ResponseHelper");
const { validationResult } = require("express-validator");


exports.userRegistration = async (request, response, next) => {
  try {
    const params = request.body;

    // 1. validation of body params
    const error = validationResult(request);
    if (!error.isEmpty()) {
      const errorResponse = new ErrorResponse(
        "User Validation Error",
        "Validation Error",
        400,
        error.errors
      );
      response.status(errorResponse.statusCode).send(errorResponse);
      return;
    }
  
    // 2. User and Business registration
    const result = await UserService.registration(params);

    const successResponse = new SuccessResponse(
      "User registered successfully",
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

exports.userLogin = async (request, response, next) => {
  try {
    const params = request.body;
    // 1. validation of body params
    const error = validationResult(request);
    if (!error.isEmpty()) {
      const errorResponse = new ErrorResponse(
        "User Validation Error",
        "Validation Error",
        400,
        error.errors
      );
      response.status(errorResponse.statusCode).send(errorResponse);
      return;
    }
  
    // 2. Check user and password
    const user = await UserService.login(params);

    const result = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      token: user.token,
      roleCode: await getRoleCodeById(user.roleId),
    };

    const successResponse = new SuccessResponse(
      "User login successfully",
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

const getRoleCodeById = async (roleId) => {
  const roleCode = 'BUSINESS_ADMIN'; // todo: fetch from db
  return roleCode;
};