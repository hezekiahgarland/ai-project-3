song = "";
leftwristx = "";
leftwristy = "";
rightwristx = "";
rightwristy = "";
leftwirstscore = "";
rightwirstscore = "";

function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    pose_model = ml5.poseNet(video, modelloaded);
}

function modelloaded() {
    console.log("model loaded succsessfuly")
    pose_model.on("pose", getresults)
}

function getresults(r) {
    if (r.length > 0) {
        console.log(r);
        leftwristx = r[0].pose.leftWrist.x;
        leftwristy = r[0].pose.leftWrist.y;
        rightwristx = r[0].pose.rightWrist.x;
        rightwristy = r[0].pose.rightWrist.y;
        leftwirstscore = r[0].pose.keypoints[9].score;
        rightwirstscore = r[0].pose.keypoints[10].score;
    }
}

function draw() {
    image(video, 0, 0, 600, 500)
    fill("red")
    stroke("red")
    if (leftwirstscore > 0.2) {
        circle(leftwristx, leftwristy, 20);
        if (song1.isPlaying() == false) {
            song2.stop()
            song1.play()
        }
    }
    if (rightwirstscore > 0.2) {
        circle(rightwristx, rightwristy, 20);
        if(song2.isPlaying()==false){
            song1.stop()
            song2.play()
        }

    }

}

function preload() {
    song1 = loadSound("music.mp3")
    song2 = loadSound("music2.mp3")
}