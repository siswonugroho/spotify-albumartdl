document.addEventListener('DOMContentLoaded', function () {
  const form = document.forms[0];
  const URLinput = form.elements[0];
  const alertError = document.querySelector('#alert-failed');
  const alertLoading = document.querySelector('#alert-loading');
  const cardAlbum = document.querySelector('#card-img-album');
  const title = document.querySelector('#song-title');
  const albumImg = document.querySelector('.img-album');
  const downloadBtn = document.querySelector('a#download-link');

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    // loading state
    alertError.classList.add('d-none');
    alertLoading.classList.remove('d-none');
    fetch(`https://open.spotify.com/oembed?url=${URLinput.value}`)
      .then(response => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.json();
      }).then(responseJson => {
        alertError.classList.add('d-none');
        cardAlbum.classList.remove('d-none');
        title.textContent = responseJson.title;
        albumImg.style.opacity = '.4';
        setTimeout(() => {
          albumImg.src = responseJson.thumbnail_url;
          albumImg.onload = function () {
            alertLoading.classList.add('d-none');
            albumImg.style.opacity = '1';
            extractColor(this);
          }
        }, 400);
        downloadBtn.href = responseJson.thumbnail_url.replace('1e02', 'b273');
      }).catch(error => {
        alertLoading.classList.add('d-none');
        alertError.classList.remove('d-none');
      });
  })
});