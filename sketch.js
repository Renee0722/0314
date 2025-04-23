let input;
let slider;
let sliderLabel;
let button;
let dropdown;
let iframe;
let isBouncing = false;

function setup() {  //這是一個設定函數，只會執行一次
  // 產生一個畫布，充滿整個視窗，背景顏色為e3d5ca
  createCanvas(windowWidth, windowHeight);
  background('#e3d5ca');

  // 創建一個輸入框，並設置其位置和預設內容
  input = createInput('請輸入...');
  input.position(10, 10); // 設置輸入框的位置在(10, 10)
  input.size(200, 40);  // 設置輸入框的大小，寬度200，高度40

  // 創建一個滑桿，並設置其位置和範圍
  slider = createSlider(16, 55, 32);  // 最小值16，最大值55，初始值32
  slider.position(input.x + input.width + 10, 10);  // 設置滑桿的位置在輸入框的右方

  // 創建一個標籤來說明滑桿的功能
  sliderLabel = createDiv('調整文字大小');
  sliderLabel.position(slider.x + slider.width + 10, 10);  // 設置標籤的位置在滑桿的右方
  sliderLabel.style('color', 'blue');  // 設置標籤的顏色為藍色
  sliderLabel.style('font-weight', 'bold');  // 設置標籤的文字粗細為粗體

  // 創建一個按鈕，並設置其位置和功能
  button = createButton('跳動');
  button.size(100, 50);  // 設置按鈕的大小，寬度100，高度50
  button.position(550, 10);  // 設置按鈕的位置在(550, 10)
  button.style('background-color', '#ffc8dd');  // 設置按鈕的背景顏色
  button.mousePressed(toggleBounce);

  // 創建一個下拉選單，並設置其選項和位置
  dropdown = createSelect();
  dropdown.position(700, 10);  // 設置下拉選單的位置在(700, 10)
  dropdown.size(200, 40);  // 設置下拉選單的大小
  dropdown.style('background-color', '#add8e6');  // 設置下拉選單的背景顏色
  dropdown.option('淡江大學');
  dropdown.option('教育科技');
  dropdown.changed(handleDropdownChange);

  // 創建一個 iframe，並設置其大小和位置
  iframe = createElement('iframe');
  iframe.position(10, 100);
  iframe.size(windowWidth - 20, windowHeight - 220);  // 設置 iframe 的大小，寬度為視窗寬度-20，高度為視窗高度-120
}

function draw() {  // 這是一個繪圖函數，會一直執行
  background('#e3d5ca'); // 每次繪圖之前，先清空背景顏色
  let textSizeValue = slider.value();  // 獲取滑桿的值作為文字大小
  textSize(textSizeValue);  // 設置文字大小
  fill(0);  // 設置文字顏色為黑色
  stroke(0); // 設置文字邊框顏色為黑色
  strokeWeight(1); // 設置文字邊框寬度為1
  
  let textContent = input.value();  // 使用輸入框中的文字內容
  let textWidthValue = textWidth(textContent + "   ");  // 增加更多空格
  let startX = 0; // 將 x 座標設為0
  let startY = 100;  // 將 y 座標設為 100

  for (let y = startY; y < height; y += textSizeValue + 10) {  // 每行文字的高度為文字大小加10
    for (let x = startX; x < width; x += textWidthValue) {
      let offsetY = isBouncing ? sin(frameCount * 0.1 + x * 0.05) * 10 : 0;
      text(textContent, x, y + offsetY);
    }
  }
}

function toggleBounce() {
  isBouncing = !isBouncing;
}

function handleDropdownChange() {
  let selected = dropdown.value();
  if (selected === '淡江大學') {
    iframe.attribute('src', 'https://www.tku.edu.tw/');
  } else if (selected === '教育科技') {
    iframe.attribute('src', 'https://www.et.tku.edu.tw/');
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  iframe.size(windowWidth - 20, windowHeight - 120);  // 調整 iframe 的大小
}