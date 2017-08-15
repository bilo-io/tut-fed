require('./style.scss');
require('./favicon.ico');

sayHello = () => {
    let name = document.getElementById('name-input').value;
    alert('Hello ' + name);
}

var sayAdios = function (name) {
    let name = document.getElementById('name-input').innerHTML;
    alert('Adios' + name)
}

window.onload = () => {
    document.getElementById('hello-button').onclick = sayHello;
    document.getElementById('adios-button').onclick = sayAdios;
}