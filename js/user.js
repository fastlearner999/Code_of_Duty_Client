const curPage = window.location.pathname;
if (curPage.includes('create_profile.html')) {
	let userSignUpForm = document.querySelector("#sign-up-form");
	userSignUpForm.addEventListener('submit', async (e)=>{
		e.preventDefault();
	
		let email = document.querySelector("#email").value;
		if (!email.toLowerCase()
		.match(
		  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
		)) {
			alert('Please input a valid email format.');
			return;
		}
	
		let password1 = document.querySelector("#password1").value;
		let password2 = document.querySelector("#password2").value;
		if (password1 !== password2) {
			alert('Your password is not match.');
			return;
		}
	
		let agree = document.querySelector("#agree").checked;
		if (!agree) {
			alert('You must agree the terms & conditions.');
			return;
		}
		/*
		let input = {
				email: email,
				password: document.querySelector("#password").value,
				first_name: document.querySelector("#firstname").value,
				last_name: document.querySelector("#lastname").value,
				gender: document.querySelector("#gender").value
			};
		const res = await fetch('https://energize-code-of-duty.herokuapp.com/user', {		
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(input)
		});
		const responseBody = await res.json();
		*/
	});
}


if (curPage.includes('login.html')) {
	let userLoginForm = document.querySelector("#login-form");
	userLoginForm.addEventListener('submit', async (e)=>{
		e.preventDefault();
	});
}






/*
document.getElementById("btnone").addEventListener("click", myFunction);
  function myFunction() {
    window.location.href="login.html";
  }
*/