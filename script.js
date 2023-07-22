
timerArr=[];

document.getElementById("set-button").addEventListener("click",validateInput);

function checkTimers(){
    console.log("checked")
    let timers=document.getElementsByClassName("timer");
    console.log(timers);
    if(timers.length>0){
        document.getElementById("noTimers").style.display="none";
    }
    else{
        document.getElementById("noTimers").style.display="";
    }
}

function validateInput(){
    let hh = document.getElementById("hours").value;
    let mm = document.getElementById("minutes").value;
    let ss = document.getElementById("seconds").value;

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


    if(hh<0 || hh>23 || mm<0 || mm>60 || ss<0 || ss>60){
        alert("Enter valid time");
        resetValues();
        return;
    }
    else {
        checkTimers();
        setAlarm(hh,mm,ss);
        resetValues();
    }
    
}

function setAlarm(hh,mm,ss){

    let timer=document.createElement("div");
    timer.id="timer";
    timer.name=`timer${timerArr.length}`;
    timer.setAttribute("class",`timer timer${timerArr.length}`)


    let txt=document.createElement("span");
    txt.innerText="Time Left: "
    let h=document.createElement("h1");
    h.innerText=hh;
    let col1=document.createElement("h1");
    col1.innerText=":";
    let m=document.createElement("h1");
    m.innerText=mm;
    let col2=document.createElement("h1");
    col2.innerText=":"
    let s=document.createElement("h1");
    s.innerText=ss;
    let delButton=document.createElement("button");
    delButton.innerText="Delete";
    delButton.id="del-button";
    delButton.setAttribute("class",`timer${timerArr.length} del-button btn`);
    delButton.name=`timer${timerArr.length}`;


    timer.appendChild(txt);
    timer.appendChild(h);
    timer.appendChild(col1);
    timer.appendChild(m);
    timer.appendChild(col2);
    timer.appendChild(s);
    timer.appendChild(delButton)

    

    document.getElementById("timers-list").appendChild(timer);
    timerArr.push(timer);

    delFromList(timer);

    decreaseTime(hh,mm,ss,timer);

    checkTimers();
}

function delFromList(timer){
    let btn=timer.childNodes[6];
    btn.onclick = ()=>{
        timer.remove();
        checkTimers();
    }

}



function decreaseTime(hh,mm,ss,timer){

    console.log(hh +":"+mm+":"+ss);
    if(document.getElementsByName(timer.name).length == 0){
        return;
    }
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
            else {
                playAudio(true);
                timer.childNodes[6].innerText="Stop";
                changeBC(timer);
                addStopFunction(timer);
                checkTimers();
                return;
            }
        }
    }

    timer.childNodes[1].innerText = hh;
    timer.childNodes[3].innerText = mm;
    timer.childNodes[5].innerText = ss;
    

    setTimeout(()=>{decreaseTime(hh,mm,ss,timer)},1000);
}

function addStopFunction(timer){
    let btn=timer.childNodes[6];
    btn.onclick = ()=>{
        timer.remove();
        playAudio(false);
    }
}

audio=new Audio("mixkit-classic-alarm-995.wav");
function playAudio(play){

    if(play){
        audio.play();
        audio.loop=true;
    }
    else {
        audio.pause();
        audio.loop=false;
        audio=new Audio("mixkit-classic-alarm-995.wav");
    }
}

function changeBC(timer){
    timer.style.backgroundColor="yellow";
    timer.style.color="black";
    timer.childNodes[6].style.backgroundColor="orange"
}



function resetValues(){
    document.getElementById("hours").value="";
    document.getElementById("minutes").value="";
    document.getElementById("seconds").value="";
}