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