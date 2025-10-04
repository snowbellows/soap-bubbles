const bubbleSize = 40;
let soapBubbles = [];
let newBubbleJet = false;
let bubbleColour = '#6DAEDB';

function setup() {
  createCanvas(800, 600);
  // make it explicit that we're using ellipse centre mode
  ellipseMode(CENTER);
}

function draw() {
  // soapBubbles = soapBubbles.map(updateSoapBubble)
  // soapBubbles.forEach(drawSoapBubble)
  newBubbleJet = checkForJet();
  if (newBubbleJet) {
    soapBubbles = addNewBubble(soapBubbles);
  }
  background(220);
}

function checkForJet() {
  // jet on even seconds
  if (second() % 2 === 0) {
    return true;
  } else {
    return false;
  }
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
  };
}
