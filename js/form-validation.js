const myForm = document.getElementById("myForm");
const inputFirstName = document.getElementById("f-name");
const spanFirstName = document.getElementById("first-name-error");
const inputLastName = document.getElementById("l-name");
const spanLastName = document.getElementById("last-name-error");
const inputEmail = document.getElementById("email");
const spanEmail = document.getElementById("email-error");
const inputPhone = document.getElementById("phone");
const spanPhone = document.getElementById("phone-error");
const inputPwd = document.getElementById("password");
const spanPsw = document.getElementById("password-error");
const inputPwdConfirm = document.getElementById("c-password");
const spanPwdConfirm = document.getElementById("password-error");
const pswStrength = document.getElementById("pwd_strength");
const pswStrengthMsg = document.getElementById("pwd_strength_msg");

const LEVELS = {
  0: {
    color: '#E0E0DE',
    msg: "Too short"
  },
  1: {
    color: '#C92E28',
    msg: "weak"
  },
  2: {
    color: '#F1C74F',
    msg: "Fair"
  },
  3: {
    color: '#7A9CBF',
    msg: "Good"
  },
  4: {
    color: '#1F6C1E',
    msg: "Strong"
  }
}

const validar = (e) => {
  e = e || window.event;
  let target = e.target || e.srcElement;
  console.log(target.id);
}

const change_input_display = (input, span, errorMsg) => {
  if (errorMsg) {
    span.innerText = errorMsg;
    input.classList.add('input_invalid');
    input.classList.remove('input_valid');
    span.style.visibility = "visible";
  } else {
    span.style.visibility = "hidden";
    input.classList.add('input_valid');
    input.classList.remove('input_invalid');  
  }
}

const check_input = (input, span, regex, errorMsg) => {
  if (!regex.test(input.value)) {
    change_input_display(input, span, errorMsg);
    return false;
  }
  change_input_display(input, span, "");
  return true;
}

const check_first_name = () => {
  return check_input(
    inputFirstName,
    spanFirstName,
    /^(?=.{3,50}$)^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]*$/,
    'First name is invalid'
  );
}

const check_last_name = () => {
  return check_input(
    inputLastName,
    spanLastName,
    /^(?=.{3,50}$)^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]*$/,
    'Last name is invalid.'
  );
}

const check_email = () => {
  return check_input(
    inputEmail,
    spanEmail,
    /^(?=.{0,100}$)^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
    'Invalid is email'
  );
}

const check_phone = () => {
  return check_input(
    inputPhone,
    spanPhone,
    /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/,
    'Phone is invalid'
  );
}

const setPassWordStrenght = () => {
  let score = 0;
  let passwd =  inputPwd.value;

  change_input_display(inputPwd,spanPsw, "")

  if (passwd.length > 5 && passwd.length <= 25 ) {
    if( /[`˜!@#$%ˆ&*()_\-\\ \^ \$\*\+\?\.\(\)\|\{\}\[\]]/.test(passwd)) score ++;
    if (/[a-z]/.test(passwd)) score ++;
    if (/[A-Z]/.test(passwd)) score ++;
    if (/[0-9]/.test(passwd)) score ++;

    pswStrength.style.visibility = "visible";
    pswStrengthMsg.style.visibility = "visible";
  } else {
    pswStrengthMsg.style.visibility = "hidden";
    pswStrength.style.visibility = "hidden";
  }

  pswStrengthMsg.innerText = LEVELS[score].msg;
  pswStrengthMsg.style.color = LEVELS[score].color;

  return score > 2 ?  true : false;
}

const check_password = () => {
  let isPwdValid = true;
  if (!setPassWordStrenght()) {
    change_input_display(inputPwd,spanPsw,"Password strength should be good or strong.")
    isPwdValid = false;
  } else {
    change_input_display(inputPwd, spanPsw, " ")
      
    if ( inputPwd.value !== inputPwdConfirm.value ) {
      change_input_display(inputPwd,spanPsw, "Passwords do not match.")
      change_input_display(inputPwdConfirm, spanPwdConfirm, "Passwords do not match.")
      isPwdValid = false;
    } else {
      change_input_display(inputPwd, spanPsw, "")
      change_input_display(inputPwdConfirm, spanPwdConfirm, "")    
    }
  }  
  return isPwdValid;
}


myForm.addEventListener('submit', (e) => {
  let okProceed = true;
  e.preventDefault();

  if (!check_first_name()) okProceed = false;
  if (!check_last_name()) okProceed = false;
  if (!check_email()) okProceed = false;
  if (!check_phone()) okProceed = false;
  if (!check_password()) okProceed = false;
  
  return false;
});


inputFirstName.addEventListener('blur', check_first_name);
inputLastName.addEventListener('blur', check_last_name);
inputEmail.addEventListener('blur', check_email);
inputPhone.addEventListener('blur', check_phone);
inputPwd.addEventListener('keyup', setPassWordStrenght );
inputPwd.addEventListener('blur', setPassWordStrenght );
inputPwdConfirm.addEventListener('blur', check_password );
