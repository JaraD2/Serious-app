document.addEventListener('DOMContentLoaded', function() {
  var next = document.getElementById('next');
  var back = document.getElementById('back');
  back.style.display = 'none';

  var displayedImage = document.getElementById('image');
  var displayedText = document.getElementById('text');

  var currentImage = 1;
  var totalImages = 4;
  var jsonData;

  fetchData().then(data => {
    jsonData = data.data;
    displayImageAndText(currentImage);
  });

  next.addEventListener('click', function() {
    if ((currentImage + 1) <= totalImages) {
      currentImage++;
      displayImageAndText(currentImage);
    }
    back.style.display = 'block';
    if (currentImage === totalImages) {
      next.style.display = 'none';
    }
  });

  back.addEventListener('click', function() {
    if (currentImage <= totalImages) {
      next.style.display = 'block';
    }
    if (currentImage === 2) {
      back.style.display = 'none';
    }

    currentImage--;
    displayImageAndText(currentImage);
  });

  function displayImageAndText(imageIndex) {
    var imageData = jsonData[imageIndex];
    if (imageData) {
      displayedImage.src = imageData.image;
      displayedText.textContent = imageData.text;
    }
  }
});

function fetchData() {
  return fetch('/script/Info.json')
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .catch(error => {
      console.error('There was a problem fetching the data:', error);
    });
}
