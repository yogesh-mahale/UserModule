
// const userByToken    = require('../VerifyToken');
const UserRepository = require('../modules/User/repositories//UserRepository');

const userRepository = new UserRepository();

const {
    ErrorResponse,
    SuccessResponse,
  } = require("../helpers/ResponseHelper");


/**
 * Given the request object, get the Auth Bearer Token
 *
 * @param request
 * @return {boolean|token}
 */
let fetchToken = function (request) {
    // Get the auth header
    let authHeader = request.get("authorization");
    var token = false;

    // Token if present, will be found in the Authorization header as "Authorization: Bearer <token>"
    if (authHeader && authHeader.indexOf('Bearer') !== -1) {
        token = authHeader.split(" ")[1];
    }

    return token;
};

let authenticateUser = async (request, response, next) => {

    // Get the token from the request.
    try {
        var token = fetchToken(request);

        if (!token) {
            // Inform the client that we expect Bearer auth headers and send away with a 401;
            response.set("WWW-Authenticate", "Bearer realm=\"SURVEY\"");

            const errorResponse = new ErrorResponse("ACCESS_TOKEN_MISSING", "TOKEN_MISSING", 400);
            return response
            .status(401)
            .send(errorResponse.getErrorBody());
        }

        const query = {
            token: token,
            includeRole: true,
        };

        let user = await userRepository.get(query);

        // Todo: Validate token is expired or not, user is active or not etc.
        // if (user) {
        //     var verifyToken = userByToken([user], token);
        // } else {
        //     var verifyToken = userByToken([], token);
        // }
        

        // if (!verifyToken.auth) {
        //     response.status(403).send(new ResponseObject(403, myLocalize.translate(verifyToken.message)));
        //     return;
        // }

        if (!user) {
            throw new Error('Expired user auth token. Please change the token');
        }

        request.currentUser = {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            isActive: user.isActive,
            roleId: user.roleId,
            businessId: user.businessId,
            Role: user.Role
        };
        console.log('--> currentUser | ', request.currentUser);
        next();
    } catch (exception) {
        console.log("Error Authenticating User: " + exception);
        response.status(401).json({
            success: false,
            message: "User token is expired. Please change token"
        });
        next(exception);
    }
};

const getRoleCodeById = async (roleId) => {
  const roleCode = "BUSINESS_ADMIN"; // todo: fetch from db

  return roleCode;
};

module.exports = authenticateUser;
