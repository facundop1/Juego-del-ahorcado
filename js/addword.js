const add = document.querySelector(".guardar-empezar");

add.addEventListener("click", function (event) {
  event.preventDefault();

  const tx = document.getElementById("textarea").value.trim();

  if (tx.length === 0 || /^\s+$/.test(tx)) {
    alert("Este campo no puede estar vacío.");
  } else if (/[^A-Z ]/.test(tx)) {
    alert("Solo se permiten mayúsculas y sin tilde.");
  } else {
    alert("¡Se adicionó la palabra con éxito!");
    localStorage.setItem("addword", tx);
    window.location.href = "game.html";
  }
});
