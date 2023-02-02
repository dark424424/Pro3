var Application = require("../model/applications")
var Job = require("../model/jobs")
var User = require("../model/users")
var Company = require('../model/companies')
var Role = require('../model/roles')
const jobDictionary = require("../../config/dictionary/job")
// var ElasticClient = require("../../infrastructure/elasticSearch")


const SearchService = {
    searchCompany: async (keyword, pageNumber, limit) => {
        if (!limit) {
            limit = 30;
        }

        let query = {};
        if (keyword) {
            query.$text = {}
            query.$text.$search = keyword;
        }
        // let newDate = new Date()
        // newDate.setDate(newDate.getDate() + 3);
        // let checkDate = { "info.outdate": { $gt: newDate }}
        // let checkStatus = {'status.value': 0}
        let newQuery = { ...query }
        // console.log(newQuery)
        let result;
        if (keyword) {
            result = await Company.find(newQuery).select({ "info.name": 1, "info.logo": 1, "info.workingArea.name": 1 }).sort({ score: { $meta: "textScore" } }).limit(limit).skip(limit * pageNumber)
        } else {
            result = await Company.find(newQuery).select({ "info.name": 1, "info.logo": 1, "info.workingArea.name": 1 }).limit(limit).skip(limit * pageNumber)
        }

        const count = await Company.find(newQuery).count()
        //TO DO: làm thêm filter skip limit offset
        if (result) {
            return { total: count, data: result };
        } else {
            throw new Error(" error")
        }
    },
    searchJob: async (body, pageNumber, limit) => {
        if (!limit) {
            limit = 30;
        }
        let query = {};
        if (body.text) {
            query.$text = {}
            query.$text.$search = body.text;

        }
        let newDate = new Date()
        newDate.setDate(newDate.getDate());
        let checkDate = { "info.outdate": { $gt: newDate } }
        let checkStatus = { 'status.value': 0 }
        let newQuery = { ...query, ...checkDate, ...body.filter, ...checkStatus }
        // console.log(newQuery)
        let total = 0;
        let result;
        if (body.text) {
            result = await Job.find(newQuery).sort({ score: { $meta: "textScore" } }).limit(limit).skip(limit * pageNumber)
                // .select({ status: 0, "info.name": 1, 'info.type': 1, "info.workingAddress.province": 1, "info.salaryRate": 1, "info.keyword": 1, "info.outdate": 1, "info.createdAt": 1, "info.updatedAt": 1 })
                .select({
                    companyId: 1,
                    // status: 0,
                    info: {
                        name: 1,
                        type: {
                            name: 1,
                        },
                        workingAddress: {
                            province: 1,
                        },
                        salaryRate: 1,
                        keyword: 1,
                        outdate: 1,

                    },
                    createdAt: 1,
                    updatedAt: 1,
                })

                .populate({ path: "companyId", select: { "info.name": 1, "info.logo": 1 } });
        } else {
            result = await Job.find(newQuery).sort({ 'info.outdate': 1 }).limit(limit).skip(limit * pageNumber)
                // .select({ status: 0, "info.name" : 1, 'info.type' : 1 , "info.workingAddress.province": 1, "info.salaryRate": 1, "info.keyword": 1, "info.outdate": 1 ,"info.createdAt": 1, "info.updatedAt":1})
                .select({
                    companyId: 1,
                    // status: 0,
                    info: {
                        name: 1,
                        type: {
                            name: 1,
                        },
                        workingAddress: {
                            province: 1,
                        },
                        salaryRate: 1,
                        keyword: 1,
                        outdate: 1,

                    },
                    createdAt: 1,
                    updatedAt: 1,
                })
                .populate({ path: "companyId", select: { "info.name": 1, "info.logo": 1 } });
        }
        //TO DO: làm thêm filter skip limit offset
        total = await Job.count(newQuery)
        if (result) {
            return { total: total, data: result };
        } else {
            throw new Error(" error")
        }
    },
 

}


module.exports = SearchService;