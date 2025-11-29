function setup() {
  createCanvas(600, 400);
  frameRate(20);
}

function draw() {
  let t = frameCount / 600.0;
  if (t > 1) t = 1;

  // 배경 색상 변화
  let bg1 = color(240, 240, 255);
  let bg2 = color(255, 235, 240);
  let bgAmt = (sin(frameCount * 0.01) + 1) / 2; // 0~1
  background(lerpColor(bg1, bg2, bgAmt));

  noStroke();

  // 사각형 색면 (색상 + 살짝 위치 변화)
  let shake = sin(frameCount * 0.02) * 5;
  let amt = (sin(frameCount * 0.02) + 1) / 2;   // 0~1

  fill(lerpColor(color(237, 245, 255), color(180, 220, 255), amt));
  rect(40 + shake, 40, 220, 150 + shake);

  fill(lerpColor(color(255, 236, 240), color(255, 200, 220), amt));
  rect(280 - shake, 30, 280, 180 - shake);

  fill(lerpColor(color(230, 255, 240), color(200, 255, 220), amt));
  rect(60, 220 + shake, 220, 140);

  fill(lerpColor(color(245, 236, 255), color(210, 200, 255), amt));
  rect(320, 220 - shake, 240, 140 + shake);

  // 원 (크기 + 색상 + 위치 변화)
  let base = 110;
  let pulse = sin(frameCount * 0.05) * 20; // 크기 변화
  let cAmt = (sin(frameCount * 0.02) + 1) / 2;

  fill(lerpColor(color(255, 120, 100, 180), color(255, 200, 50, 180), cAmt));
  ellipse(180 + sin(frameCount * 0.02) * 10, 115, base + pulse, base + pulse);

  fill(lerpColor(color(30, 160, 220, 170), color(100, 200, 255, 180), cAmt));
  ellipse(340 - cos(frameCount * 0.02) * 10, 120, base - pulse, base - pulse);

  fill(lerpColor(color(255, 220, 40, 160), color(255, 150, 80, 180), cAmt));
  ellipse(430 + sin(frameCount * 0.015) * 10, 280, base + pulse, base + pulse);

  fill(lerpColor(color(80, 200, 140, 160), color(160, 255, 180, 180), cAmt));
  ellipse(200 - cos(frameCount * 0.02) * 10, 300, base - pulse, base - pulse);

  // 중앙 아크 (회전 + 색상 변화)
  stroke(0, 60);
  strokeWeight(1);
  let rot = frameCount * 0.02;

  fill(lerpColor(color(255, 170, 0), color(255, 100, 50), cAmt));
  arc(300, 200, 200, 200, rot, rot + HALF_PI);

  fill(lerpColor(color(120, 90, 230), color(180, 120, 255), cAmt));
  arc(300, 200, 200, 200, rot + HALF_PI, rot + PI);

  fill(lerpColor(color(0, 180, 160), color(0, 220, 200), cAmt));
  arc(300, 200, 200, 200, rot + PI, rot + PI + HALF_PI);

  fill(lerpColor(color(255, 80, 140), color(255, 160, 200), cAmt));
  arc(300, 200, 200, 200, rot + PI + HALF_PI, rot + TWO_PI);

  // 외곽선
  noFill();
  stroke(0, 120);
  strokeWeight(6);
  rect(30, 25, 540, 350);


  noStroke();
  fill(0);
  textSize(16);
  text("20212769 이동형", 20, 30);
}


function keyPressed() {
  if (key == 's' && typeof saveGif === 'function') {
    saveGif('abstract_art_LeeDongHyung', 10);
  }
}
