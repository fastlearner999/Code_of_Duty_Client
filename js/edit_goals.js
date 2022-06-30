const API_URL_BASE = 'https://energize-code-of-duty.herokuapp.com';
		
        
        let edit_Goal = {
			goal_name: document.querySelector("#goal_name").value,
			sport_type: document.querySelector("#sport-type").value,
			period: document.querySelector("#period").value,
			period_type: document.querySelector("#period_type").value,
			start_date: document.querySelector("#start_date").value,
			end_date: document.querySelector("#end_date").value,
			target_distance: document.querySelector("#distance").value,
			target_distance_unit: document.querySelector("#distance_unit").value,
		};
		const res = await fetch(`${API_URL_BASE}/goals`, {		
			method: 'PUT',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(edit_Goal)
		});
		const resBody = await res.json();
        console.log(resBody)
		if (resBody !== undefined && 'id' in resBody) {
			// window.location.href = 'goals.html';
		}
