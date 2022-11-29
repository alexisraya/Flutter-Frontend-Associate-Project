import {mockFetchHelper}  from './mock_api.js';
import {data} from './albums.js'; //was change to js because browsers were not allowing me to host locally without downloading packages

// elements
const albumTable = document.querySelector(".js-table"); //table element

const fecthAlbums = () => {
    //wait until the API is fetched to complete the rest of the tasks
    mockFetchHelper(true, data).then((response) => {
        // sort albums from last played in descending order
        let albumsList = response.albums;
        albumsList = sortAlbums(albumsList);
        // fill in the table
        tableFill(albumsList);

        // display table when done
        albumTable.style.display = "block";
    });
};

// sorting function
const sortAlbums = (dataList) => {
    dataList.sort(function(a,b){
        return b.last_listened - a.last_listened;
    })
    return (dataList);
};

// fill in table with proper values
const tableFill = (dataList) =>{
    for (let i = 0; i < dataList.length; i++){
        let row = albumTable.insertRow(i+1);

        let bandCell = row.insertCell(0);
        let albumCell = row.insertCell(1);
        let genreCell = row.insertCell(2);
        let playedCell = row.insertCell(3);
        let dateCell = row.insertCell(4);


        // Add some text to the new cells:
        bandCell.innerHTML = fillCell(dataList[i].band_name);
        albumCell.innerHTML = fillCell(dataList[i].album_title);
        genreCell.innerHTML = fillCell(dataList[i].genres);
        playedCell.innerHTML = formatLastPlayed(dataList[i].last_listened);
        dateCell.innerHTML = formatReleaseDate(dataList[i].release_date);
    }
}

// check if value is null
const fillCell = (albumItem) => {
    if (albumItem == null){
        return ("--");
    }
    else{
        return (albumItem);
    }
};

// formate last played data into a date
const formatLastPlayed = (albumPlayedDate) => {
    if (albumPlayedDate == null){
        return ("--");
    }
    else{
        let date = new Date(albumPlayedDate);
        let month = date.getMonth() + 1;
        month = month < 10 ? "0" + month : month;
        let day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
        let hour = date.getHours();
        let meridian = "am";
        if (hour === 0) {
            hour = 12;
        } else if (hour > 12) {
            hour -= 12;
            meridian = "pm";
        }
        return (month + "/" + day + "/" + date.getFullYear() + " " + hour + ":" + date.getMinutes() + " " + meridian); 
    }
    
}

const formatReleaseDate = (albumReleaseDate) => {
    let date = new Date(albumReleaseDate);
    let month = date.getMonth() + 1;
    month = month < 10 ? "0" + month : month;
    let day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
    return (month + "/" + day + "/" + date.getFullYear());
};

window.onload = () => {
    fecthAlbums();
}