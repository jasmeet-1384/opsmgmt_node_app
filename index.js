import 'dotenv/config';

import express from "express";
import router from './api.js';
import { success } from './utils/reply.js';



const PORT = process.env.PORT || 3000 ;

const app = express();

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', "*");
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader('Access-Control-Allow-Headers', "*");
    res.setHeader('Access-Control-Allow-Headers-Authorization', "*");
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
})



app.use(express.json());



app.get('/', (req,res) => {
    return res.json(success('Working', {hello : 'Opsmgmt'}))
});

app.use(router);

app.listen(PORT , () => console.log(`App is listening on http://localhost:${PORT}`));