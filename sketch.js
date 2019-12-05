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


// function modelReady() {
//   console.log('Model is ready!!!');
//   mobilenet.predict(puffin, gotResults);
// }
//
// function gotResults(error, results) {
//   if (error) {
//     console.error(error);
//   } else {
//     console.log(results);
//     let label = results[0].className;
//     let prob = results[0].probability;
//     fill(0);
//     textSize(64);
//     text(label, 10, height - 100);
//     createP(label);
//     createP(prob);
//   }
// }
//
//
// function setup() {
//   createCanvas(640, 480);
//   puffin = createImg('images/puffin.jpg', imageReady);
//   puffin.hide();
//   background(0);
//   mobilenet = ml5.imageClassifier('MobileNet', modelReady);
// }
//







function preload() {
    classifier = ml5.imageClassifier(modelURL + 'model.json');
}


function setup() {
    createCanvas(640, 480);
  input = createFileInput(handleFile);
  input.position(0, 0);

  buttonClasssify = createButton("Classify");
  buttonClasssify.position(windowWidth / 2, windowHeight - 60);
  buttonClasssify.mousePressed(classifyImage);
}

function classifyImage() {
    classifier.classify(img, gotResults);
}
//
// function draw() {
//   background(211,211,211);
//   if (img) {
//     image(img, 0, 0, width, height);
//   }
//   textSize(32);
//   textAlign(CENTER, CENTER);
//   fill(0);
//   text(label, width / 2, height - 150);
//
// }

function gotResults(error, results) {
  if (error) {
    console.error(error);
    return;
  }
  // Store the label and classify again!
  // label = results[0].label;
  console.log(results);
  let resultTxt1 = results[0].label;
  result1.innerText = resultTxt1;
  let resultTxt2 = results[1].label;
  result2.innerText = resultTxt2;
  let prob1 = 100 * results[0].confidence;
  probability1.innerText = Number.parseFloat(prob1).toFixed(2) + "%";
  let prob2 = 100 * results[1].confidence;
  probability2.innerText = Number.parseFloat(prob2).toFixed(2) + "%";



  // label = results[0].label;
  // let prob = results[0].confidence;
  // fill(0);
  // textSize(64);
  // text(label, 10, height - 100);
  // createP(label);
  // createP(prob);

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
