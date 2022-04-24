
const _ = require("lodash");

class BaseNoSQLRepository {
  constructor(model) {
    this.model = model;
  }

  async save(payload) {
    return (await this.model.create(payload)).toObject();
  }

  async saveAll(payload) {
    return await this.model.insertMany(payload);
  }

  async update(_id, payload) {
    return new Promise((resolve, reject) => {
      this.model.findOne({ _id: _id }, function (err, doc) {
        if (err) {
          reject(err);
        }

        if (payload.$set) {
          _.set(doc, payload.$set.path, payload.$set.value);
        } else {
          Object.keys(payload).forEach((ele) => {
            doc[ele] = payload[ele];
          });
        }
        doc.save(function (_err) {
          if (_err) reject(_err);
          resolve(doc);
        });
      });
    });
  }

  async findById(id) {
    return this.model.findById(id).lean();
  }

  async pagination(filter, paginationOptions) {
    return this.model.paginate(filter, paginationOptions);
  }

  async get(filter) {
    if (filter.select) {
      return this.model.findOne(filter).select("-_id -__v").lean();
    }
    return this.model.findOne(filter).lean();
  }

  async getAll(requestQuery) {
    if (requestQuery.select) {
      return this.model.find(requestQuery).select("-_id -__v").lean();
    }
    return this.model.find(requestQuery).lean();
  }

  async findByIdAndDelete(objectId, options) {
    return this.model.findByIdAndDelete(objectId, options);
  }

  async count(requestQuery) {
    return this.model.count(requestQuery).lean();
  }

  async aggregate(requestQuery) {
    return this.model.aggregate(requestQuery);
  }
}

module.exports = BaseNoSQLRepository;
