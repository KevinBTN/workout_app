var startBtn = document.getElementById("start"),
    btnContainer = document.getElementById("btnContainer"),
    doneBtn = document.createElement("button"),
    timer = document.createElement("h1"),
    nextBtn = document.createElement("button"),
    exerciseName = document.getElementById("exerciseTitle"),   
    repNumber = document.createElement("INPUT"),
    sendBtn = document.createElement("button"),
    minutes = 0, seconds = 10, pullups = 1, dips = 1, 
    ausiePullups = 1, pushups = 1, bicepsCurls = 1, pistolSquats = 1, plank = 1, calfRaise = 1;


startBtn.addEventListener("click", start);

function start(){
  startBtn.parentNode.removeChild(startBtn);
  doneBtn.setAttribute("id", doneBtn);
  repNumber.setAttribute("id", repNumber);
  repNumber.setAttribute("type", "text")
  repNumber.setAttribute("placeholder", "Reps done");
  document.getElementById("textInput").appendChild(repNumber);
  document.getElementById("btnContainer").appendChild(doneBtn);
  doneBtn.innerHTML = "Done";
  displayExercise();
}
doneBtn.addEventListener("click", done);
function done(){
  document.getElementById("wrapup").style.visibility = "visible";
  doneBtn.parentNode.removeChild(doneBtn);
  document.getElementById("exWrapup").innerHTML += exerciseName.textContent + " : " + repNumber.value + "<br>";
  if(calfRaise >= 3){
    sendBtn.setAttribute("id", sendBtn);
    document.getElementById("btnContainer").appendChild(sendBtn);
    sendBtn.textContent = "Send";
    repNumber.setAttribute("placeholder", "Email address");
    exerciseName.innerHTML = "Training complete, <br> Congratulation! <br> <font size=8>Enter your email <br>to receive your training report</font>";
    repNumber.value = "";
  }
  else{
    timer.setAttribute("id", timer); 
    document.getElementById("btnContainer").appendChild(timer);
    exerciseName.textContent = "Rest";
    repNumber.parentNode.removeChild(repNumber);
    timer.style.visibility = "visible";
    timerFun();
    repNumber.value = "";
  }
}
nextBtn.addEventListener("click",next);
function next(){
  nextBtn.parentNode.removeChild(nextBtn);
  displayExercise();
  clearTimeout(t);
  clearInterval(interval);
  if(pistolSquats >= 4 && plank <= 4){
    minutes = 0; 
    seconds = 2;
    timer.style.visibility = "visible";
    timerFun();
  
  } 
  else{
    timer.parentNode.removeChild(timer);
    document.getElementById("btnContainer").appendChild(doneBtn);
    repNumber.setAttribute("id", repNumber);
    repNumber.setAttribute("type", "text")
    repNumber.setAttribute("placeholder", "Reps done");
    document.getElementById("textInput").appendChild(repNumber);
  }
}

sendBtn.addEventListener("click", sendEmail);
function sendEmail(){
 Email.send({
    Host : "smtp.elasticemail.com",
    Username : "kbrantone@gmail.com",
    Password : "236713E6E50C70BF2B1764B62C8B85C129B3",
    To : repNumber.value,
    From : "kbrantone@gmail.com",
    Subject : "Your training report",
    Body : document.getElementById("exWrapup").innerHTML
}).then(
  message => alert(message)
);
                };


function substract(){
  if (seconds == 0 && minutes == 0){
    ticker = 0; 
    nextBtn.setAttribute("id", nextBtn);
    document.getElementById("btnContainer").appendChild(nextBtn);
    nextBtn.innerHTML = "Next";
    interval = setInterval(flashing, 1000);
  }
  else if(seconds == 0){
    minutes--;
    seconds = 59; 
  }
  else{
    seconds--;   
    }
  timer.textContent = (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + (seconds > 9 ? seconds : "0" + seconds);
    }
  
function flashing(){
  if(timer.style.visibility == "visible"){
    timer.style.visibility = "hidden";
  }
  else{
    timer.style.visibility = "visible";
  }
}
function timerFun(){
  t = setInterval(substract, 1000);
}
  
function displayExercise(){
  if(pullups <= 3){
    exerciseName.textContent = "Pullups Round " + pullups;
    minutes = 0; 
    seconds = 2;
    pullups++;
  }
  else if(pullups >= 3 && dips <= 3){
    exerciseName.textContent = "Dips Round " + dips;
    minutes = 0; 
    seconds = 2; 
    dips++;
  }
  else if(dips >= 3 && ausiePullups <= 3){
    exerciseName.textContent = "Australian Pullups Round " + ausiePullups;
    minutes = 0; 
    seconds = 2;
    ausiePullups++;
  }
  else if(ausiePullups >= 3 && pushups <= 3){
    exerciseName.textContent = "Pushups Round " + pushups;
    minutes = 0; 
    seconds = 2;
    pushups++;
  }
  else if(pushups >= 3 && bicepsCurls <= 3){
    exerciseName.textContent = "Biceps Curl / Triceps Round " + bicepsCurls;
    minutes = 0; 
    seconds = 2;
    bicepsCurls++;
  }
  else if(bicepsCurls >= 3 && pistolSquats <= 3){
    exerciseName.textContent = "Pistol Squats Round " + pistolSquats;
    minutes = 0;
    seconds = 2;
    pistolSquats++;
  }
  else if(pistolSquats >= 3 && plank <= 3){
    exerciseName.textContent = "1 minute Plank Round " + plank;
    minutes = 0; 
    seconds = 2; 
    plank++;
  }
  else if(plank >= 3 && calfRaise <= 3){
    exerciseName.textContent = "One straight leg calf raise Round " + calfRaise;
    minutes = 0; 
    seconds = 2; 
    calfRaise++;
  }
}
