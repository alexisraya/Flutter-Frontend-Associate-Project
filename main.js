import {mockFetchHelper} from './mock_api.js';
import data from './albums.json' assert {type: 'json'};

window.onload() = async function (){
    // console.log(mockFetchHelper(returnValue));
    const response = await fetch('url(./albums.json)', {
        method: 'POST',
        body: data, // string or object
        headers: {
        'Content-Type': 'application/json'
        }
    });
    const myJson = await response.json(); //extract JSON from the http response
    // do something with myJson
}