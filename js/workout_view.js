// ThiS JS FILE IS DESIGNED FOR:
// - workouts.html
// - view_workout.html

const API_URL_BASE = 'https://energize-code-of-duty.herokuapp.com';
const curPage = window.location.pathname;


if (curPage.includes('workouts.html')) {
    async function getAllWorkouts() {
        try{
            let url = `${API_URL_BASE}/workout`;
            const response = await fetch(url)
            const data = await response.json();
            data.forEach(workout => {
                const listTag = document.querySelector('#workout_list');
    
                // creating goals card
                const div = document.createElement('div')
                const title = document.createElement('h4')
                title.textContent = workout.sport_type + ' / ' + workout.start_time + ' / ' + workout.end_time + ' / ' + workout.break_duration + ' / ' + workout.total_distance + ' / ' + workout.total_distance_unit;
                
                // styling created elements
                div.classList = 'goal-div'
                title.classList = 'goal-title'
                
                
                div.appendChild(title);
                
                listTag.appendChild(div);
                
                div.addEventListener('click', ()=>{
                    window.location.replace(`./view_workout.html?id=${workout.id}`);
                })
            });
    
    
        }catch(err){
            return({message: err.message})
        }
    }
    
    getAllWorkouts();
}

if (curPage.includes('view_workout.html')) {

}