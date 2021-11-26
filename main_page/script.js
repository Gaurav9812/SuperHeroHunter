//fetching elements

var searchResult=document.getElementById('search-result');
var favButton=document.getElementById('fav');
var favourites={};
var xhrRequest=new XMLHttpRequest();

var input=document.getElementById("search");
input.addEventListener('keyup',makeRequest);

var characterfound;

// requesting api for data

function makeRequest(text)
{
    xhrRequest.abort();
    var toSearch=text.target.value;
   toSearch= toSearch.charAt(0).toUpperCase()+toSearch.substring(1,toSearch.length);
    xhrRequest.open('get','https://www.superheroapi.com/api.php/3153074811592519/search/'+toSearch,true);
    
    xhrRequest.send();
    
}

// if Request successfull

xhrRequest.onload=function(){

    var response=JSON.parse(xhrRequest.response);
    characterfound=response.results;
    
    var toSearch=input.value;
   toSearch= toSearch.charAt(0).toUpperCase()+toSearch.substring(1,toSearch.length);
   clearSearchResult();
   if(characterfound!=undefined)
        {   
            var obj=JSON.parse(localStorage.getItem("favourites"));
   if(obj!=null)
   { var keys=Object.keys(obj);
    for(let i=0;i<keys.length;i++)
    {
        if(favourites[keys[i]]==undefined)
        {
            favourites[keys[i]]=true;
        }
     }
    }
  
    displaySearchResult(toSearch);
 
            // addListenerToFav();
            
        }    
}
// displaying search result
  
function displaySearchResult(str)
{
    for(let i=0;i<characterfound.length;i++)
    {
        if(str==characterfound[i].name.substring(0,str.length))
        {
            // name
            var p=document.createElement('p');
            p.innerText=characterfound[i].name;
            p.classList.add('character-name');
            
            //image of character
            var img=document.createElement('img');
            img.setAttribute('src',characterfound[i].image.url);
            img.setAttribute('alt',"image of "+characterfound[i].name);
            img.classList.add('character-image');

            //detail button
            var getDetails=document.createElement('p');
            getDetails.innerText="Get Details";
            getDetails.classList.add('character-details');
            getDetails.style.cursor = "pointer";

            // adding listener to button
            getDetails.addEventListener('click',function(){
                localStorage.setItem("details", characterfound[i].id);
               location.href="./super_hero_page/index.htm" 
            })

            //favourite icon
            var fav=document.createElement('span');
            fav.innerHTML="<i class='fas fa-heart'></i>";
            fav.setAttribute('bool','false');
            if(favourites[characterfound[i].id])
            {
                fav.style.color="red";
            }
            
            //adding listener to favourite
            fav.addEventListener('click',function(){
                // favourites[characterfound[i].id]=!favourites[characterfound[i].id];
            
                if( favourites[characterfound[i].id])
                {
                    favourites[characterfound[i].id]=! favourites[characterfound[i].id];
                }
                if(favourites[characterfound[i].id]==undefined || favourites[characterfound[i].id])   
                   { 
                       this.style.color="red";
                        
                        favourites[characterfound[i].id]=true;
                       addingToLocal(); 
                    } else{
                        this.style.color="black";
                        delete favourites[characterfound[i].id];
                        addingToLocal();
                        
                    }
               }) ;

            fav.classList.add("fav-icon");
            

            //adding elements 
            var div=document.createElement('div');
            div.appendChild(p);
            div.appendChild(img);
            div.appendChild(fav);
            div.appendChild(getDetails);

            div.classList.add('character-div');
            searchResult.appendChild(div);

        }

    }
}

//clearing div

function clearSearchResult()
{
    var child=document.querySelectorAll('#search-result div');
    for(var i=0;i<child.length;i++)
    {
        searchResult.removeChild(child[i]);
    }
}

//event listener on favorite button
favButton.style.cursor = "pointer";
favButton.addEventListener('click',function(){
    
    var obj=JSON.parse(localStorage.getItem("favourites"));
   if(obj!=null)
   { var keys=Object.keys(obj);
    for(let i=0;i<keys.length;i++)
    {
        if(favourites[keys[i]]==undefined)
        {
            favourites[keys[i]]=true;
        }
     }
    }
 
    localStorage.setItem("favourites", JSON.stringify(favourites));
    location.href='./fav_page/Index.htm';
});

function addingToLocal()
{
    localStorage.setItem("favourites", JSON.stringify(favourites));
}