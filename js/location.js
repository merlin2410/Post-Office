fetch('https://api64.ipify.org?format=json')
  .then(response => response.json())
  .then(data => {
    const ipAddress = data.ip;
    fetchLocation(ipAddress)
  })
  .catch(error => {
    console.error('Error fetching IP address:', error);
  });



async function fetchLocation(ip){
    data = await fetch(`https://ipinfo.io/${ip}/geo`);
    jsonData = await data.json();
    console.log(jsonData);
    renderInfo(jsonData);
}

function renderInfo(jsonData){
    document.getElementById('ip').innerText = jsonData.ip;
    
    
}