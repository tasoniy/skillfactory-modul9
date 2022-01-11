let width = document.getElementById('width');
let height = document.getElementById('height');
let button = document.getElementById('button');
let textarea = document.getElementById('textarea');
let photo = document.getElementById('photo');

function checkValue(value) {
  if(!isNaN(value) && value >= 100 && value <= 300) 
    return true;

  return false;
} 

function clear() {
  textarea.innerHTML = ``;
  photo.innerHTML = ``;
}

button.onclick = async () => {
  clear();
  if(!checkValue(width.value) || !checkValue(height.value)) 
    return textarea.innerHTML = 'одно из чисел вне диапазона от 100 до 300'
    
  let url = await getPicsumPhoto(width.value, height.value);
  insertImage(url);  
}

function getPicsumPhoto(w, h) {
  return new Promise((resolve) => {
    fetch(`https://picsum.photos/${w}/${h}`)
    .then((response) => {resolve(response.url)});
  });
}

function insertImage(image) {
  photo.innerHTML = `<img src="${image}" />`;
}
