fetch('https://api64.ipify.org?format=json')
  .then(response => response.json())
  .then(data => {
    const ipAddress = data.ip;
    fetchLocation(ipAddress);
  })
  .catch(error => {
    console.error('Error fetching IP address:', error);
  });



async function fetchLocation(ip){
    data = await fetch(`https://ipinfo.io/${ip}/geo`);
    jsonData = await data.json();
    console.log(jsonData);
    renderInfo(jsonData);
    fetchPostOffices(jsonData);
    
}

function renderInfo(jsonData){
    latLong = jsonData.loc.split(',');
    console.log(latLong);
    setGMap(latLong);
    document.getElementById('ip').innerText = jsonData.ip;
    document.getElementById('lat').innerText = latLong[0];
    document.getElementById('cit').innerText = jsonData.city;
    document.getElementById('org').innerText = jsonData.org;
    document.getElementById('long').innerText = latLong[1];
    document.getElementById('reg').innerText = jsonData.region;
    document.getElementById('host').innerText = jsonData.country;   
    
}

function setGMap(latLong){
    mapFrame = document.getElementById('map');
    console.log(mapFrame)
    mapFrame.setAttribute('src', `https://maps.google.com/maps?q=${latLong[0]},${latLong[1]}&z=15&output=embed" width="1000" height="500" frameborder="0" style="border:0`
)
}

async function fetchPostOffices(jsonData){
    pinCode = jsonData.postal;
    postOfficeData = (await fetch(`https://api.postalpincode.in/pincode/${pinCode}`));
    postOffice = await postOfficeData.json();
    postOfficeList = postOffice[0].PostOffice;
    console.log(postOfficeList)
    postOfficeElement = document.getElementById('post-office-list');
    console.log(postOfficeElement)
    postOfficeList.innerHTML ='';
    for(let i=0;i<postOfficeList.length;i++){
        postOfficeElement.innerHTML += `<div class="cards">
                                        <p>Name: ${postOfficeList[0].Name}</p>
                                        <p>Brance Type: ${postOfficeList[0].BranchType}</p>
                                        <p>Delivery Status: ${postOfficeList[0].DeliveryStatus}</p>
                                        <p>District: ${postOfficeList[0].District}</p>
                                        <p>Division: ${postOfficeList[0].Division}</p>
                                        </div>`
    }
}