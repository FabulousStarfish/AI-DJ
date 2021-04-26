song="";
leftX=0;
leftY=0;
rightY=0;
rightX=0;
leftScore=0;
rightScore=0;
function preload(){
    song = loadSound('frozen.mp3');
}
function setup(){
    canvas = createCanvas(600, 450);
    canvas.position(450, 200);
    
    video=createCapture(VIDEO);
    video.hide();

    posenet= ml5.poseNet(video,modalLoaded);
    posenet.on('pose',gotResult);
}
function modalLoaded(){
    console.log("MODAL LOADED");
}
function gotResult(result){
    if(result.length > 0){
        console.log(result);
        leftScore=result[0].pose.keypoints[9].score;
        rightScore=result[0].pose.keypoints[10].score;
        console.log(leftScore);
        leftY=result[0].pose.leftWrist.y;
        leftX=result[0].pose.leftWrist.x;
        rightY=result[0].pose.rightWrist.y; 
        rightX=result[0].pose.rightWrist.x;    
        console.log(" Left Wrist X = "+leftX + " Left Wrist Y = "+leftY+ " Right Wrist X = "+rightX+" Right Wrist Y = "+rightY);    
    }
}
function draw(){
    image(video, 0, 0, 600, 450);

    fill('#34ebd8');
    stroke('#34eb9c');

    if(rightScore>0.002){
        circle(rightX,rightY,20);
        if(rightY>0 && rightY<=90){
            document.getElementById("rate").innerHTML="Speed - 0.5X";
            song.rate(0.5);
        }
        else if(rightY>90 && rightY<=180){
            document.getElementById("rate").innerHTML="Speed - 1X"
            song.rate(1);
        }
        else if(rightY>180 && rightY<=270){
            document.getElementById("rate").innerHTML="Speed - 1.5X"
            song.rate(1.5);
        }
        else if(rightY>270 && rightY<=360){
            document.getElementById("rate").innerHTML="Speed - 2X"
            song.rate(2);
        }
        else if(rightY>360 && rightY<=450){
            document.getElementById("rate").innerHTML="Speed - 2.5X"
            song.rate(2.5);
    }
    }
    
    

    if(leftScore > 0.002){
        circle(leftX,leftY,20);
        v_number=Number(leftY)
        volume=floor(v_number);
        final_volume=volume/450;
        document.getElementById("volume").innerHTML="Volume - "+final_volume.toFixed(1);
        song.setVolume(final_volume);
    }
}
function play(){
    song.play();
    song.rate(1);
    song.setVolume(1);
}
function stop(){
    song.stop();
}
function pauseSong(){
    song.pause();
}