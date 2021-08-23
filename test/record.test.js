const app = require('../app');
const superTest = require('supertest');
const request = superTest(app);
const mongoose = require('mongoose');




describe("Test the record endpoint [POST]", () => {

    it('Requesting data by Post', async () => {

        
        const requetBody = {
            "startDate": "2016-01-26",
            "endDate": "2018-02-02",
            "minCount": 2800,
            "maxCount": 5000
        };
        
        const mock = {
            "code": 0,
            "msg": "Success",
            "records": [
                {
                    "key": "ApplxqoY",
                    "createdAt": "2016-01-26T04:24:43.726Z",
                    "totalCount": 3112
                },
                {
                    "key": "WKvuepJq",
                    "createdAt": "2016-01-26T11:46:08.237Z",
                    "totalCount": 4889
                },
                {
                    "key": "pQsVDWII",
                    "createdAt": "2016-01-26T01:17:20.136Z",
                    "totalCount": 4423
                },
                {
                    "key": "sqEdhKEp",
                    "createdAt": "2016-01-26T10:01:12.569Z",
                    "totalCount": 3373
                },
                {
                    "key": "pQsVDWII",
                    "createdAt": "2016-01-26T01:17:20.136Z",
                    "totalCount": 4423
                }
            ]
        }
        try {
            request.post("/assignment/api/v1.0/record/getAll")
                .send(requetBody)
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200)
                .expect(function(err, res) {
                    if (err) return done(err);
                    let expected_data = res.body;
                    const recordsTester = (mock, expected_data) => {
                        if (mock.length !== expected_data.length) return false;
                        var isEqual = true;
                        _.forEach(mock, (obj1, obj1Index) => {
                            var obj1Exist = false;
                            _.forEach(expected_data, (obj2, obj2Index) => {
                                if (_.isEqual(obj1, obj2)) {
                                    obj1Exist = true;
                                    return;
                                }
                            });
                            if (!obj1Exist) {
                                isEqual = false;
                                return;
                            }
                        });
                        return isEqual;
                    }
                    done();    
                });
        } catch (error) {
            console.log(error);
        }
     
    });
})