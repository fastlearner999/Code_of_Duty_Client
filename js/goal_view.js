const API_URL_BASE = 'https://energize-code-of-duty.herokuapp.com';

const curPage = window.location.pathname;

async function fetchAllGoalsByUser(userId){
    
    try{
        let url = `${API_URL_BASE}/goal/user/${userId}`
        
        let userId = localStorage.getItem("uid");
        // habits/user/userId
        const response = await fetch('https://energize-code-of-duty.herokuapp.com/goal')
        const data = await response.json()
        console.log(data)
        
        data.forEach(element => {
            // grab div with id = goals_insert
            const goals_insert = document.querySelector('#goals_insert')

            // creating goals card
            const goal_div = document.createElement('div')
            const goal_title = document.createElement('h4')

            // set created elements attributes/text conent
            goal_title.textContent = element.goal_name
            
            // styling created elements
            goal_div.classList = 'goal-div'
            goal_title.classList = 'goal-title'
            
            
            goal_div.appendChild(goal_title)
            
            goals_insert.appendChild(goal_div)  
            
            goal_div.addEventListener('click', ()=>{
                window.location.replace(`./view_goal.html?id=${element.id}`);
            })
        });


    }catch(err){
        return({message: err.message})
    }
}

fetchAllGoalsByUser()
