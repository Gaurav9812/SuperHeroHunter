//fetching elements
var favourites={};
var obj=JSON.parse(localStorage.getItem("favourites"));
var xhrRequest=new XMLHttpRequest();
var list=document.getElementById('favourite-characters');
var favoritesfound;

//requesting api for data 
function getFavourites(obj){
if(Object.keys(obj).length!=0)
   {favourites=obj;
        var keys=Object.keys(favourites);
    
    let i=0;
    var interval=setInterval(() => {
        if(i==keys.length)
        {
            clearInterval(interval);
        }
        console.log(keys[i]);
        
        xhrRequest.open('get','https://www.superheroapi.com/api.php/3153074811592519/'+parseInt(keys[i]),false);
        xhrRequest.send();
        ++i;
          
    }, );
      
 }else{
     var head=document.getElementById('else-heading');
    head.innerHTML="NO FAVOURITES TRY TO ADD SOME";

 }
}
getFavourites(obj);    
//if request successfull
    xhrRequest.onload=function(){

        var response=JSON.parse(xhrRequest.response);
        console.log(response);
        
        //Character name
        var div=document.createElement('div');
        var p=document.createElement('p');
        p.innerText=response.name;
        p.classList.add('character-name');
        
        //Character image
        var img=document.createElement('img');
        img.setAttribute('src',response.image.url);
        img.setAttribute('alt',"image of "+response.name);
        img.classList.add('character-image');
        var li=document.createElement('li');
        li.setAttribute('id',response.id);
        console.log(response.name)
        div.appendChild(p);
        div.appendChild(img);
        li.appendChild(div);

       // powerstats div 
        var powerStatDiv=document.createElement('div');
        var powerstats=response.powerstats;
        powerStatDiv.classList.add('power-stat-div-outer');
        
        li.appendChild(powerStatDiv);
        for(let i in powerstats)
        {
            var powerDiv=document.createElement('div');
            powerDiv.innerHTML=i+"-"+powerstats[i];
            var powerLevelDiv=document.createElement('div');
            // to add class
            powerDiv.classList.add('powerLevel-outer-div');
            powerLevelDiv.classList.add('powerLevel');
               powerDiv.appendChild(powerLevelDiv);

            var level=document.createElement('div');
            powerLevelDiv.appendChild(level);
            level.classList.add('level');
        
            fillbar(level,powerstats[i]);

          
             powerStatDiv.appendChild(powerDiv);

        }
        var removeFromFav=document.createElement('button');
        removeFromFav.innerHTML="Remove from fav";
        removeFromFav.classList.add('favButton');

        //details button
        var getDetails=document.createElement('button');
        getDetails.innerHTML="more-details";
        getDetails.classList.add('favButton');
        getDetails.classList.add('details');
        getDetails.addEventListener('click',function(){
            localStorage.setItem("details", response.id);
               location.href="../super_hero_page/index.htm" 
        });

        //removing from favourite
        removeFromFav.addEventListener('click',function(){
            delete favourites[response.id];
            var liElem=document.querySelectorAll('li');
            for(let i=0;i<liElem.length;i++)
            {
                if(liElem[i].getAttribute('id')==response.id)
                {
                    liElem[i].remove();
                }
            }
            localStorage.setItem("favourites", JSON.stringify(favourites));
            // getFavourites(favourites);
        });

        powerStatDiv.appendChild(removeFromFav);

        powerStatDiv.appendChild(getDetails);

        //filling bars according to num 
        function fillbar(level,end)
        {
            let j=0;
            let interval=setInterval(function(){
                   level.style.width=(++j)+'%';
                   
                   if(end+'%'==level.style.width)
                   {
                       console.log("hello");
                       clearInterval(interval);
                   }
            },10);   
        }











        list.appendChild(li);
    }    
    
   