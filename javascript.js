console.log("Ashish ka project work");

var input = document.getElementById("input");
var inputval = "";

var button = document.getElementById("button");
button.addEventListener('click', searchfunc);

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

//search function to trigger on clicking the searchfunction
function searchfunc() {
    // console.log("you clicked search");
    let inputdata = input.value;

    // console.log(data);
    var request = new XMLHttpRequest();
    request.open('GET', 'data.json', true);

    let accordion = document.getElementById("accordion");

    request.onload = function () {
        if (request.status >= 200 && request.status < 400) {
            // Success!
            console.log(request.status);
            var data = JSON.parse(request.responseText);
            let dataarray = data.Hospitaldetails;

            let totdetails = "";
            var flag=0;
            dataarray.forEach(function (element, index) {
                inputdata = inputdata.toLowerCase();
                flag=flag+1;
                if (element.District === (inputdata) || element.District === (inputdata.toUpperCase()) ||
                    element.District === (inputdata.toLowerCase()) || element.District === (capitalizeFirstLetter(inputdata))) {
                        // flag=0;
                    let details = `
                    <div class="card">
                    <div class="card-header" id="heading${index}">
                        <h5 class="mb-0">
                            <button class="btn btn-link" data-toggle="collapse" data-target="#collapse${index}"
                                aria-expanded="true" aria-controls="collapse${index}">
                                <b> ${element.District} : </b> ${element.SiteName}
                            </button>
                        </h5>
                    </div>
        
                    <div id="collapse${index}" class="collapse " aria-labelledby="heading${index}" data-parent="#newsAccordion">
                        <div class="card-body">
                        <b>Person Of Contact: ${element.Personofcontact}</b> <br>
                        Mobile Number : ${element.MobileNumber}<br>
                        Hospital Name: ${element.SiteName} <br>
                        Category: ${element.Category}<br>
                        Co-Ordinates : <br>
                        Latitude: ${element.Latitude}° <br>
                        Longitude: ${element.Longitude}° <br>   
                        Address: ${element.Address} , ${element.District} , ${element.State} <br> 
                    </div>
                    </div>
                </div> 
        `
                    totdetails += details;
                    accordion.innerHTML = totdetails;
                }
                else if(flag>7935){
                    console.log(flag);
                    alert("The given City is Not found . Please check the city name again!!");
                    flag=0;
                }
            });
            
        
        } else {
            // We reached our target server, but it returned an error
            alert("Error");
        }
    };
    request.send();
}