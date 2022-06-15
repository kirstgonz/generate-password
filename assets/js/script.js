
//global variables to be used in password
var numbers = "1234567890"
var upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
var lower = "abcdefghijklmnopqrstuvwxyz"
var special = "!@#$%^&*'()~_"

//global variables to be utilized in the include function
var pwLength;

var hasNumbers;
var hasUpper;
var hasLower;
var hasSpecial;

var choices = "";

var passwordIsGenerated = false;

// Picking the length of the password
var length = function(){
  var pwLength = window.prompt("Pick a password length between 8-128 characters.");

  if (pwLength >= 8 && pwLength <= 128) {

    pwLength = Math.trunc(pwLength);

    var confirm = window.confirm("You picked " + pwLength + ". Are you sure this is the number of characters you want in your password?");
    
    if (confirm) {
      window.alert("Your password will have " + pwLength + " characters.");
      return pwLength
    } else {
      return length();
    }
  } else {
    window.alert("Invalid input! Please type a number between 8-128.");
    return length();
  }
}

//checking if person wants uppercase, lowercase, numbers, special by running var include function through this function
var conditions = function(check) {
  var yesOrNo = window.prompt("Do you want to include " + check + " in your password? Type '1' for YES or '2' for NO.")

  if (yesOrNo >= 1 && yesOrNo <= 2) {
    
    var confirm;
      
    if (yesOrNo == 1) {
      confirm = window.confirm("Are you sure you want to include " + check + " in your password?");
  
      if (confirm) {
        window.alert("Your password will include " + check + "!");

        return true;
      } else {
        return conditions(check);
      }
    } else if (yesOrNo == 2) {
      confirm = window.confirm("Are you sure you do NOT want " + check + " in your password?");
  
      if (confirm) {
        window.alert("Your password will NOT include " + check + "!");

        return false;
      } else {
        return conditions(check);
      }
    } else {
      window.alert("Please only whole numbers!");
      return conditions(check);
    }
  } else {
    window.alert("Please provide a valid answer.");
    return conditions(check);
  }
}

//function that is run through conditions to ensure if person wants uppercase, lowercase, letters, special
var include = function() {

  pwLength = length();

  hasNumbers = conditions("numbers");

  hasUpper = conditions("uppercase letters");

  hasLower = conditions("lowercase letters");

  hasSpecial = conditions("special characters");

  if (!hasLower && !hasUpper && !hasLower && !hasSpecial){
    window.alert("You need to pick at least one valid option for your password!");

    return include();
  }
};

//combines all of the choices made from var include function
var combiningHas = function() { 
  include();

  if (hasNumbers) {
    choices = choices.concat(numbers)
  };
  if (hasUpper) {
    choices = choices.concat(upper)
  };
  if(hasLower){
    choices = choices.concat(lower)
  };
  if(hasSpecial){
    choices = choices.concat(special)
  }

  choices = choices.split('');
};

//randomizes the choices made and generates password
var generatePassword = function() {
  var password = ""
  for (var i = 0; i < pwLength; i++){
    var randomize = choices[Math.floor(Math.random() * choices.length)];
    password = password.concat(randomize);
  } 
  passwordIsGenerated = true;
  return password; 
}

// Get references to the #generate element
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;
}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);


combiningHas();