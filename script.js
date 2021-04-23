// true: door ala3eeb al2awal ,false: door althani
var player=true;
// a3eed wa7de atna2at
var init_i,init_j;

var score1=0;
var score2=0;

function initilize_game(){
    var str=new String();
// where to start the game
    init_i=getRandom(0,7);
    init_j=getRandom(0,7);
//
    for(var i=0;i<7;i++){
        // shrsheer altag tb3 alshora
        str+="<tr>";
        for(var j=0;j<7;j++){
            // shrsher altag tb3 alcell (al ta)
            str+="<td onclick=\"tdclick(this)\"";
            if(i==init_i && j==init_j){
                str=str+"style=\"border-color: red;\"><img width=\"40px\" height=\"40px\" src=\"initial.png\"></img>";
            }else{
                str=str+"><h2>"+getRandom(10,100)+"</h2>";
            }
           
            str+="</td>";
        }
        str+="</tr>";
    }
    document.getElementById("innergame").innerHTML=str;
    document.getElementById("score1").innerHTML="Score: 0";
    document.getElementById("score2").innerHTML="Score: 0";
    playerturn(1);
    addModelFunctions();
}
function addModelFunctions(){
    //a5dtha mn w3school


    // When the user clicks on <span> (x), close the modal
    var span = document.getElementsByClassName("close")[0];
    var modal=document.getElementById("myModal");
    span.onclick = function() {
        modal.style.display = "none";
    }
    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal) {
        modal.style.display = "none";
        }
    }
}
function tdclick(e){
    var now_i=e.parentNode.rowIndex,now_j=e.cellIndex;
    if(e.getElementsByTagName("h2").length>0){
        if(player){//row Player
            if(now_i==init_i && (now_j==init_j+1||now_j==init_j-1)){
                //legal move
                e.style.border = "0.1em solid #00FF0A";
                var t=e.getElementsByTagName("h2")[0];
                score1+=Number(t.innerHTML);
                player=false;
                e.innerHTML="<img width=\"40px\" height=\"40px\" src=\"player1.png\"></img>";
                init_j=now_j;
                changescore(1,score1);
                playerturn(2);
                // Check if the other player can play?! here.
                checkifplayercanplay(player,init_i,init_j);
            }else{
                //Illegal Move
                fillmodelbox("Illegal Move: You can select near right or left of the last selected cell.");
            }
        }else{//column
            if(now_j==init_j && (now_i==init_i+1||now_i==init_i-1)){
                //legal move
                e.style.border = "0.1em solid #cc33ff";
                var t=e.getElementsByTagName("h2")[0];
                score2+=Number(t.innerHTML);
                player=true;
                e.innerHTML="<img width=\"40px\" height=\"40px\" src=\"player2.png\"></img>";
                init_i=now_i;
                changescore(2,score2);
                playerturn(1);
                // Check if the other player can play?! here.
                checkifplayercanplay(player,init_i,init_j);
            }else{
                //Illegal Move
                fillmodelbox("Illegal Move: You can select near top or buttom of the last selected cell.");
            }
        }
    }else{
        //Clicked premade img
        fillmodelbox("Illegal Move: This cell already been selected.");
    }
}
function fillmodelbox(msg){
    var par=document.getElementById("msg");
    par.innerHTML=msg;
    par.style.fontSize="xx-large";
    document.getElementById("myModal").style.display = "block";
}
function checkifplayercanplay(mode,now_i,now_j){
    var e=document.getElementById("innergame");
    var flag=false;
    if(mode){//true means first player turn
        var t=e.getElementsByTagName("tr")[now_i];//.getElementsByTagName("td")[now_j];
        if(now_j+1<=6 && now_j-1>=0){//legal index
            var i=t.getElementsByTagName("td")[now_j+1];
            var j=t.getElementsByTagName("td")[now_j-1];
            if(i.getElementsByTagName("img").length==1 && j.getElementsByTagName("img").length==1){
                //Game Over
                flag=true;
            }
        }else if(now_j+1<=6){//last move was on the left side
                //Game Over
                var i=t.getElementsByTagName("td")[now_j+1];
                if(i.getElementsByTagName("img").length==1){
                    flag=true;
                }
        }else{//last move was on the right side
                //Game Over
                var j=t.getElementsByTagName("td")[now_j-1];
                if(j.getElementsByTagName("img").length==1){
                    flag=true;
                }
        }
    }else{//means second player turn
        //we check rows
        if(now_i-1>=0 && now_i+1<=6){//legal index
            var up=e.getElementsByTagName("tr")[now_i-1].getElementsByTagName("td")[now_j];
            var down=e.getElementsByTagName("tr")[now_i+1].getElementsByTagName("td")[now_j];
            if(up.getElementsByTagName("img").length==1 && down.getElementsByTagName("img").length==1){
                //Game Over
                flag=true;
            }
        }else if(now_i+1<=6){//upper side
            var down=e.getElementsByTagName("tr")[now_i+1].getElementsByTagName("td")[now_j];
            if(down.getElementsByTagName("img").length==1){
                //Game Over
                flag=true;
            }
        }else{//buttom side
            var up=e.getElementsByTagName("tr")[now_i-1].getElementsByTagName("td")[now_j];
            if(up.getElementsByTagName("img").length==1){
                //Game Over
                flag=true;
            }
        }
    }
    if(flag){//Game Over check the winner
        if(score1>score2){
            playagainmode("Player 1 won the game with "+score1+" points!!!");
        }else if(score2>score1){
            playagainmode("Player 2 won the game with "+score2+" points!!!");
        }else{
            playagainmode("Well, it is a tie! the scores are: "+score1);
        }
    }
}
function playagainmode(msg){
    var content=document.getElementsByClassName("modal-content")[0];
    var str=new String();
    window.onclick=null;
    str="<h1>Congratulations</h1>";
    str+="<hr><h2>"+msg+"</h2>";
    str+="<a href=\"../welcome.html\" class=\"button\"> Play Again</a>";
    content.innerHTML=str;
    document.getElementById("myModal").style.display = "block";
}
function playerturn(mode){
    // athwe o2etfe 7odod al div m3 al ids player1 o player2
    if(mode==1){
        //player1 change
        document.getElementById("player1").style.border = "0.1em solid #00FF0A";
        document.getElementById("player2").style.border = "none";
    }else{
        //player2 change
        document.getElementById("player1").style.border = "none";
        document.getElementById("player2").style.border = "0.1em solid #cc33ff";
    }
}
function changescore(mode,score){
    if(mode==1){
        //player1 change
        document.getElementById("score1").innerHTML="Score: "+score;
    }else{
        //player2 change
        document.getElementById("score2").innerHTML="Score: "+score;
    }
}
function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}
