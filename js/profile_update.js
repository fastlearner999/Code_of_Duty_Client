// ThiS JS FILE IS DESIGNED FOR:
// - profile_update.html

const API_URL_BASE = 'https://energize-code-of-duty.herokuapp.com';
const curPage = window.location.pathname;

// Check if no localstorage, kick user away
let userId = localStorage.getItem("uid");
if (userId === undefined || userId === null || userId === 0) {
	alert('Please login first');
	window.location.href = 'login.html';
}

if (curPage.includes('profile_update.html')) {
	async function getProfileById() {
        try{
            let url = `${API_URL_BASE}/user/${userId}`;
            const res1 = await fetch(url)
            const data = await res1.json();
            document.querySelector('#firstName').value = data.first_name;
            document.querySelector('#lastName').value = data.last_name;
            document.querySelector('#email').value = data.email;
            document.querySelector('#password1').value = data.password;
            document.querySelector('#password2').value = data.password;
            document.querySelector('#gender').value = data.gender;
            document.querySelector('#createDate').textContent = "Created Date: " + data.create_date;
            document.querySelector('#updateDate').textContent = "Updated Date: " + replaceNull(data.update_date);
			document.querySelector('#lastLogin').textContent = "Last Login: " + replaceNull(data.last_login);
        } catch(err) {
            return({message: err.message})
        }
    }
    getProfileById();

	const deleteProfileButton = document.querySelector('#deleteProfileButton');
    deleteProfileButton.addEventListener('click', ()=>deleteProfile());
    
    async function deleteProfile() {
        let confirmToDelete = confirm("Are you sure to delete?");
        if (confirmToDelete) {
            let goalId = getId();
            await fetch(`${API_URL_BASE}/user/${goalId}`, {		
                method: 'DELETE',
                headers: {
                    "Authorization": localStorage.getItem('token')
                }
            }).then((res) => {
                console.log(res);
                alert('Deleted');
            });
            window.location.replace(`./login.html`);
        } 
    }

	let userEditForm = document.querySelector("#edit-profile-form");
	userEditForm.addEventListener('submit', async (e)=>{
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

		let existUser = {
			id: localStorage.getItem("uid"),
			email: email,
			password: password1,
			first_name: first_name,
			last_name: last_name,
			gender: document.querySelector("#gender").value
		};
		const res = await fetch(API_URL_BASE + '/user', {		
			method: 'PUT',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				"Authorization": localStorage.getItem('token')
			},
			body: JSON.stringify(existUser)
		});
		const resBody = await res.json();
		if (resBody !== undefined && 'id' in resBody) {
			window.location.href = 'goals.html';
		}
	});
}

function replaceNull(val) {
    if (val === null) {
        return "";
    } 
    return val;
}