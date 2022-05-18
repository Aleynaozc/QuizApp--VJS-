const openModalButton=document.querySelector('#userIcon');
const signInModalButton=document.querySelector('#signIn');
const signUpModalButton=document.querySelector('#signUp');
const signInSignUpModal=document.querySelector('#signInSignUpModal');
const signInOpenModal=document.querySelector('#signInModal');
const signUpOpenModal=document.querySelector('#signUpModal');
const signInSignUpButton=document.querySelector('.signIn_signUp-form');
const signInButton=document.querySelector('#signinbutton');
const signUpButton=document.querySelector('#signupbutton');
const backPage=document.getElementById('backPage')



//OPEN SIGN IN AND SIGN UP MODAL
const openModal =()=>{
    signInSignUpModal.classList.toggle("show");
    signInSignUpModal.classList.toggle('height-animation');
    signInButton.style.display='block';
    signUpButton.style.display='block';
    backPage.style.display='block';
    
}
openModalButton.addEventListener('click', openModal);

//BUTTON DISABLED
const buttonNone=()=>{
    signInSignUpButton.style.display="none";
 }
//OPEN SIGN IN MODAL
const OpenSignInModal=()=>{
    signInOpenModal.classList.add("show");
} 
const SignInanimationOfButton =()=>{
    signInButton.classList.add('button-animation');
    signUpButton.classList.add('button-animation');
    setTimeout(buttonNone,600);
    setTimeout(OpenSignInModal,300);
   
}
signInModalButton.addEventListener('click', SignInanimationOfButton);



//OPEN SIGN UP MODAL
const OpenSignUpModal=()=>{
    signUpOpenModal.classList.add("show");
}
const SignUpanimationOfButton =()=>{
    signInButton.classList.add('button-animation');
    signUpButton.classList.add('button-animation');
    setTimeout(buttonNone,600);
    setTimeout(OpenSignUpModal,550);
}
signUpModalButton.addEventListener('click', SignUpanimationOfButton);

const backPageButton =()=>{
    signInSignUpModal.classList.remove('height-animation');
        signInSignUpModal.classList.add('closeModal-animation');
        signInButton.style.display='none';
        signUpButton.style.display='none';
        backPage.style.display='none';
        setTimeout(removeModal,700);

}
const removeModal=()=>{
    signInSignUpModal.classList.remove('show');
    
}
backPage.addEventListener('click',backPageButton);