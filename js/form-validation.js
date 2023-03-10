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
  1: {
    color: '#ACADA8',
    msg: "Too short"
  },
  2: {
    color: '#C92E28',
    msg: "weak"
  },
  3: {
    color: '#F1C74F',
    msg: "Fair"
  },
  4: {
    color: '#7A9CBF',
    msg: "Good"
  },
  5: {
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
    /^(?=.{2,50}$)^[a-zA-Z.!#$%&???*+/=?^_ `{|}~-]*$/,
    'First name is invalid. Only letters, spaces and hyphen are allowed'
  );
}

const check_last_name = () => {
  return check_input(
    inputLastName,
    spanLastName,
    /^(?=.{2,50}$)^[a-zA-Z.!#$%&???*+/=?^_ `{|}~-]*$/,
    'Last name is invalid. Only letters, spaces and hyphen are allowed'
  );
}

const check_email = () => {
  return check_input(
    inputEmail,
    spanEmail,
    /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
    'Email is invalid'
  );
}

const check_phone = () => {
  return check_input(
    inputPhone,
    spanPhone,
    // /\(?([0-9\(-)]{3})\)?([ .-]?)([0-9-]{3})\2([0-9-]{4})/,
    /\(?([0-9\(-)])/,
    'Phone number is invalid. Only numbers, spaces and hyphen are allowed'
  );
}

const setPassWordStrenght = () => {
  let score = 0;
  let passwd =  inputPwd.value;

  change_input_display(inputPwd,spanPsw, "")

  if (passwd.length > 0 && passwd.length <= 25 ) {
    if( /[`??!@#$%??&*()_\-\\ \^ \$\*\+\?\.\(\)\|\{\}\[\]]/.test(passwd)) score ++;
    if (/[a-z]/.test(passwd)) score ++;
    if (/[A-Z]/.test(passwd)) score ++;
    if (/[0-9]/.test(passwd)) score ++;
    if (passwd.length > 8)score ++;
    if (passwd.length > 10)score ++;

    pswStrength.style.visibility = "visible";
    pswStrengthMsg.style.visibility = "visible";

    pswStrengthMsg.innerText = LEVELS[score].msg;
    pswStrengthMsg.style.color = LEVELS[score].color;
  } else {
    pswStrengthMsg.style.visibility = "hidden";
    pswStrength.style.visibility = "hidden";
  }


  return score > 2 ?  true : false;
}

const check_password = () => {
  let isPwdValid = true;
  let passwd =  inputPwd.value;
  if (!passwd){
    change_input_display(inputPwd,spanPsw,"Password is required.")
    return false
  }
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
  
  if (okProceed)
    myForm.submit();

});


inputFirstName.addEventListener('blur', check_first_name);
inputLastName.addEventListener('blur', check_last_name);
inputEmail.addEventListener('blur', check_email);
inputPhone.addEventListener('blur', check_phone);
inputPwd.addEventListener('keyup', setPassWordStrenght );
inputPwd.addEventListener('blur', setPassWordStrenght );
inputPwdConfirm.addEventListener('blur', check_password );
