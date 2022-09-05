const pwlength = document.getElementById("slider-strength");
const strength = document.getElementById("strength");
const generate = document.getElementById("generate");
const number = document.getElementById("number");
const lower = document.getElementById("lower");
const upper = document.getElementById("upper");
const symbols = document.getElementById("symbols");
const password = document.getElementById("password");
const copyButton = document.getElementById("copy-button");

// Displays how strong the password is
pwlength.addEventListener("click", function () {
  if (pwlength.value >= 15) {
    strength.innerHTML = "STRONG";
  } else if (pwlength.value <= 7) {
    strength.innerHTML = "WEAK";
  } else {
    strength.innerHTML = "MEDIUM";
  }
});

// Start generating a password if button is clicked
generate.addEventListener("click", function () {
  generatePassword();
});

// Copy password to clipboard if button is pressed
copyButton.addEventListener("click", function () {
  copy();
});

// Generate password
let lowerLetters = "abcdefghiklmnopqrstuvwxyz";
let upperLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
let symbol = "!\"§$%&/(()=?'*#+-";
let numbers = "123456789";
let passwordArr = [];
const functionsArr = [addSymbol, addNumber, addLowerLetter, addUpperLetter];

function generatePassword() {
  // Reset old password if user wants to generate new password
  passwordArr = [];
  // Check if user wants number, symbols, uppercase or lowercase included in password
  if (number.checked) {
    addNumber();
  }
  if (symbols.checked) {
    addSymbol();
  }
  if (upper.checked) {
    addUpperLetter();
  }
  if (lower.checked) {
    addLowerLetter();
  }

  // Add random random number, symbols, uppercase or lowercase characters
  for (let i = passwordArr.length; i < pwlength.value; i++) {
    functionsArr[Math.floor(Math.random() * 4)]();
  }

  // Shuffle the array
  const shuffleArray = (passwordArr) => {
    for (let i = passwordArr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = passwordArr[i];
      passwordArr[i] = passwordArr[j];
      passwordArr[j] = temp;
    }
  };

  // Display the password on page
  password.innerHTML = passwordArr.join("");
}

// Functions to add specific character
function addSymbol() {
  passwordArr.push(symbol[Math.floor(Math.random() * symbol.length)]);
}
function addNumber() {
  passwordArr.push(numbers[Math.floor(Math.random() * numbers.length)]);
}
function addUpperLetter() {
  passwordArr.push(
    upperLetters[Math.floor(Math.random() * upperLetters.length)]
  );
}
function addLowerLetter() {
  passwordArr.push(
    lowerLetters[Math.floor(Math.random() * lowerLetters.length)]
  );
}

// Copy password to clipboard
function copy() {
  navigator.clipboard.writeText(password.textContent);
  alert("Copied password!");
}
