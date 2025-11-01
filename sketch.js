const bubbleSize = 40;
const maxSoapBubbles = 500;
let soapBubbles = [];
let newBubbleJet = false;
let bubbleColour = '#6DAEDB';
let colours = [
  '#6DAEDB',
  '#EF6461',
  '#E4B363',
  '#4CB944',
  '#29335C',
  '#861657',
];

function setup() {
  createCanvas(800, 600);
  // make it explicit that we're using ellipse centre mode
  ellipseMode(CENTER);

  soapBubbles = generateBubbles();
}

function draw() {
  background(220);

  // soapBubbles = constrainNumBubbles(soapBubbles);
  soapBubbles = soapBubbles.map(updateSoapBubble);
  soapBubbles.forEach(drawSoapBubble);
  // newBubbleJet = checkForJet();
  // if (newBubbleJet) {
  //   soapBubbles = addNewBubble(soapBubbles);
  // }
}

function checkForJet() {
  // jet every 5 seconds
  if (second() % 5 === 0) {
    return true;
  } else {
    return false;
  }
}

// BUBBLES

function generateBubbles() {
  let bubbles = [];
  for (let i = 0; i < 6; i++) {
    const x = (width / 6) * i + width / 6 / 2;

    for (let j = 0; j < 6; j++) {
      const y = (height / 6) * j + height / 6 / 2;
      bubbles.push(createNewBubble([x, y]));
    }
  }
  return bubbles;
}

function constrainNumBubbles(soapBubbles) {
  if (soapBubbles.length > maxSoapBubbles) {
    return soapBubbles.slice(
      soapBubbles.length - maxSoapBubbles,
      soapBubbles.length
    );
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
  const gb = simulateGravity(b);
  const bb = checkbounds(gb);
  return bb;
}

function simulateGravity(b) {
  const velocity = { x: b.velocity.x, y: b.velocity.y + 9.8 / 100 };
  const position = {
    x: b.position.x,
    y: b.position.y + velocity.y,
  };

  return {
    ...b,
    position,
    velocity,
  };
}

function checkbounds(b) {
  let position = b.position;
  let velocity = b.velocity;
  if (b.position.y > height) {
    position.y = height;
    velocity.y = -b.velocity.y;
  }

  return {
    ...b,
    position,
    velocity,
  };
}
