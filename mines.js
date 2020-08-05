let width = 10;
let bomb = 20;
let count=0
let root = document.querySelector(".root");
let validArray= Array(width*width-bomb).fill("valid");
let bombArray= Array(bomb).fill("bomb");
let gameArray=validArray.concat(bombArray);
let mixArray= gameArray.sort(()=>{return Math.random()-0.5})
let isGameOver=false;

// creation of div
function div(e){
    if(count>0){
        let validArray= Array(width*width-bomb).fill("valid");
        let bombArray= Array(bomb).fill("bomb");
        let gameArray=validArray.concat(bombArray);
        let mixArray= gameArray.sort(()=>{return Math.random()-0.5})
        for(let i=0;i<width*width;i++){
            let x=document.createElement("div");
            x.setAttribute('id',i)
            x.className=mixArray[i];
            root.appendChild(x);}
            addNumber( mixArray);
            event(mixArray);
    }
    else{
        for(let i=0;i<width*width;i++){
            let x=document.createElement("div");
            x.setAttribute('id',i)
            x.className=mixArray[i];
            root.appendChild(x);
        }
        
    }

    
    count++;
}
div();


//events
function event(mixArray){
    
for(let i=0;i<width*width;i++){
    let y=document.getElementById(i);
     y.addEventListener('click',(e)=>{
        console.log(e)
        if(e.ctrlKey){
            console.log('flag');
            flag(y);
        }
        else if(mixArray[i]=='bomb'){
            bombfun(mixArray);
        }
        else{
            check(y,mixArray);
        }
    })
 }
}
 event(mixArray);
 // add number

 function addNumber(mixArray){
    /*  console.log(mixArray) */
     
        for(let i=0;i<100;i++){
            let current = document.getElementById(i)
            //console.log(current)
            let total=0;
            let isLeft=(i%10===0);
            let isRight=(i%10===9);
            let classDown=mixArray[i+width];
            let classUp=mixArray[i-width];
            let classRight=mixArray[i+1];
            let classLeft=mixArray[i-1];
            let classNw=mixArray[i-width-1];
            let classNe=mixArray[i-width+1];
            let classSw=mixArray[i+width-1];
            let classSe=mixArray[i+width+1];
            if(classDown==='bomb'&& current.className!='bomb') total++
            if(classUp==='bomb'&& current.className!='bomb')total++
            if(!isRight&&classRight==='bomb'&& current.className!='bomb')total++
            if(!isLeft&&classLeft==='bomb'&& current.className!='bomb')total++
            if(i>9&&!isLeft&&classNw==='bomb'&& current.className!='bomb')total++
            if(i>9&&!isRight&&classNe==='bomb'&& current.className!='bomb')total++
            if(i<89&&!isLeft&&classSw==='bomb'&& current.className!='bomb')total++
            if(i<89&&!isRight&&classSe==='bomb'&& current.className!='bomb')total++

            if(mixArray[i]!='bomb'){
                 
                current.setAttribute('data',total);
                  
            }
         
        }
}
addNumber(mixArray);

//display
/* function display(x,mixArray){
    x.classList.add('checked'); 
    x.innerHTML=x.getAttribute('data'); 
    //x.style.background="#ccc";
    //console.log(x)
    check(x,mixArray);
}
 */
//reset
document.querySelector('.btn').addEventListener('click',()=>{

     reset();
    // div();
}) 

function bombfun(mixArray){
     mixArray.forEach((element,index)=> {
         if(element=='bomb'){
             let x= document.getElementById(index);
             let img= document.createElement('img');
             img.src="bomb.jpg"
             x.appendChild(img);
             //x.innerText="b"
         }
     });
    UI(0);
     
}

function flag(y){
            
           /*   let img= document.createElement('img');
             img.src="bomb.jpg" */
             if(y.classList.contains('flaged')){
                    y.classList.remove('flaged');
                    y.firstElementChild.remove();
                     
             }
             else{ 
                 
                 let a= document.createElement('img');
                a.src='flag.jpg'
                y.appendChild(a);
                y.classList.add('flaged');
            }
            
            
             
}



//reset
function reset(){
    for(let i=0;i<100;i++){
        let a= document.getElementById(i);
       /*  a.innerHTML='';
        a.style.backgroundColor="green" */
        a.remove();
       
    } 
    div();
}

// UI
function UI(a){
   
    let x= document.querySelector('body');
    let y= document.createElement('h5');
    let z=document.querySelector('.btn')
    if(a==0){y.textContent='GAME OVER';}
    else{y.textContent='WINNER WINNER CHICKEN DINNER';}
    
     
    //x.appendChild(y);
       x.insertBefore(y,z);
    setTimeout(()=>{ 
        document.querySelector('h5').remove();
       reset();
    },3000)
}

//check
function check(x,mixArray){
    let z=0;
    if(isGameOver)return;
    if(x.classList.contains('checked')||x.classList.contains('flag'))return;
    if(x.getAttribute('data')!='0'){
        x.classList.add('checked'); 
        x.innerHTML=x.getAttribute('data'); 
    }
    for(let i=0;i<100;i++){
        let a= document.getElementById(i);
        if(a.classList.contains('checked') )z++  
    }
    if(z==80){
        UI(1);
        return;
    } 
    
    if(x.getAttribute('data')==='0'){
       
            console.log(x)
        x.innerHTML=x.getAttribute('data');
        
        recurCheck(x,mixArray);
    }
}

// recursion

function recurCheck(x,mixArray)
{   //if((x.getAttribute('class')=='bomb'))
    let y= parseInt(x.getAttribute('id'));
    let z= document.getElementById(y);
    let isLeft=(y%10===0);
    let isRight=(y%10===9);
   // console.log(isRight)
    console.log(y)
    if(y>0&&!isLeft&&mixArray[y-1]!='bomb'){
             x.classList.add('checked') ; 
             check(document.getElementById(y-1),mixArray);
        }
    if(!isRight&&mixArray[y+1]!='bomb'){
             x.classList.add('checked'); 
             check(document.getElementById(y+1),mixArray);
    } 
    if(y>9&&!isLeft&&mixArray[y-width-1]!='bomb'){
        x.classList.add('checked') ; 
        check(document.getElementById(y-width-1),mixArray);
    }
    if(y>9&&!isRight&&mixArray[y-width+1]!='bomb'){  
             x.classList.add('checked'); 
             check(document.getElementById(y-width+1),mixArray);
    } 
    if(y>9&&mixArray[y-width]!='bomb'){
             x.classList.add('checked'); 
             check(document.getElementById(y-width),mixArray);
    }
    if(y<90&&!isLeft&&mixArray[y+width-1]!='bomb'){
        x.classList.add('checked') ; 
        check(document.getElementById(y+width-1),mixArray);
    }
    if(y<89&&!isRight&&mixArray[y+width+1]!='bomb'){  
        x.classList.add('checked'); 
        check(document.getElementById(y+width+1),mixArray);
    } 
    if(y<90&&mixArray[y+width]!='bomb'){
        x.classList.add('checked'); 
        check(document.getElementById(y+width),mixArray);
    }
    

}

