const RoleModel = require('../../Role/models/RoleModel');
const UserModel = require('../models/UserModel');

class UserRepository {
    async save(data) {
        return (await UserModel.create(data))
    }

    async createBulk (data) {
        return (await UserModel.bulkCreate(data))
    }  
    
    async update (data, query) {
        return (await UserModel.update(data, { where : query }))
    }

    async getAllPagination(requestQuery, limit, offset){
        //2. Prepare Criteria
        const query = {
            offset: 0,
            limit: 10,
            order: [],
            where: requestQuery,
            include: [],
            nest: true,
            separate: true,
            subQuery: false
        }

        return (await UserModel.findAndCountAll(query))
    }

    async get(requestQuery) {
        let query = {
            where: requestQuery,
            include: [],
            nest: true, 
            separate: true,
            subQuery: false,
            raw: true,
        }

        if (requestQuery.includeRole) {
            query.include.push({
                model: RoleModel,
                as: "Role",
                attributes: ['id','code', 'name']
            });
        };
        delete requestQuery.includeRole;
        return (await UserModel.findOne(query))
    }

    async getAll(requestQuery){
        let query = {
            where: requestQuery,
            include: [],
            raw: true,
            nest: true,
            separate: true,
            subQuery: false
        }
        
        return (await UserModel.findAll(query))
    }

    async delete(query){
        return (await UserModel.destroy( { where : query } ));
    }
}

module.exports = UserRepository;