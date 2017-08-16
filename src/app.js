import './favicon.ico';
import './style.scss';

var sayHello = function () {
    alert('Hello ' + document.getElementById('name').value);
}

var sayAdios = function () {
    alert('Adios ' + document.getElementById('name').value);
}

window.onload = function() {
    document.getElementById('hello').onclick = sayHello;
    document.getElementById('adios').onclick = sayAdios;
}