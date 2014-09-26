describe("isCollision", function(){
  it("returns true if ballX and ballY Are on the line.",function(){
    var testLine = Object.create(Line);
    testLine.initialize(0, 0, 4, 4);
    var testBall = Object.create(Ball);
    testBall.initialize(220, 1, "sawtooth", 2, 2, 15, "red", 0.9, 2, 2);
    testLine.isCollision(testBall.x,testBall.y).should.equal(true);
  });
});

