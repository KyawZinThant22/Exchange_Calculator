let input = document.getElementById("input");
let form = document.getElementById("form");
let to = document.getElementById("to");
let result = document.getElementById("result");
let historyList = document.getElementById("historyList");


// Loop API to get data
function createOption(x, y, z) {
    let o = document.createElement("option");
    let text = document.createTextNode(y);
    o.setAttribute("value", toNum(z))
    o.appendChild(text);
    x.appendChild(o);
}

// creating table rows

function createTr(x) {

    let rowSpacer = document.getElementById("rowSpacer");
    if (rowSpacer) {
        rowSpacer.remove();
    }

    let tr = document.createElement("tr");
    x.map(function(el) {

        let td = document.createElement("td");
        let textnote = document.createTextNode(el);
        td.appendChild(textnote);
        tr.appendChild(td);

    });

    historyList.appendChild(tr)
}

function store() {
    localStorage.setItem("record", historyList.innerHTML)
}



function toNum(x) {
    return Number(x.replace(",", ""));
}

for (x in data.rates) {
    createOption(form, x, data.rates[x])
    createOption(to, x, data.rates[x])
        // console.log(x);
}


// Calculation
document.getElementById("calc").addEventListener("submit", function(e) {
    e.preventDefault();

    // get state
    let inputdata = input.value;
    let formdata = form.value;
    let todata = to.value;
    // console.log(inputdata, formdata, todata);


    // process
    let fromCurrency = x + " " + form.options[form.selectedIndex].innerText;
    let toCurrency = to.options[to.selectedIndex].innerText;
    let firstCalc = inputdata * formdata;
    let secondCalc = firstCalc / todata;
    let resultdata = secondCalc.toFixed(2);
    let date = new Date().toLocaleString();
    let dataarray = [date, fromCurrency, toCurrency, resultdata];
    createTr(dataarray)
    store();
    // set state

    result.innerHTML = resultdata;
    input.value = 0.00;
    input.focus();
    form.value = '';
    to.value = "1";

});

(function() {
    if (localStorage.getItem("record")) {
        historyList.innerHTML = localStorage.getItem("record");
    } else {
        historyList.innerHTML = `<tr ><td id ="rowSpacer" colspan=4 >There is no Record</td></tr>`;
    }
})();

function changeMode() {
    document.body.classList.toggle("night-mode");
    document.getElementById("modeicon").classList.toggle("fa-sun")
}