const section = document.querySelector('.section');
const playerLiveCount = document.querySelector('.playerLiveCount');
let playerLive = 6;

playerLiveCount.innerText = playerLive;

//Array of images

const getData = () => { 

	let arrayImages =  [

 {imgSrc:"./image/javascript.png", name:"javascript"},
 {imgSrc:"./image/php.png", name:"php"},
 {imgSrc:"./image/html.png", name:"html"},
 {imgSrc:"./image/python.png", name:"python"},

 {imgSrc:"./image/javascript.png", name:"javascript"},
 {imgSrc:"./image/php.png", name:"php"},
 {imgSrc:"./image/html.png", name:"html"},
 {imgSrc:"./image/python.png", name:"python"},

 {imgSrc:"./image/javascript.png", name:"javascript"},
 {imgSrc:"./image/php.png", name:"php"},
 {imgSrc:"./image/html.png", name:"html"},
 {imgSrc:"./image/python.png", name:"python"},

 {imgSrc:"./image/javascript.png", name:"javascript"},
 {imgSrc:"./image/php.png", name:"php"},
 {imgSrc:"./image/html.png", name:"html"},
 {imgSrc:"./image/python.png", name:"python"},

];

return arrayImages;

}

//to randomize array object

const randomize = () =>{

	const dataRandom = getData();

	dataRandom.sort(() => Math.random() - 0.5);

	return dataRandom;
} 


//appending data to html dom.

const dataGenerator = ()=>{

	let dataGen = randomize();

	dataGen.forEach((item, index) => {

		const card = document.createElement('div');
		const face = document.createElement('img');
		const back = document.createElement('div');

		card.classList.add('card');
		face.classList.add('face');
		back.classList.add('back');

		//appending data img src to the face. and name to card
		face.setAttribute('src', item.imgSrc);
		card.setAttribute('name', item.name);

		//attch card to section
		section.append(card);
        card.append(face);
        card.append(back);

        card.addEventListener('click', (e)=>{

        	card.classList.toggle('toggleCards'); //animation on click

           checkcards(e); // function for checking n comparing cards.

        });//add event end

	});// loop ends
};

//checkcards for determining two selected cards

const checkcards = (e) =>{
    //this for target card
	const clickedCard = e.target;
	clickedCard.classList.add('flipped');

	//this for selecting two flipped cards
    const flippedCards = document.querySelectorAll('.flipped');//creates an array of elements
    const toggleCards = document.querySelectorAll('.toggleCards');

    console.log(flippedCards);	
	//logic for checking or comparing

	if(flippedCards.length === 2){

		if(flippedCards[0].getAttribute('name') === flippedCards[1].getAttribute('name')){

			console.log('match');

          //looping through the array of flipped cards to remove the flipped class
            flippedCards.forEach((card)=>{

               card.classList.remove('flipped');
               card.style.pointerEvents = 'none';

            }) 
             


		}else{

			console.log('not match');


           //loop through array of flippedcards
			flippedCards.forEach(card=>{
           
               //remove the flipped class from both cards
				card.classList.remove('flipped'); 


                //create function to remove the toggle animation class
				function removeToggle(){

					card.classList.remove('toggleCards');
				}
                
                // A timeout delay to turn back the cards.
				setTimeout(removeToggle, 900);

			});


            //if failed player lives reduces and updates theo counter  
			playerLive --;

			playerLiveCount.innerText = playerLive;


            //reset if loose  
			if(playerLive === 0){
             
              restart("you lost try again");

			}

		}
	}

if(toggleCards.length === 16){
	restart("great winner");
}

};



//reset function

const restart = (text) =>{
	let cardData = randomize();
	let faces = document.querySelectorAll('.face');
	let cards = document.querySelectorAll('.card');
	section.style.pointerEvents = 'none';

//loop through the array of cards and remove toggle class
	cardData.forEach((item, index) =>{
		cards[index].classList.remove('toggleCards');

		setTimeout(()=>{
		 cards[index].style.pointerEvents = 'all';
		 faces[index].setAttribute('src', item.imgSrc);
		 cards[index].setAttribute('name', item.name);
		 section.style.pointerEvents = 'all';
		}, 100);

	});

//set playerlives back to original
playerLive = 6;
playerLiveCount.innerText = playerLive;

setTimeout(()=>window.alert(text), 100);

}


dataGenerator();
