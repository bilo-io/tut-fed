sayHello = () => {
    alert('Hello ' + document.getElementById('name').value);
}

var sayAdios = function () {
    alert('Adios ' + document.getElementById('name').value);
}

window.onload = () => {
    document.getElementById('hello').onclick = sayHello;
    document.getElementById('adios').onclick = sayAdios;
}