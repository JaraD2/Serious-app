document.addEventListener('DOMContentLoaded', function() {
  const body = document.querySelector('body');
  const next = document.getElementById('next');
  const back = document.getElementById('back');
  const hidden = document.getElementById('hidden');
  back.style.display = 'none';

  const displayedImage = document.getElementById('image');
  const displayedText = document.getElementById('text');

  let currentImage = 1;
  const totalImages = 4;
  let jsonData;

  fetchData().then(data => {
    jsonData = data.data;
    console.log(jsonData);
    displayImageAndText(currentImage);
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

  next.addEventListener('click', function() {
    if ((currentImage + 1) <= totalImages) {
      currentImage++;
      specialEffectsSwitch(currentImage);
      console.log(`currentImage: ${currentImage}`)
      displayImageAndText(currentImage);
    }
    back.style.display = 'block';
    if (currentImage === totalImages) {
      next.style.display = 'none';
      hidden.style.display = 'none';
    }
    if (currentImage >= 1) {
      hidden.style.display = 'none';
    }
  });

  back.addEventListener('click', function() {

    if (currentImage <= totalImages) {
      next.style.display = 'block';
    }
    if (currentImage === 2) {
      back.style.display = 'none';
    }
    if (currentImage === 2) {
      hidden.style.display = "block";
    }
    currentImage--;
    console.log(`currentImage: ${currentImage}`)
    displayImageAndText(currentImage);
  });

  function displayImageAndText(imageIndex) {
    const imageData = jsonData[imageIndex];
    if (imageData) {
      displayedImage.src = imageData.image;
      displayedText.textContent = imageData.text;
    }
  }
  var wef = document.getElementById('image');
  let i = 1; // Define i outside the event listener to maintain its value between function calls

  // setInterval(function() {
  //   specialEffects(body, 'shake');
  // }, 5000);

  

  // setInterval(function() {
  //   if (i > 4) {
  //     i = 1; 
  //     console.log('i reset');
  //   }
  //   specialEffectsSwitch(i);
  //   i++;

  // }, 1000);
function specialEffectsSwitch(i) {
  switch (i) {
    case 1:
        console.log('case 1');
      break;
    case 2:
        console.log('case 2');
        specialEffects(body, 'shake');
      break;
    case 3:
        console.log('case 3');
      break;
    case 4:
        console.log('case 4');
      break;
    default:
      console.log('default');
  }
};
function specialEffects(element, effect) {
  element.classList.toggle(effect);
  setTimeout(function() {
    element.classList.toggle(effect);
  }, 1000);
}

});
