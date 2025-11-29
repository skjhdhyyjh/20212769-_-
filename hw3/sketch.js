let t = 0;        
let mood = 1;     // 1=작은웃음, 2=큰웃음, 3=놀람
let blinkTimer = 0;
let nextBlink = 120; // 4초마다 깜박
const FPS = 30;

function setup() {
  createCanvas(600, 400);
  frameRate(FPS);
}

function draw() {
  background(250, 244, 220);

  // 카드
  var cardX = 180;
  var cardY = 60;
  var cardW = 240;
  var cardH = 280;
  noStroke();
  fill(230, 240, 245);
  rect(cardX, cardY, cardW, cardH, 20);

  // 이름
  fill(0, 0, 0, 40);
  rect(cardX, cardY - 26, 90, 22, 6);
  fill(40);
  textSize(14);
  text("이동형", cardX + 10, cardY - 10);

  // 기준점
  var cx = cardX + cardW / 2;
  var cyBase = cardY + cardH / 2 + 10;

  // 살짝 끄덕
  var headBob = sin(t) * 2.0;
  var cy = cyBase + headBob;

  // 얼굴/머리/피부색
  var faceW = 160;
  var faceH = 220;
  var skin  = color(242, 210, 185);
  var hair  = color(40, 32, 28);

  // 레이어 기준점
  var faceBottom = cy + faceH / 2;
  var neckTop = faceBottom - 22;
  var neckH = 40;
  var neckW = 56;
  var bodyTop = neckTop + neckH - 6;

  // 1) 몸통
  noStroke();
  fill(80, 110, 190);
  rect(cx - 110, bodyTop, 220, 130, 28);
  fill(65, 95, 170);
  arc(cx, bodyTop, 220, 40, 0, PI, CHORD);

  // 2) 목
  fill(skin);
  rect(cx - neckW / 2, neckTop, neckW, neckH, 12);

  // 3) 얼굴
  stroke(70, 55, 48);
  strokeWeight(1);
  fill(skin);
  ellipse(cx, cy, faceW, faceH);

  // 귀
  noStroke();
  fill(skin);
  ellipse(cx - faceW / 2 - 10, cy + 6, 22, 34);
  ellipse(cx + faceW / 2 + 10, cy + 6, 22, 34);

  // 머리카락
  var eyeY = cy - 18;
  var browCenterY = eyeY - 26;
  var crownY = cy - faceH * 0.5;
  var hairlineY = (browCenterY + crownY) / 2;

  drawingContext.save();
  drawingContext.beginPath();
  drawingContext.ellipse(cx, cy, faceW / 2, faceH / 2, 0, 0, TWO_PI);
  drawingContext.clip();

  noStroke();
  fill(hair);
  arc(cx, hairlineY, faceW + 120, faceH + 40, PI, TWO_PI, CHORD);

  drawingContext.restore();

  // 눈
  var eyeDX = 38;
  var eyeOpen = 1.0;

  // 깜박
  blinkTimer++;
  if (blinkTimer > nextBlink) {
    var phase = blinkTimer - nextBlink;
    if (phase < 3) {
      eyeOpen = map(phase, 0, 2, 1, 0.05);
    } else if (phase < 6) {
      eyeOpen = map(phase, 2, 5, 0.05, 1);
    } else {
      blinkTimer = 0;
      nextBlink = int(random(90, 180));
    }
  }

  // 눈썹 리프트
  var eyebrowLift = (mouseIsPressed ? -6 : 0);

  // 흰자
  stroke(40, 30, 25);
  strokeWeight(1);
  fill(255);
  ellipse(cx - eyeDX, eyeY, 55, 36 * eyeOpen);
  ellipse(cx + eyeDX, eyeY, 55, 36 * eyeOpen);

  // 시선
  var look = createVector(mouseX - cx, mouseY - eyeY);
  look.limit(8);

  // 홍채/동공/하이라이트
  noStroke();
  fill(60, 120, 170);
  ellipse(cx - eyeDX + look.x, eyeY + look.y * 0.5, 20, 20 * eyeOpen);
  ellipse(cx + eyeDX + look.x, eyeY + look.y * 0.5, 20, 20 * eyeOpen);
  fill(10);
  ellipse(cx - eyeDX + look.x, eyeY + look.y * 0.5, 10, 10 * eyeOpen);
  ellipse(cx + eyeDX + look.x, eyeY + look.y * 0.5, 10, 10 * eyeOpen);
  fill(255, 255, 255, 230);
  ellipse(cx - eyeDX + look.x - 4, eyeY + look.y * 0.5 - 4, 4, 4);
  ellipse(cx + eyeDX + look.x - 4, eyeY + look.y * 0.5 - 4, 4, 4);

  // 눈썹
  noStroke();
  fill(hair);
  rect(cx - eyeDX - 22, eyeY - 30 + eyebrowLift, 44, 8, 4);
  rect(cx + eyeDX - 22, eyeY - 30 + eyebrowLift, 44, 8, 4);

  // 코
  stroke(95, 75, 65);
  strokeWeight(1.5);
  line(cx, eyeY - 2, cx, cy + 24);
  noFill();
  arc(cx, cy + 28, 18, 8, 0, PI);
  noStroke();
  fill(255, 255, 255, 60);
  rect(cx - 5, eyeY - 6, 10, 46, 5);

  // 입
  var moodLocal = mood;
  if (mouseIsPressed) moodLocal = 2;
  stroke(120, 60, 60);
  strokeWeight(2);
  noFill();
  if (moodLocal === 1) {
    arc(cx, cy + 56, 52, 16, 0, PI);
  } else if (moodLocal === 2) {
    arc(cx, cy + 54, 64, 20, 0, PI);
  } else {
    fill(200, 90, 100, 80);
    ellipse(cx, cy + 56, 34, 18);
  }

  // 시간 진행
  t += TWO_PI / (FPS * 2.5);
}

// 표정 변경 + 저장
function keyPressed() {
  if (key === '1') mood = 1; //웃음
  if (key === '2') mood = 2; //큰웃음
  if (key === '3') mood = 3; //놀람

  if (key === 's' || key === 'S') {
    saveCanvas('caricature_600x400', 'png');
  }

  if (key === 'g' || key === 'G') {
    if (typeof saveGif === 'function') {
      saveGif('caricature_animated', 10); // 10초
    }
  }
}
