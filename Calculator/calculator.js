function clearScreen() {
    document.getElementById("display").value = "";
}

function display(value) {
    document.getElementById("display").value += value;
}

function calculate() {
    let p = document.getElementById("display").value;
    let q = eval(p);
    document.getElementById("display").value = q;
}