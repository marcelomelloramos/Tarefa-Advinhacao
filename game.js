// game.js

// Configurações principais
const MAX_ATTEMPTS = 10; // número máximo de tentativas (troque se quiser)

let secretNumber;
let attemptsLeft;
let gameOver = false;

const guessInput = document.getElementById('guessInput');
const guessBtn = document.getElementById('guessBtn');
const resetBtn = document.getElementById('resetBtn');
const message = document.getElementById('message');
const attemptsLeftSpan = document.getElementById('attemptsLeft');
const maxAttemptsDisplay = document.getElementById('maxAttemptsDisplay');

maxAttemptsDisplay.textContent = MAX_ATTEMPTS;

// Gera número aleatório entre 1 e 100
function generateSecretNumber() {
  return Math.floor(Math.random() * 100) + 1;
}

// Inicializa (ou reinicia) o jogo
function initGame() {
  secretNumber = generateSecretNumber();
  attemptsLeft = MAX_ATTEMPTS;
  gameOver = false;

  attemptsLeftSpan.textContent = attemptsLeft;
  message.textContent = 'Faça seu palpite e pressione "Chutar" (ou Enter).';
  message.className = 'message';
  guessInput.value = '';
  guessInput.disabled = false;
  guessBtn.disabled = false;
  resetBtn.hidden = true;
  guessInput.focus();
  console.log('Número secreto (debug):', secretNumber); // opcional, útil para testes
}

// Lida com chute do jogador
function handleGuess() {
  if (gameOver) return;

  const raw = guessInput.value;
  const guess = parseInt(raw, 10);

  // Validação básica
  if (isNaN(guess)) {
    showMessage('Por favor insira um número válido.', 'error');
    return;
  }
  if (guess < 1 || guess > 100) {
    showMessage('O palpite deve ser um número entre 1 e 100.', 'error');
    return;
  }

  // Se o chute for válido, decrementa tentativas
  attemptsLeft--;
  attemptsLeftSpan.textContent = attemptsLeft;

  // Compara
  if (guess === secretNumber) {
    showMessage(`Você acertou! O número era ${secretNumber}.`, 'success');
    endGame(true);
    return;
  }

  if (guess < secretNumber) {
    showMessage('O número secreto é maior.', 'warn');
  } else {
    showMessage('O número secreto é menor.', 'warn');
  }

  // Checa se acabou tentativas
  if (attemptsLeft <= 0) {
    showMessage(`Você perdeu! O número secreto era ${secretNumber}.`, 'error');
    endGame(false);
    return;
  }

  // Limpa input para novo palpite e foca
  guessInput.value = '';
  guessInput.focus();
}

// Exibe mensagem com classe para estilos
function showMessage(text, type) {
  message.textContent = text;
  message.className = 'message ' + (type || '');
}

// Finaliza o jogo (desabilita inputs e mostra botão reiniciar)
function endGame(won) {
  gameOver = true;
  guessInput.disabled = true;
  guessBtn.disabled = true;
  resetBtn.hidden = false;
}

// Eventos
guessBtn.addEventListener('click', handleGuess);
resetBtn.addEventListener('click', initGame);

// Permitir pressionar Enter no campo para 'chutar'
guessInput.addEventListener('keydown', function(event) {
  if (event.key === 'Enter') {
    event.preventDefault();
    handleGuess();
  }
});

// Inicializa ao carregar
initGame();
