var agregar = document.querySelector(".guardar-empezar");

agregar.addEventListener("click",function (capturar) {
    capturar.preventDefault(); 

    var tx = document.getElementById("textarea").value;
    var tx = tx;
    
if (tx.length === 0 || /^\s+$/.test(tx)) {
    alert("Este campo no puede estar vacio.")
}
else if(/[^A-Z ]/.test(tx)){
    alert("Solo mayusculas y sin tilde.")
}else {
    alert("Se adiciono la palabra con exito!") 
    localStorage.setItem("addword",tx);
    window.location.href = "game.html";
}
});
