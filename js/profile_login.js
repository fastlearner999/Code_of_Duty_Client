// ThiS JS FILE IS DESIGNED FOR:
// - login.html

const API_URL_BASE = 'https://energize-code-of-duty.herokuapp.com';
const curPage = window.location.pathname;
if (curPage.includes('login.html')) {
	let userLoginForm = document.querySelector("#login-form");
	userLoginForm.addEventListener('submit', async (e)=>{
		e.preventDefault();

		let email = document.querySelector("#email").value;
		let password = document.querySelector("#password").value;

		let newLogin = {
			email: email,
			password: password
		};
		const res = await fetch(API_URL_BASE + '/user/login', {		
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(newLogin)
		});
		const resBody = await res.json();
		if (resBody !== undefined && 'token' in resBody) {
			// Store localStorage
        	const payload = jwt_decode(resBody.token);
			localStorage.setItem('token', resBody.token);
			localStorage.setItem('uid', payload.id);
			window.location.href = 'goals.html';
		}
	});
}