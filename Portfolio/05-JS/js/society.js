var myGamePiece = new Array();
var happySrc = "images/smiley.gif";
var sadSrc = "images/angry.gif";
var maxDist = 30;

var myGameArea = {
  timer: 0,
  running: true,
  intervalId: null,
  canvas: document.createElement("canvas"),

  start: function () {
    this.canvas.width = 800;
    this.canvas.height = 600;
    this.canvas.style.border = "2px solid black";
    this.context = this.canvas.getContext("2d");
    this.context.font = "12px serif";

    if (!this.canvas.isConnected) {
      document.body.insertBefore(
        this.canvas,
        document.body.childNodes[0]
      );
    }

    if (this.intervalId !== null) {
      clearInterval(this.intervalId);
    }

    this.intervalId = setInterval(updateGameArea, 20);
  },

  clear: function () {
    this.context.clearRect(
      0,
      0,
      this.canvas.width,
      this.canvas.height
    );
  },
};

function flatlander(width, height, x, y, isHappy) {
  this.image = new Image();
  this.isHappy = isHappy;

  if (isHappy) {
    this.happyPoints = 1;
    this.image.src = happySrc;
  } else {
    this.happyPoints = -1;
    this.image.src = sadSrc;
  }

  this.width = width;
  this.height = height;
  this.speedX = Math.random() * 4 - 2;
  this.speedY = Math.random() * 4 - 2;
  this.x = x;
  this.y = y;

  this.update = function () {
    var ctx = myGameArea.context;

    ctx.drawImage(
      this.image,
      this.x,
      this.y,
      this.width,
      this.height
    );

    ctx.fillText(
      this.happyPoints,
      this.x,
      this.y + 5
    );
  };

  this.newPos = function (canvasWidth, canvasHeight) {
    // TODO: Update the x, y position using the this.speedX and this.speedY
    // values of the object. Make sure that when they reach an edge, they
    // bounce back.
    this.x += this.speedX;
    this.y += this.speedY;

    if (this.x <= 0) {
      this.x = 0;
      this.speedX = -this.speedX;
    }

    if (this.x + this.width >= canvasWidth) {
      this.x = canvasWidth - this.width;
      this.speedX = -this.speedX;
    }

    if (this.y <= 0) {
      this.y = 0;
      this.speedY = -this.speedY;
    }

    if (this.y + this.height >= canvasHeight) {
      this.y = canvasHeight - this.height;
      this.speedY = -this.speedY;
    }
  };

  this.moreHappy = function () {
    // TODO: increase the happyPoints value and check if the isHappy flag
    // needs to be updated along with the image being displayed
    this.happyPoints++;

    if (this.happyPoints > 1) {
      this.isHappy = true;
      this.image.src = happySrc;
    }
  };

  this.lessHappy = function () {
    // TODO: decrease the happyPoints value and check if the isHappy flag
    // needs to be updated along with the image being displayed
    this.happyPoints--;

    if (this.happyPoints < 0) {
      this.isHappy = false;
      this.image.src = sadSrc;
    }
  };

  this.checkSurroundings = function (other) {
    var x = Math.pow(this.x - other.x, 2);
    var y = Math.pow(this.y - other.y, 2);

    return Math.sqrt(x + y);
  };
}

function startGame() {
  // TODO: make sure to get all the values from the screen
  var n = parseInt(
    document.getElementById("num").value
  );

  var m = parseInt(
    document.getElementById("sad").value
  );

  if (
    isNaN(n) ||
    isNaN(m) ||
    n <= 0 ||
    m < 0
  ) {
    window.alert(
      "Please enter valid positive integer values."
    );

    return;
  }

  if (parseInt(m) > parseInt(n)) {
    window.alert("Can not have more sad than individuals.");
    return;
  }

  myGamePiece = [];
  myGameArea.timer = 0;
  myGameArea.running = true;

  var sad = 0;

  for (var i = 0; i < n; i++) {
    //var rand = Math.random() * 100;
    // 30% of chance of getting an angry subject
    var nX =
      Math.random() *
      (myGameArea.canvas.width - 30);

    var nY =
      Math.random() *
      (myGameArea.canvas.height - 30);

    var gamePiece = new flatlander(
      30,
      30,
      nX,
      nY,
      ++sad > m
    );

    myGamePiece.push(gamePiece);
  }

  myGameArea.start();
}

function updateGameArea() {
  if (myGameArea.running) {
    myGameArea.clear();

    for (var i = 0; i < myGamePiece.length; i++) {
      myGamePiece[i].newPos(
        myGameArea.canvas.width,
        myGameArea.canvas.height
      );

      myGamePiece[i].update();
    }

    var tmpFocus;
    var d;
    var happy = 0;
    var sad = 0;

    for (var i = 0; i < myGamePiece.length; i++) {
      tmpFocus = myGamePiece[i];

      for (
        var j = i + 1;
        j < myGamePiece.length;
        j++
      ) {
        d = tmpFocus.checkSurroundings(
          myGamePiece[j]
        );

        if (d < maxDist) {
          if (myGamePiece[j].isHappy) {
            tmpFocus.moreHappy();
          } else {
            tmpFocus.lessHappy();
          }
        }
      }

      if (tmpFocus.isHappy) {
        happy++;
      } else {
        sad++;
      }
    }

    myGameArea.timer++;

    document.getElementById(
      "happyIndividuals"
    ).textContent = "Happy: " + happy;

    document.getElementById(
      "sadIndividuals"
    ).textContent = "Sad: " + sad;
  } else {
    return;
  }

  if (happy === 0 || sad === 0) {
    var msg;

    myGameArea.running = false;

    if (myGameArea.intervalId !== null) {
      clearInterval(myGameArea.intervalId);
      myGameArea.intervalId = null;
    }

    if (happy == 0) {
      msg = "Absolute sadness.... SAD!";
    } else {
      msg = "Absolute happiness reached.... Hurray!!";
    }

    document.getElementById("timer").textContent =
      "Time: " +
      myGameArea.timer +
      "       " +
      msg;
  } else {
    document.getElementById("timer").textContent =
      "Time: " + myGameArea.timer;
  }
}