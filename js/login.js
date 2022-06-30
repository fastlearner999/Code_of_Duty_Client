document.getElementById("btnone").addEventListener("click", myFunction);
  function myFunction() {
    window.location.href="login.html";
  }

let userForm = document.querySelector("#form");
userForm.addEventListener('submit', async (e)=>{

	// Send the API request to create user
	e.preventDefault();
	
	
	let input = {
			email: document.getElementById("email").value,
			password: document.getElementById("password").value,
			first_name: document.querySelector("#firstname").value,
			last_name: document.querySelector("#lastname").value,
			gender: 'M'
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

	console.log('>>>>' + responseBody);
	

});