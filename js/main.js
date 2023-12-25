
// DOM elements
var bookmarkName = document.getElementById("bookmarkName");
var bookmarkURL = document.getElementById("bookmarkURL");
var bookmarkList = [];
var btnSubmit = document.querySelector('.btn-submit');
var btnClear = document.querySelector('.btn-clear');
var inputSearch = document.getElementById("inputSearch");
var layer = document.querySelector(".layer");
var btnClose = document.querySelector(".btn-close");
var infoModal = document.getElementById("infoModal");

// Check if bookmark data is stored in local storage
if(localStorage.getItem("sites") != null){
bookmarkList = JSON.parse(localStorage.getItem("sites"));
// Display existing bookmark data
showData();
}
// Event listeners for add website and show that
btnSubmit.addEventListener('click',function(){
    addSite()
    showData()
    clearData()
});
// Clear the input fields
btnClear.addEventListener('click', function(){
    clearData()
});
// Search bookmarks based on user input
inputSearch.addEventListener('input', function(){
    search()
})
// Close the error message layer
btnClose.addEventListener('click', function(){
    layer.style.display = "none"
})
// Close the error message layer if clicked outside the content
layer.addEventListener('click', function(eventInfo){
    if(layer == eventInfo.target){
        layer.style.display = "none";
    }
})
// Function to add a new site
function addSite(){
    // Validate site name and URL
    if(validSiteName() == false || validSiteUrl() == false){
        layer.style.display = "block"
    }else{
    // Add the site to the list, update local storage, and refresh the display
        var site = {name: bookmarkName.value , url: bookmarkURL.value};

    bookmarkList.push(site);
    localStorage.setItem('sites', JSON.stringify(bookmarkList));
    showData()
    }
}
// Function to validate the site name
function validSiteName(){
    var regex = /^[a-zA-Z]{3,100}$/;
    return regex.test(bookmarkName.value.trim());
}
// Function to validate the site URL
function validSiteUrl(){
    var regex = /^[a-zA-Z](.)[a-z]{2,}$/;
    return regex.test(bookmarkURL.value);
}
// Function to display bookmark data in the table
function showData(){
    var tableRow = "";

    for(var i = 0 ; i < bookmarkList.length ; i++){
        tableRow +=`<tr>
                    <th>${i+1}</th>
                    <td>${bookmarkList[i].name}</td>
                    <td><button onclick="visitSite(${i})" class="btn btn-visit"><i class="fa-solid fa-eye pe-2"></i> Visit</button></td>
                    <td><button onclick="deleteData(${i})" class="btn btn-delete"><i class="fa-solid fa-trash pe-2"></i> Delete</button></td>
                    </tr>`
    }
    document.getElementById("tableBody").innerHTML = tableRow;
}
// Function to clear input fields
function clearData(){
    bookmarkName.value = "";
    bookmarkURL.value = "";
}
// Function to delete a bookmark
function deleteData(index){
    bookmarkList.splice(index, 1);
    localStorage.setItem('sites', JSON.stringify(bookmarkList));
    showData();
}
// Function to visit a bookmarked site
function visitSite(index){
    window.open(bookmarkList[index].url);
}
// Function to search bookmarks
function search(){
    var term = inputSearch.value
    var tableRow = "";

    for(var i = 0 ; i < bookmarkList.length ; i++){
        if(bookmarkList[i].name.toLowerCase().includes(term.toLowerCase())){
        tableRow +=`<tr>
                    <th>${i+1}</th>
                    <td>${bookmarkList[i].name}</td>
                    <td><button onclick="visitSite(${i})" class="btn btn-visit"><i class="fa-solid fa-eye pe-2"></i> Visit</button></td>
                    <td><button onclick="deleteData(${i})" class="btn btn-delete"><i class="fa-solid fa-trash pe-2"></i> Delete</button></td>
                    </tr>`
        }
    }
    document.getElementById("tableBody").innerHTML = tableRow;
}

