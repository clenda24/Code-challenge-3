let films = "http://localhost:3000/films"
      document.addEventListener('DOMContentLoaded', async(event)=>{
          const films = await showFiles()
           viewMoviePoster(films)
           
      })
movieTitles()
      function showFiles() {
          return fetch("http://localhost:3000/films",{
              method:"GET",
              headers:{
                  "Content-Type": "application/json",
                  "Accept": "application/json"
              },
          }
          )
              .then(res => res.json())
              .then(films => films)
      }
      
      const ul = document.getElementById("films")
      function movieTitles() {
          return fetch("http://localhost:3000/films")
          .then(res => res.json())
          .then(title => title.map(movie => {
            let li = document.createElement("li");
            li.innerHTML = `
            <div>
            <h3 id="${movie.id}"class="movies">${movie.title}</h3> 
            </div>`
            ul.appendChild(li)
            ul.addEventListener('click', (e)=>{
                document.getElementById('title').textContent = (e.target.textContent)
                
                 })
          }))
      }

    
      function viewMoviePoster(films){
        const photo = document.querySelector('#photo')
        const band = document.createElement('div')
       const view = document.querySelectorAll(".movies")
       view.forEach(movieposters =>{
        movieposters.addEventListener('click',(event)=>{
          //console.log(event.target.id)
          const foundfilm = films.find((element)=>element.id === event.target.id)
          band.innerHTML =`
          <img src=${foundfilm.poster}>`
          photo.appendChild(band)
        })
       })
      }
//active Ticket purchasing button
document.addEventListener("DOMContentLoaded", function() {
    const BuyTicket = document.getElementById("buy-ticket");
    const ticketnum = document.getElementById("ticket-num")
    BuyTicket.addEventListener("click",() =>{

        //sending a get request to the backend to enable one to purchase a ticket using fetch
         fetch("buy-ticket",{
            method:"POST"
        })
        .then(res =>res . json())
        .then(data => {

            //displaying the new available tickets
            ticketnum.textContent = data.Availabletickets;

            //if showing is sold out,display a message and disable the buy tickets button
            if(data.Availabletickets === 0){
                BuyTicket.disabled =true;
                alert("Sorry,this showing is sold out");
            }
        })
        .catch(error =>{
            console.log("Error purchasing ticket:",
           error);
        });
    });
  });
  function setUpMovieDetails(childMovie){
    const preview=document.getElementById('poster')
    preview.src=childMovie.poster;

    document.getElementById('title').textContent=childMovie.title;
    document.getElementById('runtime').textContent=`${childMovie.runtime} minutes`;
    document.getElementById('film-info').textContent=childMovie.description;
    document.getElementById('showtime').textContent=childMovie.showtime;
    document.getElementById('ticket-num').textContent=childMovie.capacity -childMovie.tickets_sold;
  }
const btn =document.getElementById('buy-ticket');
btn.addEventListener('click',function(e){
    let remtickets=parseInt(document.querySelector('#ticket-num').textContent,10);
    e.preventDefault();
    if (remtickets > 0){
        document.querySelector('#ticket-num').textContent=remtickets -1;

    }else{
        btn.textContent='Sold Out';
    }
});