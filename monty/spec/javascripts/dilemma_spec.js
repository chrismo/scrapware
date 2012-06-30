// TODO - there's no error handling tests here - but 'meh' for now

describe('Card', function() {
  it('should default to not being the goal card', function() {
    expect(new Card().isGoal()).toEqual(false);    
  });

  it('should only set the goal through the constructor', function() {
    var card = new Card(true);
    expect(card.isGoal()).toEqual(true);
  });
});

describe('Stack', function() {
  it('should default to 3 cards with the middle card set to the goal', function() {
    var stack = new Stack();
    expect(stack.length()).toEqual(3);
    expect(stack.getAtIndex(1).isGoal()).toEqual(true);
  });

  it('should shuffle the stack', function() {
    var stack = new Stack();
    var goalIndexBefore = stack.getGoalCardIndex();
    stack.shuffle();
    expect(stack.getGoalCardIndex()).not.toEqual(goalIndexBefore);
  });

  it('should pick a card and remove it from the stack', function() {
    var stack = new Stack();
    expect(stack.pick(1).isGoal()).toBeTruthy();
    expect(stack.length()).toEqual(2);
    expect(stack.getAtIndex(0).isGoal()).toBeFalsy();
    expect(stack.getAtIndex(1).isGoal()).toBeFalsy();
  });
});