const cartgato = document.querySelectorAll('.cartao-gato');

let temCartaoVirado = false;
let CartaBloqueada = false;
let primeiraCarta, segundaCarta;

function fVirarCarta() {
  if (CartaBloqueada) return;
  if (this === primeiraCarta) return;

  this.classList.add('flip');

  if (!temCartaoVirado) {
    temCartaoVirado = true;
    primeiraCarta = this;

    return;
  }

  segundaCarta = this;
  fIgual();
}

function fIgual() {
  let isMatch = primeiraCarta.dataset.framework === segundaCarta.dataset.framework;

  isMatch ? fDesabilitaCarta() : fDesvirarCarta();
}

function fDesabilitaCarta() {
  primeiraCarta.removeEventListener('click', fVirarCarta);
  segundaCarta.removeEventListener('click', fVirarCarta);

  fReiniciar();
}

function fDesvirarCarta() {
  CartaBloqueada = true;

  setTimeout(() => {
    primeiraCarta.classList.remove('flip');
    segundaCarta.classList.remove('flip');

    fReiniciar();
  }, 1500);
}

function fReiniciar() {
  [temCartaoVirado, CartaBloqueada] = [false, false];
  [primeiraCarta, segundaCarta] = [null, null];
}

(function fEmbaralhar() {
    cartgato.forEach(card => {
    let posAleatoria = Math.floor(Math.random() * 12);
    card.style.order = posAleatoria;
  });
})();

cartgato.forEach(card => card.addEventListener('click', fVirarCarta));