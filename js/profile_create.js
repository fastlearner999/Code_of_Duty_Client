// ThiS JS FILE IS DESIGNED FOR:
// - profile_create.html

const API_URL_BASE = 'https://energize-code-of-duty.herokuapp.com';
const curPage = window.location.pathname;
if (curPage.includes('profile_create.html')) {
	let userSignUpForm = document.querySelector("#sign-up-form");
	userSignUpForm.addEventListener('submit', async (e)=>{
		e.preventDefault();
	
		let first_name = document.querySelector("#firstname").value;
		if (first_name.length < 2) {
			alert('Your first name is too short.');
			return;
		}

		let last_name = document.querySelector("#lastname").value;
		if (last_name.length < 2) {
			alert('Your last name is too short.');
			return;
		}

		let email = document.querySelector("#email").value;
		if (!email.toLowerCase()
		.match(
		  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
		)) {
			alert('Please input a valid email format.');
			return;
		}

		if (email.length < 9) {
			alert('Your email is too short.');
			return;
		}
	
		let password1 = document.querySelector("#password1").value;
		let password2 = document.querySelector("#password2").value;
		if (password1.length < 8) {
			alert('Your password is too short.');
			return;
		}

		if (password1 !== password2) {
			alert('Your password is not match.');
			return;
		}
	
		let agree = document.querySelector("#agree").checked;
		if (!agree) {
			alert('You must agree the terms & conditions.');
			return;
		}
		
		let newUser = {
				email: email,
				password: password1,
				first_name: first_name,
				last_name: last_name,
				gender: document.querySelector("#gender").value
			};
		const res = await fetch(API_URL_BASE + '/user', {		
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(newUser)
		});
		const resBody = await res.json();
		if (resBody !== undefined && 'id' in resBody) {
			window.location.href = 'goals.html';
		}
	});
}