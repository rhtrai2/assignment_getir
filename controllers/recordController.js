const mongoose = require('mongoose');
const Record = require('../models/records');
const moment = require('moment');
const { validationResult } = require('express-validator');



const get = async (req, res) => {

    const { startDate, endDate, minCount, maxCount } = req.body;
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ 
            "code" : -1,
            "msg": errors.array()});
    }

    try {
        let records = await Record.aggregate([
            {
                "$match": {
                    "createdAt": {
                        "$gte": moment(startDate).startOf('day').toDate(), 
                        "$lte": moment(startDate).endOf('day').toDate()
                    }
                }
            },
            { "$unwind": "$counts" },
            {
                "$group": {
                    "_id": "$_id",
                    "count": { "$sum": "$counts" },
                    "key": { "$first": "$key" },
                    "createdAt": { "$first": "$createdAt" },
                }
            },
            {
                "$match": {
                    "count": {
                        "$gte": minCount, 
                        "$lt": maxCount  
                    }
                }
            },
            {
                "$project": {
                    "totalCount": "$count",
                    "key": 1,
                    "createdAt": 1,
                    "_id": 0
                }
            }
        ]);

        if (records.length != 0) {
            res.status(200).json({
                "code": 0,
                "msg": "Success",
                "records": records
            })
        }
        else {
            res.status(404).json({
                "code": -1,
                "msg": "The requested data was not found!"
            })
        }
    } catch(e) {
        if (err) {
            res.status(500).json({
                    "code": -1,
                    "msg": "Unexptected error!",
            })
        }
    }  
};

module.exports = { get };
