let lat, lon;
  navigator.geolocation.getCurrentPosition(position => {
    lat = position.coords.latitude
    lon = position.coords.longitude
  })

  document.getElementById('find-a-taco')
    .addEventListener('click', () => {
      window.location.href = `/restaurants/${lat}/${lon}`
    });

    document.getElementById('user')
    .addEventListener('click', () => {
      window.location.href = `/users`
    });