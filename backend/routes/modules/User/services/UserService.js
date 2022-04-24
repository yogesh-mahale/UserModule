const UserRepository = require('../repositories/UserRepository');
const BusinessRepository = require('../repositories/BusinessRepository');
const { Op } = require("sequelize");
var crypto = require("crypto");



const userRepository = new UserRepository();
const businessRepository = new BusinessRepository();


const registration = async (params) => {
    // 1. Create business 
    const businessData = {
        name: params.businessName || null,
        domain: params.businessDoman || null,
        phone: params.businessPhone || null,
        isActive: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
        createdBy: null,
        updatedBy: null
    };
    const business = await businessRepository.save(businessData);


    // 2. Create user
    const userData = {
        firstName: params.firstName || null,
        lastName: params.lastName || null,
        email: params.email || null,
        password: params.password, // todo: encrypt the password
        mobileNo: params.mobileNo || null,
        address: params.address || null,
        country: params.country || null,
        roleId: 2, // Default role is Business admin.
        isActive: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
        createdBy: null,
        updatedBy: null,
        businessId: business.id,
    };
    const user = await userRepository.save(userData);

    // todo: update business, set createdby and updatedBy
    return user;
};

const login =  async (params) => {
    const email = params.email;
    const password = params.password; // todo: decrypt password

    // 1. check if user exists
    const query = {
        email: email,
        password: password,
        isActive: 1,
    };
    const user = await userRepository.get(query);

    if (!user) {
      throw new Error(`Invalid email or password`);
    }

    // 2. Set lastLogin at
    // 3. Generate token and set token in user table
    const nextDate = new Date();
    const days = 1;
    nextDate.setDate(nextDate.getDate() + days);

    const userData = {
        lastLoginAt: new Date(),
        token: await generateToken(),
        tokenValidUpto: nextDate,
    };
    const userQuery = {
        id: user.id
    };
    await userRepository.update(userData, userQuery);

    // 4. Fetch updated user and return it
    const loggedInUser = await userRepository.get(query);

    return loggedInUser;
};

const generateToken = async () => {
    const token = crypto.randomBytes(20).toString('hex');
    return token;
};

module.exports = {
   registration: registration,
   login: login
}