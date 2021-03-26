const searchPlayerAPI = `https://www.balldontlie.io/api/v1/players/?search=`;
const showStatsAPI = `https://www.balldontlie.io/api/v1/season_averages?season=2020&player_ids[]=`;
const displayPlayersAPI = `https://www.balldontlie.io/api/v1/players?per_page=25&page=`;
const searchTeamsAPI = `https://www.balldontlie.io/api/v1/teams`;
// let d=[];
// let a;

// async function getNBAData(API,query) {   
//     await fetch(API + query)
//     .then(response => response.json())
//     .then((jsonData) => {
//         let d = (jsonData.data[1]);
//         console.log('d: ', d); 
//         return d;
//         });      
// };

// getNBAData(searchPlayerAPI,"ike");
// console.log(d);


function searchNBAPlayer(query) {
    const API_Players = `https://www.balldontlie.io/api/v1/players/?search=${query}`;
    fetch(API_Players)
    .then(response => response.json())
    .then((jsonData) => {
        const results = jsonData.data;
        console.log(jsonData)
        if(results.length > 0) {
            var temp = "";
    
            results.forEach(result => {
                temp += `<tr onclick='test2(${result.id})'>`;
                temp += "<td>"+result.id+"</td>";
                temp += "<td>"+result.first_name+"</td>";
                temp += "<td>"+result.last_name+"</td>";                
                temp += "<td>"+result.team.full_name+"</td>";
                if(result.position === "") {
                    var position = "/";
                    temp += "<td>"+position+"</td>"; 
                } else {
                    temp += "<td>"+result.position+"</td>";
                }
                if(result.height_feet === null || result.height_inches === null) {
                    var height_null = "/";
                    temp += "<td>"+height_null+"</td>"; 
                } else {
                    temp += "<td>"+result.height_feet+"'"+result.height_inches+"''"+"</td>";
                }
                if(result.weight_pounds === null) {
                    var weight_null = "/";
                    temp += "<td>"+weight_null+"</td></tr>"; 
                } else {
                    temp += "<td>"+result.weight_pounds+"lb"+"</td></tr>";
                }            
            })
            document.getElementById("results-table").innerHTML = temp;
        }
    });
};


let searchTimeoutToken = 0

window.onload = () => {
    const searchFieldElement = document.getElementById("search-field");
    searchFieldElement.onkeyup = (event) => {        
        clearTimeout(searchTimeoutToken);
        // if(searchFieldElement.value.trim().length === 0){
        //     return;
        // }
        searchTimeoutToken = setTimeout(() => {
            console.log(searchFieldElement.value);
            if(searchFieldElement.value != "") {
                searchNBAPlayer(searchFieldElement.value);                                 
                searchTimeoutToken = setTimeout(() => {
                    clearFields();
                },250);                             
            } else {
                displayPlayers(1);
            }            
        },250);
    };
}

function clearPaginaiton(){
    var wrapper2 = document.getElementById("pagination-wrapper");
    wrapper2.innerHTML = `<button value=${1} class="page btn btn-sm btn-link" id="${1}">${1}</button>`
}

function clearFields() {
    document.querySelector('#search-field').value = '';
};

let page = 1;
// var window = 2;

document.querySelector('#pagination-wrapper').addEventListener('click', (e) => {
        page = e.target.id; 
        console.log(page)
        displayPlayers(page);
});



var modalTeams = document.getElementById("modal-teams");
var spanTeams = document.getElementsByClassName("close-teams")[0];
let modalStats = document.getElementById("modal-stats");
// When the user clicks on the button, open the modal
const searchAllTeamsEl = document.getElementById("link-search-teams");
searchAllTeamsEl.onclick = (event) => {
    modalTeams.style.display = "block";
    console.log(modalTeams)
    // modal2.modal('show')
    // $("#modal").modal("show");
    searchTeams();
}
// When the user clicks on <span> (x), close the modal
spanTeams.onclick = function() {
  modalTeams.style.display = "none";
}
// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    console.log(event.target)
    if (event.target == modalTeams) {        
        modalTeams.style.display = "none";
    } else if (event.target === modalStats) {
        modalStats.style.display = "none";
    }
} 
// let x = 0;
// let y = 0;
// console.log(y)
// function printMousePos(event) {
//     x = event.clientX;
//     y = event.clientY;
//     console.log(x)
//     console.log(y)
//   }
  

// document.addEventListener("click", printMousePos);

function test2(x) {
    modalStats = document.getElementById("modal-stats");
    dialogStats = document.getElementsByClassName("modal-content"); 
    modalStats.style.position = "absoulute";  
    // modalStats.style.top = `${y}px`; 
    // modalStats.style.left = `${y}yx`; 
    // modalStats.style.top = "190px";
    // modalStats.style.right = "190px";
    // modalStats.style.left = "250px"; 
    modalStats.style.display = "block";
    stats(x);
    // window.onclick = function(event) {
    //     if (event.target == modalStats) {
    //         console.log(event.target)
    //         modalStats.style.display = "none";
    //     }
    // }
    
    
}


