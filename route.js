const express = require('express');
const app = express();

// app.use((req,res,next) => {
//     console.log("???????????????????????",req.url);
// })

/**
 *   INJECTION OF MODULES
 *
 */

const recordService = require('./api/v1/record');
app.use('/record', recordService);

module.exports = app;