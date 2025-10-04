const bubbleSize = 40;
const maxSoapBubbles = 500;
let soapBubbles = [];
let newBubbleJet = false;
let bubbleColour = '#6DAEDB';

function setup() {
  createCanvas(800, 600);
  // make it explicit that we're using ellipse centre mode
  // ellipseMode(CENTER);
}

function draw() {
  background(220);

  soapBubbles = constrainSoapBubbles(soapBubbles);
  soapBubbles = soapBubbles.map(updateSoapBubble);
  soapBubbles.forEach(drawSoapBubble);
  newBubbleJet = checkForJet();
  if (newBubbleJet) {
    soapBubbles = addNewBubble(soapBubbles);
  }
}

function checkForJet() {
  // jet on even seconds
  if (second() % 5 === 0) {
    return true;
  } else {
    return false;
  }
}

// BUBBLES

function constrainSoapBubbles(soapBubbles) {
  if (soapBubbles.length > maxSoapBubbles) {
    return soapBubbles.slice(0, soapBubbles.length - 1);
  }
  return soapBubbles;
}

function addNewBubble(soapBubbles) {
  const bubblePosition = getNewBubblePosition();
  const newBubble = createNewBubble(bubblePosition);
  return [newBubble, ...soapBubbles];
}

function getNewBubblePosition() {
  // Start new bubbles in the centre top position
  const x = width / 2;
  const y = bubbleSize / 2;
  return [x, y];
}

function createNewBubble(bubblePosition) {
  const [x, y] = bubblePosition.slice();
  return {
    colour: bubbleColour.slice(),
    position: {
      x,
      y,
    },
    velocity: {
      x: 0,
      y: 0,
    },
  };
}

function drawSoapBubble(b) {
  push();
  translate(b.position.x, b.position.y);
  stroke(bubbleColour);
  let fillColour = color(bubbleColour);
  fillColour.setAlpha(50);
  fill(fillColour);
  ellipse(0, 0, bubbleSize, bubbleSize);
  pop();
}

function updateSoapBubble(b) {
  const velocity = { x: b.velocity.x, y: b.velocity.y + 0.0001 };
  const position = {
    x: b.position.x,
    y: b.position.y + b.position.y * velocity.y,
  };

  if (position.y > height) {
    position.y = height;
    velocity.y = -0.01;
  }

  return {
    ...b,
    position,
    velocity,
  };
}
