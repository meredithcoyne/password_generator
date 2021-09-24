var generateBtn = document.querySelector("#generate")

    // all possible characters for possible password
var upperCase = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
var lowerCase = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o",  "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
var numericCharacter = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
var specialCharacter = ["@", "#", "$", "%", "^", "&", "*", "(", ")", "-", "_", "=", "+"];

//Validate the user input
function getPasswordOptions(userNumCharacters) {
  if (isNaN(userNumCharacters)) {
    alert("Please enter a valid number.");
    return false;
  } else if (parseInt(userNumCharacters) < 8) {
    alert("Password length must be at least 8 characters.");
    return false;
  } else if (parseInt(userNumCharacters) >= 128) {
    alert("Password must be less than 129 characters.");
    return false;
  }
  return true;
}

//Get random characters from each chosen character type
function getRandomElementFromArray(collection) {
  return collection[Math.floor(Math.random() * collection.length)];
}

//Function to prompt user for password options
function generatePassword() {
  var userNumCharacters = prompt(
    "How many characters do you want your password to contain?"
  );
  var passwordValid = getPasswordOptions(userNumCharacters);
  if (passwordValid) {
    var hasSpecialCharacter = confirm(
      "Click OK to confirm special characters."
    );
    var hasNumbers = confirm("Click OK to confirm adding numeric characters.");
    var hasLowerCase = confirm(
      "Click OK to confirm adding lowercase characters."
    );
    var hasUpperCase = confirm(
      "Click OK to confirm including uppercase characters."
    );
  }
  //Conditional statement to check if user does not include any types of characters. Password generator ends if all four variables evaluate to false
  if (
    [hasSpecialCharacter, hasNumbers, hasLowerCase, hasUpperCase].includes(
      true
    )
  )
    //Array to store types of characters to include in password
    var chosenChar = [];

  //Array to contain one of each type of chosen character to ensure each will be used
  var guaranteedChar = [];

  //Conditional statements that add array of each type of character into array of possible characters based on user input and pushes new random character to guaranteedCharacters.
  if (hasSpecialCharacter) {
    chosenChar = chosenChar.concat(specialCharacter);
    guaranteedChar.push(
      specialCharacter[Math.floor(Math.random() * specialCharacter.length)]
    );
  }
  if (hasNumbers) {
    chosenChar = chosenChar.concat(numericCharacter);
    guaranteedChar.push(
      numericCharacter[Math.floor(Math.random() * numericCharacter.length)]
    );
  }
  if (hasLowerCase) {
    chosenChar = chosenChar.concat(lowerCase);
    guaranteedChar.push(lowerCase[Math.floor(Math.random() * lowerCase.length)]
    );
  }
  if (hasUpperCase) {
    chosenChar = chosenChar.concat(upperCase);
    guaranteedChar.push(upperCase[Math.floor(Math.random() * upperCase.length)]);
  }

  //For loop to iterate over the password length from the options object, selecting random indices from the array of possible characters and concatenating those characters into the result variable
  var randomChar = [];
  for (var i = 0; i < userNumCharacters; i++) {
    var index = Math.floor(Math.random() * chosenChar.length);
    randomChar.push(chosenChar[index]);
  }
  var replacedPosition = {};
  //While loop to ensure an index position that has already been replaced with a guaranteed character is not replaced with another guaranteed character.
  while (guaranteedChar.length > 0) {
    var replaceChar = Math.floor(Math.random() * randomChar.length);
    if (!replacedPosition[replaceChar]) {
      randomChar[replaceChar] = guaranteedChar.pop();
      replacedPosition[replaceChar] = true;
    }
  }
  return randomChar.join("");
}

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;
}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);

