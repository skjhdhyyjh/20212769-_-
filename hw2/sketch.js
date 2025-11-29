let mood = 1;

function setup() {
  createCanvas(600, 400);
}

function draw() {
  background(250, 244, 220);

  let cardX = 180;
  let cardY = 60;
  let cardW = 240;
  let cardH = 280;

  noStroke();
  fill(230, 240, 245);
  rect(cardX, cardY, cardW, cardH, 20);

  fill(0, 0, 0, 40);
  rect(cardX, cardY - 26, 90, 22, 6);

  fill(40);
  textSize(14);
  text("이동형", cardX + 10, cardY - 10);

  let cx = cardX + cardW / 2;
  let cy = cardY + cardH / 2 + 10;

  let faceW = 160;
  let faceH = 220;
  let skin = color(242, 210, 185);
  let hair = color(40, 32, 28);

  let faceBottom = cy + faceH / 2;
  let neckTop = faceBottom - 22;
  let neckH = 40;
  let neckW = 56;
  let bodyTop = neckTop + neckH - 6;

  noStroke();
  fill(80, 110, 190);
  rect(cx - 110, bodyTop, 220, 130, 28);

  fill(65, 95, 170);
  arc(cx, bodyTop, 220, 40, 0, PI, CHORD);

  fill(skin);
  rect(cx - neckW / 2, neckTop, neckW, neckH, 12);

  stroke(70, 55, 48);
  strokeWeight(1);
  fill(skin);
  ellipse(cx, cy, faceW, faceH);

  noStroke();
  fill(skin);
  ellipse(cx - faceW / 2 - 10, cy + 6, 22, 34);
  ellipse(cx + faceW / 2 + 10, cy + 6, 22, 34);

  let eyeY = cy - 18;
  let browCenterY = eyeY - 26;
  let crownY = cy - faceH * 0.5;
  let hairlineY = (browCenterY + crownY) / 2;

  drawingContext.save();
  drawingContext.beginPath();
  drawingContext.ellipse(cx, cy, faceW / 2, faceH / 2, 0, 0, TWO_PI);
  drawingContext.clip();

  noStroke();
  fill(hair);
  arc(cx, hairlineY, faceW + 120, faceH + 40, PI, TWO_PI, CHORD);
  drawingContext.restore();

  let eyeDX = 38;
  let eyeOpen = 1.0;

  stroke(40, 30, 25);
  strokeWeight(1);
  fill(255);
  ellipse(cx - eyeDX, eyeY, 55, 36 * eyeOpen);
  ellipse(cx + eyeDX, eyeY, 55, 36 * eyeOpen);

  let px = 0;
  let py = 0;

  noStroke();
  fill(60, 120, 170);
  ellipse(cx - eyeDX + px, eyeY + py, 20, 20 * eyeOpen);
  ellipse(cx + eyeDX + px, eyeY + py, 20, 20 * eyeOpen);

  fill(10);
  ellipse(cx - eyeDX + px, eyeY + py, 10, 10 * eyeOpen);
  ellipse(cx + eyeDX + px, eyeY + py, 10, 10 * eyeOpen);

  fill(255, 255, 255, 230);
  ellipse(cx - eyeDX + px - 4, eyeY + py - 4, 4, 4);
  ellipse(cx + eyeDX + px - 4, eyeY + py - 4, 4, 4);

  noStroke();
  fill(hair);
  rect(cx - eyeDX - 22, eyeY - 30, 44, 8, 4);
  rect(cx + eyeDX - 22, eyeY - 30, 44, 8, 4);

  stroke(95, 75, 65);
  strokeWeight(1.5);
  line(cx, eyeY - 2, cx, cy + 24);
  noFill();
  arc(cx, cy + 28, 18, 8, 0, PI);

  noStroke();
  fill(255, 255, 255, 60);
  rect(cx - 5, eyeY - 6, 10, 46, 5);

  stroke(120, 60, 60);
  strokeWeight(2);
  noFill();

  if (mood === 1) {
    arc(cx, cy + 56, 52, 16, 0, PI);
  } else if (mood === 2) {
    arc(cx, cy + 54, 64, 20, 0, PI);
  } else {
    fill(200, 90, 100, 80);
    ellipse(cx, cy + 56, 34, 18);
  }
}

function keyPressed() {
  if (key === '1') mood = 1;
  if (key === '2') mood = 2;
  if (key === '3') mood = 3;

  if (key === 's' || key === 'S') {
    saveCanvas('caricature_600x400', 'png');
  }
}
