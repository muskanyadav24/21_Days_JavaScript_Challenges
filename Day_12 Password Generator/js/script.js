// Update slider value
function updateLength() {
  document.getElementById("lengthValue").innerText =
    document.getElementById("length").value;
}

// Generate Password
function generatePassword() {
  const length = parseInt(document.getElementById("length").value);
  const hasUpper = document.getElementById("uppercase").checked;
  const hasLower = document.getElementById("lowercase").checked;
  const hasNumber = document.getElementById("numbers").checked;
  const hasSymbol = document.getElementById("symbols").checked;

  const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lower = "abcdefghijklmnopqrstuvwxyz";
  const numbers = "0123456789";
  const symbols = "!@#$%^&*()_+[]{}";

  let allChars = "";
  let password = [];

  if (hasUpper) allChars += upper;
  if (hasLower) allChars += lower;
  if (hasNumber) allChars += numbers;
  if (hasSymbol) allChars += symbols;

  if (!allChars) {
    alert("Please select at least one option!");
    return;
  }

  // Ensure at least one character from each selected type
  if (hasUpper) password.push(getRandomChar(upper));
  if (hasLower) password.push(getRandomChar(lower));
  if (hasNumber) password.push(getRandomChar(numbers));
  if (hasSymbol) password.push(getRandomChar(symbols));

  // Fill remaining characters
  while (password.length < length) {
    password.push(getRandomChar(allChars));
  }

  // Shuffle password 
  password = shuffleArray(password);

  document.getElementById("password").value = password.join("");
}

// Get random character
function getRandomChar(str) {
  return str[Math.floor(Math.random() * str.length)];
}

// Shuffle array (Fisher-Yates Algorithm)
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Copy Password (modern way)
function copyPassword() {
  const password = document.getElementById("password").value;

  if (!password) {
    alert("Generate a password first!");
    return;
  }

  navigator.clipboard.writeText(password)
    .then(() => alert("Password copied!"))
    .catch(() => alert("Failed to copy!"));
}