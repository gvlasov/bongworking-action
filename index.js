import axios from 'axios'
import fs from 'fs'
import * as core from "@actions/core";


const apiKey = 'bf6d2db5bcmsh0d9c1d575e65a41p1b99a9jsn1e803154564f'
const dataFilePath = core.getInput('bong_filepath')

let data;
data = JSON.parse(fs.readFileSync(
    process.env.GITHUB_WORKSPACE + '/' + dataFilePath
));
axios.request({
    method: 'GET',
    url: 'https://wft-geo-db.p.rapidapi.com/v1/geo/cities/' + data.name,
    headers: {
        'X-RapidAPI-Key': apiKey,
        'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
    }
})
    .then(result => {
        console.log(result.data)
        core.setOutput('report', result.data)
    })
    .catch(function (error) {
        console.log(error)
        core.setFailed('Bong not working');
    });


