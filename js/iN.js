let resolution = 10;
let unit;

let data = [];

let startX;
let startY;
let prevX;
let prevY;
/*
var str = "-48 -84i";
var patt = /([-|+]?[\\d\\.]+)[A-Za-z]?/;
var patt = /[+|-]?[\d]+[i]?/g;
var result = str.match(patt);
*/

//console.log(result);

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}


function run(){

  var inputR = document.getElementById('inputR').value;
  var inputI = document.getElementById('inputI').value;
  var inputRd = document.getElementById('inputRd').value;

  if(inputR.length == 0 || inputI.length == 0 || inputRd.length == 0 || inputR == 0 || inputI == 0 || inputRd == 0){
    alert("¡ERROR! Rellene todos los campos.\n(Ingrese valores distintos de 0)");
  } else {
    $('.output').html('<div class="result main-data"></div>');

    sRoot(inputR,inputI,inputRd);

    //drawDot(50,10);
  }
}


function sRoot(a, b, radical){

  var mainD = document.getElementsByClassName('main-data')[0];

  drawGrid();

  var r = Math.sqrt((Math.pow(a,2))+(Math.pow(b,2)));
  var s = Math.pow(r,(1/radical));

  //console.log("r = " + r + "\ns = " + s);

  var theta;
  var phi;

  var x;
  var y;

  if(a > 0){
    theta = (Math.atan(b/a))*(180/Math.PI);
  } else if (a < 0){
    theta = (Math.atan(b/a))*(180/Math.PI) + 180;
  }

  var cN = document.getElementsByClassName("inputEq")[0];

  while (cN.firstChild) {
    cN.removeChild(cN.firstChild);
  }

  if(b < 0){
    cN.innerHTML = '<p>\\(Entrada:\\sqrt[' + radical + ']{'+ a +''+ b +'i}\\)<p>';
  } else {
    cN.innerHTML = '<p>\\(Entrada:\\sqrt[' + radical + ']{'+ a +'+'+ b +'i}\\)<p>';
  }

  mainD.innerHTML = '<p>\\(\\theta = ' + theta.toFixed(2) + '^{\\circ};r=' + r.toFixed(2) + ';s=' + s.toFixed(2) + '\\)<p>';


  //console.log("theta = " + theta);

  for(var k = 0; k < radical; k++){
    phi = (theta + 2*k*180)/radical;

    x = s*(Math.cos(phi*(Math.PI/180)));
    y = s*(Math.sin(phi*(Math.PI/180)));

    //console.log("phi[" + (k+1) +"] = " + phi + "\nx[" + (k+1) +"] = " + x + "\ny[" + (k+1) +"] = " + y);

    var color = getRandomColor();
    //console.log(document.getElementsByClassName("output")[0]);
    if(y < 0){
      $('.output').append('<div class="result"><div style="position: relative; left: 20px; top:40%; width: 15px; height: 15px; background-color: ' + color + '; border-radius: 100%; border: solid 2px #333"></div><p class="point-data">\\(\\mathbf{\\phi}_{' + (k+1) + '}=' + phi.toFixed(2) + '^{\\circ}∴\\mathbf{z}_{' + (k+1) + '}=' + x.toFixed(2) + '' + y.toFixed(2) + 'i\\)<p></div>');
    } else {
      $('.output').append('<div class="result"><div style="position: relative; left: 20px; top:40%; width: 15px; height: 15px; background-color: ' + color + '; border-radius: 100%; border: solid 2px #333"></div><p class="point-data">\\(\\mathbf{\\phi}_{' + (k+1) + '}=' + phi.toFixed(2) + '^{\\circ}∴\\mathbf{z}_{' + (k+1) + '}=' + x.toFixed(2) + ' + ' + y.toFixed(2) + 'i\\)<p></div>');
    }
    drawDot(x,y,color);

  }
  MathJax.Hub.Typeset();
  //console.log(data);
  //line((prevX*unit)+width/2,(prevY*unit*(-1))+width/2,(startX*unit)+width/2,(startY*unit*(-1))+width/2);

}

function drawDot(x,y,c){
  unit = width/resolution;

  //console.log(x + " ::: " + y);

  /*console.log("startX: " + startX  +
              "\nstartY: " + startY  +
              "\nprevX: " + prevX  +
              "\nprevY: " + prevX);
  */

  if(startX == null && startY == null){
    startX = x;
    startY = y;
  }

  if (prevX != null && prevY != null){
    //console.log("prevNOTNull");
    //line((prevX*unit)+width/2,(prevY*unit*(-1))+width/2,(x*unit)+width/2,(y*unit*(-1))+width/2);

    prevX = x;
    prevY = y;

  } else {
    //console.log("prevNull");
    prevX = x;
    prevY = y;
  }

  fill(c);
  ellipse((unit*x)+width/2,(unit*y*(-1))+width/2,10,10);
}

function setup(){
  var canvas = createCanvas(500,500);
  canvas.parent('graph-container');
  noLoop();
  drawGrid();

  //frameRate(60);
}


function drawGrid(){
  background(255);

  var unit = width/resolution;
  stroke(100);
  strokeWeight(1.5);
  for(var i = unit; i < width; i+=unit){
    if(i == width/2) {
      stroke(0,0,255);
      line(i,0,i,500);
      line(0,i,500,i);
    } else {
      stroke(100);
      line(i,0,i,500);
      line(0,i,500,i);
    }
  }

  //sRoot(1,0,4);
  //loop+=1;
}

function info(){
  alert("INSTRUCCIONES:" +
    "\n1.-Ingrese el coeficiente de la parte real del numero complejo." +
    "\n2.-Ingrese el coeficiente de la parte imaginaria del numero complejo." +
    "\n3.-Ingrese el radical de la raiz." +
    "\n4.-Presione el boton rosa." +
    "\n\nRESULTADOS:" +
    "\nLos resultados se graficaran en base a la operacion ingresada, el " +
    "resultado de la raiz enesima de un numero complejo resulta en los " +
    "vertices de un poligono regular de n lados, siendo n el radical." +
    "\nAdemas de la grafica se obtendra la informacion de los datos ingresados " +
    "y una referencia a los datos de cada punto en la grafica por medio de " +
    "colores.");
}
