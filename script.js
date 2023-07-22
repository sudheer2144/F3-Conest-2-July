
timerArr=[];

document.getElementById("set-button").addEventListener("click",validateInput);

//this function is used to check whether there are any timers available if not this will show a message
function checkTimers(){
    
    let timers=document.getElementsByClassName("timer");    //getting list of timers
    if(timers.length>0){
        document.getElementById("noTimers").style.display="none";
    }
    else{
        document.getElementById("noTimers").style.display="";
    }

}

//validating the input
function validateInput(){

    let hh = document.getElementById("hours").value;
    let mm = document.getElementById("minutes").value;
    let ss = document.getElementById("seconds").value;

    //if any value is empty it will be "00" if any value is less than 10 it will add a zero in prefix
    if(hh==""){
        hh="00";
    }
    else if(hh<10){
        hh="0"+hh;
    }

    if(mm==""){
        mm="00";
    }
    else if(mm<10){
        mm="0"+mm;
    }

    if(ss==""){
        ss="00";
    }
    else if(ss<10){
        ss="0"+ss;
    }

    //checking the input is given correctly in thr form of actual time
    if(hh<0 || hh>23 || mm<0 || mm>60 || ss<0 || ss>60){    //if it is not a valid input
        alert("Enter valid time");
        resetValues();
        return;
    }
    else {  //if it is valid
        setTimer(hh,mm,ss); //calling the function to set a new Timer
        resetValues();  //clearing the input fields
    }
    
}

function setTimer(hh,mm,ss){

    let timer=document.createElement("div");  //a timer container
    //"timer${timerArr.length}" this is used to give the unique names with the combinatin of "timer"+"size of array" to ease things
    timer.id="timer";
    timer.name=`timer${timerArr.length}`;
    timer.setAttribute("class",`timer timer${timerArr.length}`)


    let txt=document.createElement("span"); //label before timer
    txt.innerText="Time Left: "

    let h=document.createElement("h1"); //hours
    h.innerText=hh;

    let col1=document.createElement("h1");  //colon
    col1.innerText=":";

    let m=document.createElement("h1"); //minutes
    m.innerText=mm;

    let col2=document.createElement("h1");  //colon
    col2.innerText=":"

    let s=document.createElement("h1"); //seconds
    s.innerText=ss;

    let delButton=document.createElement("button"); //button
    delButton.innerText="Delete";
    delButton.id="del-button";
    delButton.setAttribute("class",`timer${timerArr.length} del-button btn`);
    delButton.name=`timer${timerArr.length}`;


    //appending the childs to the timer container
    timer.appendChild(txt);
    timer.appendChild(h);
    timer.appendChild(col1);
    timer.appendChild(m);
    timer.appendChild(col2);
    timer.appendChild(s);
    timer.appendChild(delButton)


    //appending the timer container to the "timers-list" container
    document.getElementById("timers-list").appendChild(timer);

    timerArr.push(timer);   //pushing the timer to array for indexing

    delFromList(timer); //this will add the functionality to delete an timer

    decreaseTime(hh,mm,ss,timer);   //this will decrease the time to 0

    checkTimers(); //checking for the timers
}

//adding the functionality to the button to delete the "timer" parent
function delFromList(timer){
    let btn=timer.childNodes[6];
    btn.onclick = ()=>{
        timer.remove();
        checkTimers();
    }

}


//decreasing the time  
function decreaseTime(hh,mm,ss,timer){  //setting the elements in parent div "timer" by passing it

    if(document.getElementsByName(timer.name).length == 0){ //this will close the setTimeout() recurrsion once the timer with the defined name is removed
        return;                                            //all timers has a unique name attribute
    }

    //below decreases the time
    if(ss>0){
        ss-=1;
        if(ss<10){
            ss="0"+ss;
        }
    }
    else {
        if(mm>0){
            mm-=1;
            if(mm<10){
                mm="0"+mm;
            }
            ss=59;
        }
        else {
            if(hh>0){
                hh-=1;
                if(hh<10){
                    hh="0"+hh;
                }
                mm=59;
                ss=59;
            }
            else {  //if all fields (i.e,hours,minutes,seconds) are 0; then
                playAudio(true);                        //plays audio
                timer.childNodes[6].innerText="Stop";   //changing the button value to "Stop" from "Delete"
                changeBC(timer);                        //changing the style of the timer
                addStopFunction(timer);                 //the new functionality of stopping the timer and deleting will be added to the button
                checkTimers();  //checks for the timers
                return; //stops recurrsion
            }
        }
    }

    //updating with the new values for every 1000ms
    timer.childNodes[1].innerText = hh;
    timer.childNodes[3].innerText = mm;
    timer.childNodes[5].innerText = ss;
    
    //a recurrsive function which runs for every 1000ms
    setTimeout(()=>{decreaseTime(hh,mm,ss,timer)},1000);
}

//Stop functionality to timer
function addStopFunction(timer){
    let btn=timer.childNodes[6]; //after clicking Stop button
    btn.onclick = ()=>{             
        timer.remove();   //this will remove "timer" from the parent
        playAudio(false); //stops the audio
        checkTimers();
    }
}

audio=new Audio("mixkit-classic-alarm-995.wav");    //the tune which will be played once the timer hits 0;

function playAudio(play){   //to play the audio this will be called with "true"

    if(play){
        audio.play();   //playing
        audio.loop=true;    //looping untill it stopped manually
    }
    else {  //to pause the audio this will be called with "false".
        audio.pause();
        audio.loop=false;
        audio=new Audio("mixkit-classic-alarm-995.wav");    //initializing the object again so that 
                                                        //the audio will be played from the begining instead of resuming from where it was paused previously
    }
}


//changing the style for the timers those are finished
function changeBC(timer){
    timer.style.backgroundColor="yellow";
    timer.style.color="black";
    timer.childNodes[6].style.backgroundColor="orange"
}


//resetting the values
function resetValues(){
    document.getElementById("hours").value="";
    document.getElementById("minutes").value="";
    document.getElementById("seconds").value="";
}