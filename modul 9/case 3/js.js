
// созданем переменные, в которые запишем html элементы

let input = document.getElementById('input');
let button = document.getElementById('button');
let text = document.getElementById('text');
let image = document.getElementById('image');

// создаем функцию, которая будет проверять попало ли число в диапазон

function checkValue() {
  // создаем переменную, с помощью которой мы получим значение из input
  let value = +input.value;
    if(value > 0 && value <= 10) {
      answer(value);
    }
    else {
        text.innerHTML = 'число вне диапазона от 1 до 10';
    }
}

// вешаем обработчик на кнопку

button.onclick = checkValue;

function answer(limit) {
  let requestURL = `https://picsum.photos/v2/list?limit=${limit}`;
  
  let xhr = new XMLHttpRequest();
  
  xhr.open('GET', requestURL);
  
  xhr.send();
  
  xhr.onload = () => {
    image.innerHTML = ``;
    let json =  JSON.parse(xhr.responseText);
    console.log(json);
    for (let i = 0; i < json.length; i++) {
       // image.innerHTML += json[i].download_url;
        let imgCard = document.createElement('img');
        imgCard.setAttribute('src', json[i].download_url);
        imgCard.setAttribute('width',200);
        image.appendChild(imgCard);
    }
    
  }

}