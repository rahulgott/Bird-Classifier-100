let img;
var classifier;
var label="...";
var buttonClasssify;
const result1 = document.getElementById("result1");
const result2 = document.getElementById("result2");
const probability1 = document.getElementById("probability1");
const probability2 = document.getElementById("probability2");

// var modelURL = 'https://teachablemachine.withgoogle.com/models/b1MJULSM/';
// var modelURL = 'https://teachablemachine.withgoogle.com/models/l9FqTKmC/';
var modelURL = "https://teachablemachine.withgoogle.com/models/4CrQTe8K/"

function preload() {
    classifier = ml5.imageClassifier(modelURL + 'model.json');
}


function setup() {
    createCanvas(640, 480);
  input = createFileInput(handleFile);
  input.position(windowWidth / 2 - 180, windowHeight - 110);

  buttonClasssify = createButton("Classify");
  buttonClasssify.position(windowWidth / 2 + 100, windowHeight - 110);
  buttonClasssify.mousePressed(classifyImage);
}

function classifyImage() {
    classifier.classify(img, gotResults);
}


function gotResults(error, results) {
  if (error) {
    console.error(error);
    return;
  }
  console.log(results);
  let resultTxt1 = results[0].label;
  result1.innerText = resultTxt1;
  let resultTxt2 = results[1].label;
  result2.innerText = resultTxt2;
  let prob1 = 100 * results[0].confidence;
  probability1.innerText = Number.parseFloat(prob1).toFixed(2) + "%";
  let prob2 = 100 * results[1].confidence;
  probability2.innerText = Number.parseFloat(prob2).toFixed(2) + "%";
}


function handleFile(file) {
  print(file);
  if (file.type === 'image') {
    img = createImg(file.data, imageReady);
    img.hide();
    background(0);
  } else {
    img = null;
  }
}


function imageReady() {
  image(img, 0, 0, width, height);
}
