const button = document.getElementById("b");
const paragraf = document.getElementById("p");
const koel = function () {
    a ++;
    if (a < 1000){;
        paragraf.innerHTML = "<br>" + a + " kliks";
    } else{
        paragraf.innerHTML = "tijd om naar buiten te gaan";
        button.style.display = "none";
    }
}
let a = 0;
button.addEventListener("click", koel);