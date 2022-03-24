/*
Написать код приложения, интерфейс которого состоит из двух input и кнопки. В input можно ввести любое число.

Заголовок первого input — «номер страницы».
Заголовок второго input — «лимит».
Заголовок кнопки — «запрос».
При клике на кнопку происходит следующее:

Если число в первом input не попадает в диапазон от 1 до 10 или не является числом — выводить ниже текст «Номер страницы вне диапазона от 1 до 10»;
Если число во втором input не попадает в диапазон от 1 до 10 или не является числом — выводить ниже текст «Лимит вне диапазона от 1 до 10»;
Если и первый, и второй input не в диапазонах или не являются числами — выводить ниже текст «Номер страницы и лимит вне диапазона от 1 до 10»;
Если числа попадают в диапазон от 1 до 10 — сделать запрос по URL https://picsum.photos/v2/list?page=1&limit=10, где GET-параметр page — это число из первого input, а GET-параметр limit — это введённое число второго input. 
Пример: если пользователь ввёл 5 и 7, то запрос будет вида https://picsum.photos/v2/list?page=5&limit=7.
После получения данных вывести список картинок на экран.

Если пользователь перезагрузил страницу, то ему должны показываться картинки из последнего успешно выполненного запроса (использовать localStorage).
*/

let page = document.getElementById('page');
let limit = document.getElementById('limit');
let textarea = document.getElementById('textarea');
let photo = document.getElementById('photo');
let request = document.getElementById('request');

function checkValue(value) {
    if (!isNaN(value) && value >= 1 && value <= 10)
        return true;
    
    return false;
}

function clear() {
    textarea.innerHTML = ``;
    photo.innerHTML = ``;
}

request.onclick = async () => {
    clear();
    if (!checkValue(page.value) && !checkValue(limit.value))
        return textarea.innerHTML = 'Номер страницы и лимит вне диапазона от 1 до 10';

    if (!checkValue(page.value)) 
        return textarea.innerHTML = 'Номер страницы вне диапазона от 1 до 10';

    if (!checkValue(limit.value)) 
        return textarea.innerHTML = 'Лимит вне диапазона от 1 до 10';

    let image = await getPicsumPhoto(page.value, limit.value)
    for (let i = 0; i < image.length; i++)
        insertImage(image[i].download_url);
} 

function getPicsumPhoto (page, limit) {
    return fetch(`https://picsum.photos/v2/list?page=${page}&limit=${limit}`)
    .then((response) => {return response.json();})
}

function insertImage (url) {
    photo.innerHTML += `<img src="${url}" height="100" />`;
}
