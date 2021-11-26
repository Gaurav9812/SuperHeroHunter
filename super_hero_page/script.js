//fetching elements
var superHeroId=JSON.parse(localStorage.getItem("details"));
var xhrRequest=new XMLHttpRequest();
var main=document.getElementById('main-container');
var mainHeading=document.getElementById('main-heading');
console.log(superHeroId);

//superhero id if not null sending request to api for data 

if(superHeroId!=null)
{   console.log(superHeroId);
    xhrRequest.open('get','https://www.superheroapi.com/api.php/3153074811592519/'+superHeroId,true);
    xhrRequest.send();
}
else{
    var elseH=document.getElementById('else-heading');
    elseH.innerHTML="I wonder how u get it till  here";
}
    
// if( request ) is successfull
 
xhrRequest.onload=function()
{
    var response=JSON.parse(xhrRequest.response);
    
    //heading of page
    mainHeading.innerHTML=response.name;
    
    // adding image 
    var imgDetails=document.createElement('div');
    imgDetails.classList.add('image-details');
    var img=document.createElement('img');
    
    img.setAttribute('src',response.image.url);
    //add class of image

    main.appendChild(img);
   
    //displaying details of character

    var details=document.createElement('div');
    details.classList.add('details-div');
    // var p=document.createElement('p');

    //BIOGRAPHY

    var biography=response.biography;
    for(let bio in biography)
    {
        let p=document.createElement('p');
        p.classList.add('detail');
        p.innerHTML="<span>"+bio+"</span><span> :</span><span>"+biography[bio]+"</span>";
        details.appendChild(p);
    }

    //APPERANCES
    var appearance=response.appearance;
    for(let bio in appearance)
    {
        let p=document.createElement('p');
        p.classList.add('detail');
        p.innerHTML="<span>"+bio+"</span><span> :</span><span>"+appearance[bio]+"</span>";
        details.appendChild(p);
    }
    imgDetails.appendChild(img);
    imgDetails.appendChild(details);
    main.appendChild(imgDetails);
    
    //adding elements to div
    var powerStatDiv=document.createElement('div');
    var powerstats=response.powerstats;
    powerStatDiv.classList.add('power-stat-div-outer');
    

    //powerstats Heading
    var powerStatDivHeading=document.createElement('h1');
    powerStatDivHeading.innerHTML="Power Stats";
    powerStatDiv.appendChild(powerStatDivHeading);
    
    
    //powerstat levels
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
    main.appendChild(powerStatDiv);

}
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


