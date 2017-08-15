require('./style.scss');
require('./favicon.ico');

sayHello = () => {
    alert('Hello ' + document.getElementById('name').value);
}

var sayAdios = function () {
    alert('Adios' + document.getElementById('name').innerHTML);
}

window.onload = () => {
    document.getElementById('hello').onclick = sayHello;
    document.getElementById('adios').onclick = sayAdios;
}