function test(){
    alert("Hello! I am an alert box!!");
}

function searchTeams() {
    const API_Teams = `https://www.balldontlie.io/api/v1/teams`;
    fetch(API_Teams)
    .then(response => response.json())
    .then((jsonData) => {
        const results = jsonData.data;
        // pageButtons(jsonData.meta.total_pages);
        console.log(jsonData)
        
        if(results.length > 0) {
            var temp = "";
    
            results.forEach(result => {
                temp += "<tr>";
                temp += "<td>"+result.id+"</td>";
                temp += "<td>"+result.name+"</td>";
                temp += "<td>"+result.city+"</td>";
                temp += "<td>"+result.division+"</td>";
                temp += "<td>"+result.full_name+"</td></tr>";          
            })
            document.getElementById("teams-table").innerHTML = temp;
        }
    });
};

function pageButtons(pages) {
    // console.log(pages)
    var wrapper = document.getElementById("pagination-wrapper");
    wrapper.innerHTML = "";
    var window = 2;
    var maxLeft = (page - window); 
    var maxRight = (parseInt(page,10) + parseInt(window, 10));
    if (maxLeft < 1){
        maxLeft = 1
        maxRight = (parseInt(window, 10) + 3);
    }
    if (maxRight > pages){
        maxLeft = pages - ((parseInt(window, 10) + 3) - 1);
        maxRight = pages
        if (maxLeft < 1){
            maxLeft = 1;
        }
    }
    // console.log(maxLeft)
    // console.log(maxRight)
    // console.log(page)

    for (page = maxLeft; page <= maxRight; page ++){
        // console.log(page)
        wrapper.innerHTML += `<button value=${page} class="page btn btn-sm btn-link" id="${page}">${page}</button>`
    }
    if (maxLeft > 1) {
        wrapper.innerHTML = `<button value=${1} class="page btn btn-sm btn-link">&#171; First</button>` + wrapper.innerHTML
    }
    
    if (maxRight < pages) {
        wrapper.innerHTML += `<button value=${pages} class="page btn btn-sm btn-link" id="${pages}">Last &#187;</button>`
    }
};
// pageButtons(69);

displayPlayers(1);

function displayPlayers(query) {
    const API_Players = `https://www.balldontlie.io/api/v1/players?per_page=25&page=${query}`;
    fetch(API_Players)
    .then(response => response.json())
    .then((jsonData) => {
        const results = jsonData.data;
        pageButtons(jsonData.meta.total_pages);
        // console.log(jsonData.meta.current_page)
        
        if(results.length > 0) {
            var temp = "";
    
            results.forEach(result => {
                temp += `<tr onclick='test2(${result.id})'>`;
                temp += "<td>"+result.id+"</td>";
                temp += "<td>"+result.first_name+"</td>";
                temp += "<td>"+result.last_name+"</td>";                
                temp += "<td>"+result.team.full_name+"</td>";
                if(result.position === "") {
                    var position = "/";
                    temp += "<td>"+position+"</td>"; 
                } else {
                    temp += "<td>"+result.position+"</td>";
                }
                if(result.height_feet === null || result.height_inches === null) {
                    var height_null = "/";
                    temp += "<td>"+height_null+"</td>"; 
                } else {
                    temp += "<td>"+result.height_feet+"'"+result.height_inches+"''"+"</td>";
                }
                if(result.weight_pounds === null) {
                    var weight_null = "/";
                    temp += "<td>"+weight_null+"</td></tr>"; 
                } else {
                    temp += "<td>"+result.weight_pounds+"lb"+"</td></tr>";
                }            
            })
            document.getElementById("results-table").innerHTML = temp;
        }
    });
};

function stats(query) {
    const API_Players = `https://www.balldontlie.io/api/v1/season_averages?season=2020&player_ids[]=${query}`;
    fetch(API_Players)
    .then(response => response.json())
    .then((jsonData) => {
        const results = jsonData.data;              
        if(results.length > 0) {
            var temp = "";
    
            results.forEach(result => {
                temp += "<tr>";
                temp += "<td>"+result.games_played+"</td>";
                temp += "<td>"+result.pts+"</td>";
                temp += "<td>"+result.reb+"</td>";
                temp += "<td>"+result.ast+"</td>";
                temp += "<td>"+result.blk+"</td>";
                temp += "<td>"+result.stl+"</td>";
                temp += "<td>"+result.turnover+"</td></tr>";        
            })
            document.getElementById("stats-table").innerHTML = temp;
        }
    });
};