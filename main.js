status = "";
objects = [];
thing = "";

function preload() {
}

function setup() {
    canvas = createCanvas(300, 300);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
}

function draw() {
    image(video, 0, 0, 300, 300);
    if(status != "") {
        for(z = 0; z < objects.length; z++) {
            document.getElementById("status").innerHTML = "Status: Objects Detected";
            fill("#e31c1e");
            percent = floor(objects[z].confidence * 100);
            text(objects[z].label + " " + percent + "%", objects[z].x + 15, objects[z].y + 15);
            noFill();
            stroke("#e31c1e");
            rect(objects[z].x, objects[z].y, objects[z].width, objects[z].height);
            if(objects[z].label == thing) {
                video.stop();
                objectDetector.detect(gotResult);
                document.getElementById("number_of_objects").innerHTML = thing + " found";
            }
        }
    }
}

function start() {
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
    thing = document.getElementById("name_input").value;
}

function modelLoaded() {
    console.log("Model Loaded!");
    status = true;
}

function gotResult(error, results) {
    if(error) {
        console.error(error);
    }
    console.log(results);
    objects = results;
}