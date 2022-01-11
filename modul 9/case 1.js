// case 1

// Вам дана заготовка и результат, который вы должны получить. Ваша задача — написать код, который будет преобразовывать XML в JS-объект и выводить его в консоль.
// 
//  XML:
// 
// <list>
//   <student>
//     <name lang="en">
//       <first>Ivan</first>
//       <second>Ivanov</second>
//     </name>
//     <age>35</age>
//     <prof>teacher</prof>
//   </student>
//   <student>
//     <name lang="ru">
//       <first>Петр</first>
//       <second>Петров</second>
//     </name>
//     <age>58</age>
//     <prof>driver</prof>
//   </student>
// </list>
// JS-объект:
// 
// {
//   list: [
//     { name: 'Ivan Ivanov', age: 35, prof: 'teacher', lang: 'en' },
//     { name: 'Петр Петров', age: 58, prof: 'driver', lang: 'ru' },
//   ]
// }

let parser = new DOMParser();
let xmlString =`<list>
  <student>
    <name lang="en">
      <first>Ivan</first>
      <second>Ivanov</second>
    </name>
    <age>35</age>
    <prof>teacher</prof>
  </student>
  <student>
    <name lang="ru">
      <first>Петр</first>
      <second>Петров</second>
    </name>
    <age>58</age>
    <prof>driver</prof>
  </student>
</list>`;

let xmlDOM = parser.parseFromString(xmlString,'text/xml');

// Создаем объект с пустым массивом list
// для того чтобы далее записывать туда результат
let students = {
  list: []
};

// Перебираем всех студентов по очереди
let studentNodes = xmlDOM.querySelectorAll('student');
for (let i = 0; i < studentNodes.length; i++) {

  // Создаем вспомогательную переменную current и кладет туда текущего студента

  let current = studentNodes[i];

  // Разбираем нашего студента

  let lang = current
    .querySelector('name')
    .getAttribute('lang');

  let first = current
    .querySelector('first')
    .textContent;

  let second = current
    .querySelector('second')
    .textContent;

  let prof = current
    .querySelector('prof')
    .textContent;

  let age = current
    .querySelector('age')
    .textContent;

  // Кладем все наши переменные в наш объект в массив list
  students.list.push({
    name: ${first} ${second},
    age: age,
    prof: prof,
    lang: lang
  });
}

// Выводим в консоль наш объект в котором находится массив list с результатом
console.log(students);