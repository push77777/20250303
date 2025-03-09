let inputBox;
let sliderElement;
let btnElement;
let colorPicker;
let radioElement;
let dropdown;
let displayText = '';
let randomValue = 0;
let mode = '一般';

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  inputBox = createInput();
  inputBox.position(20, 20);
  inputBox.input(updateText);
  
  sliderElement = createSlider(10, 50, 20, 0.01);
  sliderElement.position(20, 60);
  
  btnElement = createButton("瘋狂");
  btnElement.position(20, 100);
  btnElement.mousePressed(goCrazy);
  
  colorPicker = createColorPicker('#ed225d');
  colorPicker.position(20, 140);
  
  radioElement = createRadio();
  radioElement.option("一般");
  radioElement.option("旋轉(rotate)");
  radioElement.option("大小(scale)");
  radioElement.style("background-color", 'white');
  radioElement.position(20, 180);
  radioElement.changed(updateMode);
  
  dropdown = createSelect();
  dropdown.position(200, 20);
  dropdown.option('第一周');
  dropdown.option('第二周');
  dropdown.option('第三周');
  dropdown.changed(handleDropdownChange);
}

function draw() {
  background(220);
  textSize(sliderElement.value());
  fill(colorPicker.value());
  textAlign(LEFT, TOP);
  
  let lineHeight = sliderElement.value() * 1.5; // 調整行距
  
  for (let y = 0; y < windowHeight; y += lineHeight) {
    let x = 0; // 起始 x 座標
    while (x < windowWidth) {
      push();
      if (mode === '旋轉(rotate)') {
        translate(x + textWidth(displayText) / 2, y + sliderElement.value() / 2);
        rotate(random(-PI / 4, PI / 4));
        text(displayText, 0, 0);
      } else if (mode === '大小(scale)') {
        translate(x, y);
        scale(random(0.5, 1.5));
        text(displayText, 0, 0);
      } else {
        text(displayText, x + random(-randomValue, randomValue), y + random(-randomValue, randomValue));
      }
      pop();
      x += textWidth(displayText) + 10; // 調整每行文字之間的間隔
    }
  }
}

function updateText() {
  displayText = this.value();
}

function updateMode() {
  mode = radioElement.value();
}

function goCrazy() {
  if (randomValue > 0) {
    randomValue = 0;
  } else {
    randomValue = 10;
  }
}

function handleDropdownChange() {
  let selected = dropdown.value();
  if (selected === '第一周') {
    window.location.href = 'https://www.tku.edu.tw/';
  } else if (selected === '第二周') {
    window.location.href = 'https://www.et.tku.edu.tw/';
  } else if (selected === '第三周') {
    window.location.href = 'https://hackmd.io/5uUI2e-7SCGZLPpsQ10Bdg';
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}