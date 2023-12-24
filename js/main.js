

var bookmarkName = document.getElementById("bookmarkName");
var bookmarkURL = document.getElementById("bookmarkURL");
var bookmarkList = [];
var btnSubmit = document.querySelector('.btn-submit');
var btnClear = document.querySelector('.btn-clear');
var inputSearch = document.getElementById("inputSearch");
var layer = document.querySelector(".layer");
var btnClose = document.querySelector(".btn-close");
console.log(btnClose);


if(localStorage.getItem("sites") != null){
bookmarkList = JSON.parse(localStorage.getItem("sites"));
showData();
}

btnSubmit.addEventListener('click',function(){
    addSite()
    showData()
});

btnClear.addEventListener('click', function(){
    clearData()
});

inputSearch.addEventListener('input', function(){
    search()
})

btnClose.addEventListener('click', function(){
    layer.style.display = "none"
})
layer.addEventListener('click', function(){
    layer.style.display = "none"
})

function addSite(){

    if(bookmarkName.value.length < 3){
        layer.style.display = "block"
        return;
    }

    if (!bookmarkURL.value.includes('.')){
        layer.style.display = "block"
        return;
    }

    var site = {name: bookmarkName.value , url: bookmarkURL.value};

    bookmarkList.push(site);

    localStorage.setItem('sites', JSON.stringify(bookmarkList));

    showData()
    console.log(bookmarkName.value);
    clearData()
    
}

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


function clearData(){
    bookmarkName.value = "";
    bookmarkURL.value = "";
}

function deleteData(index){
    bookmarkList.splice(index, 1);
    localStorage.setItem('sites', JSON.stringify(bookmarkList));
    showData();
}

function visitSite(index){
    
    window.open(bookmarkList[index].url);
    
}

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

    console.log(inputSearch.value);

