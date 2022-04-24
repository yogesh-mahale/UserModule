const BusinessModel = require('../models/BusinessModel');

class BusinessRepository {
    async save(data) {
        return (await BusinessModel.create(data))
    }

    async createBulk (data) {
        return (await BusinessModel.bulkCreate(data))
    }  
    
    async update (data, query) {
        return (await BusinessModel.update(data, { where : query }))
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

        return (await BusinessModel.findAndCountAll(query))
    }

    async get(requestQuery) {
        let query = {
            where: requestQuery,
            include: [],
            nest: true, 
            separate: true,
            subQuery: false
        }

        return (await BusinessModel.findOne(query))
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
        
        return (await BusinessModel.findAll(query))
    }

    async delete(query){
        return (await BusinessModel.destroy( { where : query } ));
    }
}

module.exports = BusinessRepository;