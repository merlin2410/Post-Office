// Using a third-party API to get the user's IP address
ipAddressDisplay = document.getElementById('ip-address-display');
fetch('https://api64.ipify.org?format=json')
  .then(response => response.json())
  .then(data => {
    const ipAddress = data.ip;
    ipAddressDisplay.innerText = `Your Current IP address is ${ipAddress}`;
  })
  .catch(error => {
    console.error('Error fetching IP address:', error);
  });

document.getElementById('start-btn').addEventListener('click',(event)=>{
    window.open('location.html','blank');
})

  
  