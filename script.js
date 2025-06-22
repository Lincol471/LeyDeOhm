
function calcular() {
  let V = parseFloat(document.getElementById("voltaje").value);
  let I = parseFloat(document.getElementById("corriente").value);
  let R = parseFloat(document.getElementById("resistencia").value);
  let resultado = document.getElementById("resultado");

  if (!isNaN(V) && !isNaN(I)) {
    R = V / I;
    resultado.innerText = `Resistencia calculada: ${R.toFixed(2)} ohmios`;
  } else if (!isNaN(V) && !isNaN(R)) {
    I = V / R;
    resultado.innerText = `Corriente calculada: ${I.toFixed(2)} amperios`;
  } else if (!isNaN(I) && !isNaN(R)) {
    V = I * R;
    resultado.innerText = `Voltaje calculado: ${V.toFixed(2)} voltios`;
  } else {
    resultado.innerText = "Por favor ingresa al menos 2 valores.";
  }

  graficar(V, I, R);
}

function reiniciar() {
  document.getElementById("voltaje").value = "";
  document.getElementById("corriente").value = "";
  document.getElementById("resistencia").value = "";
  document.getElementById("resultado").innerText = "";
  const canvas = document.getElementById("grafico");
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function graficar(V, I, R) {
  const canvas = document.getElementById("grafico");
  const ctx = canvas.getContext("2d");
  canvas.width = 400;
  canvas.height = 300;
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const labels = ["Voltaje (V)", "Corriente (I)", "Resistencia (R)"];
  const datos = [V || 0, I || 0, R || 0];

  const max = Math.max(...datos, 10);
  const barWidth = 80;

  datos.forEach((valor, i) => {
    let height = (valor / max) * 200;
    ctx.fillStyle = "#2e86de";
    ctx.fillRect(50 + i * 120, 250 - height, barWidth, height);
    ctx.fillStyle = "#000";
    ctx.fillText(labels[i], 50 + i * 120, 270);
    ctx.fillText(valor.toFixed(2), 50 + i * 120 + 10, 240 - height);
  });
}