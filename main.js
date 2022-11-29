import {mockFetchHelper}  from './mock_api.js';
import {data} from './albums.js';

const fecthAlbums = () => {
    mockFetchHelper(true, data).then((response) => {
        console.log("hi");
        console.log(response);
    });
};

window.onload = () => {
    console.log(mockFetchHelper(true, data));
    fecthAlbums();
}