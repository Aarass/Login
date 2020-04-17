function sendLocation() {
  if (!navigator.geolocation) {
    alert('Location is unavailable');
  } else {
    navigator.geolocation.getCurrentPosition((response) => {
      const location = {
        lat: response.coords.latitude,
        lon: response.coords.longitude,
        time: Date.now()
      }
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(location)
      }
      fetch('/api', options);
    });
  }
}

async function recieveData() {
  const response = await fetch('/api');
  const data = await response.json();
  return data;
}
async function getData() {
  const data = await recieveData();
  const table = document.createElement('table');
  for(let i = 0; i < data.length; i++)
  {
    const newElement = document.createElement('tr');
    const lat = document.createElement('td');
    lat.textContent = data[i].lat;
    const lon = document.createElement('td');
    lon.textContent = data[i].lon;
    const time = document.createElement('td');
    time.textContent = data[i].time;
    newElement.append(lat);
    newElement.append(lon);
    newElement.append(time);
    table.append(newElement);
  }
  if(table.innerHTML != "")
    document.body.append(table);
}
