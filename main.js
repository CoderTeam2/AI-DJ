function setup() {
    canvas = createCanvas(600, 500);
    canvas.position(450, 250);

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

var rightWristX = 0;
var rightWristY = 0;

var leftWristX = 0;
var leftWristY = 0;
var score_leftWrist = 0;
var score_rightWrist = 0;
var song = "";

function preload() {
    song = loadSound("music.mp3");
}

function play() {
    song.play();
    song.setVolume(1);
    song.rate(1);
}

function modelLoaded() {
    console.log("Posenet is ready to rock!");
}

function gotPoses(results) {
    if (results.length > 0) {
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("Right Wrist X : " + rightWristX + " Right Wrist Y : " + rightWristY);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        score_leftWrist = results[0].pose.keypoints[9].score;
        score_rightWrist = results[0].pose.keypoints[10].score;
        console.log(score_leftWrist);
    }
}

function draw() {
    image(video, 0, 0, 600, 500);
    fill("red");
    stroke("red");
    console.log("Left Wrist X : " + leftWristX + " Left Wrist Y : " + leftWristY);

    if(score_rightWrist > 0.2){
        circle(rightWristX, rightWristY, 20);
        if(rightWristY > 0 && rightWristY <= 100){
            document.getElementById("speed_label").innerHTML = "Speed : 0.5x";
            song.rate(0.5);
        }else if(rightWristY > 100 && rightWristY <= 200){
            document.getElementById("speed_label").innerHTML = "Speed : 1x";
            song.rate(1);
        }else if(rightWristY > 200 && rightWristY <= 300){
            document.getElementById("speed_label").innerHTML = "Speed : 1.5x";
            song.rate(1.5);
        }else if(rightWristY > 300 && rightWristY <= 400){
            document.getElementById("speed_label").innerHTML = "Speed : 2x";
            song.rate(2);
        }else if(rightWristY > 400 && rightWristY <= 500){
            document.getElementById("speed_label").innerHTML = "Speed : 2.5x";
            song.rate(2.5);
        }
        
    }
    if(score_leftWrist > 0.2){
        circle(leftWristX, leftWristY, 20);
        leftWristY_new = Number(leftWristY * 2);
        leftWristY_new = floor(leftWristY_new);
        leftWristY_new = leftWristY_new / 1000;
        document.getElementById("volume_label").innerHTML = "Volume" + " : " + leftWristY_new;
        song.setVolume(leftWristY_new);
    }
}