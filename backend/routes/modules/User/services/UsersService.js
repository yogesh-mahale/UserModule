

const UsersModel = require("../models/UsersModel");
const BaseNoSQLRepository = require("../../Repository/BaseNoSQLRepository");

const usersRepository = new BaseNoSQLRepository(UsersModel);

const getUsers = async (query) => {   
    const queryData = {};
    return usersRepository.getAll(queryData);
}

const getUser = async (email, query) => {   
    const queryData = {
        email: email
    };
    return usersRepository.get(queryData);
}

const createUser = async (params) => {   
    const userInput = {
      firstName: params.firstName,
      lastName: params.lastName,
      email: params.email,
      phone: params.phone,
      profileImage: params.profileImage,
    };

    return usersRepository.save(userInput);
}

const updateUser = async (userId, params) => {   
    const queryData = {};

    const updateResponse = await usersRepository.update(userId, {
        $set: params,
    });
    return updateResponse;
}

const deleteUser = async (id, query) => {   
    const queryData = {
        email: query.email
    };
    const result = await usersRepository.findByIdAndDelete(id, queryData);
    return result;
}



module.exports = {
    getUsers: getUsers,
    createUser: createUser,
    getUser: getUser,
    updateUser: updateUser,
    deleteUser: deleteUser
};