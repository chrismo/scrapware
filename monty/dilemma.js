function Card(isGoal) {
  this.goal = !(!isGoal);
}
Card.prototype = {
  isGoal: function() {
    return this.goal;
  }
};

function Stack() {
  this.cards = [
    new Card(),
    new Card(true),
    new Card()
  ];
}
Stack.prototype = {
  length: function() {
    return this.cards.length;
  },

  getAtIndex: function(index) {
    return this.cards[index];
  },

  getGoalCardIndex: function() {
    for (var i = 0; i < this.cards.length; i++) {
      if (this.cards[i].isGoal()) return i;
    }
    throw "illegal stack - no goal card found";
  },

  shuffle: function() {
    var src = this.getGoalCardIndex();
    var dst = src;
    while (dst == src) {
      dst = (Math.floor(Math.random() * 3));
    }
    var goal = this.cards[src];
    this.cards[src] = this.cards[dst];
    this.cards[dst] = goal;
  },

  // unlike getAtIndex, this removes the card from the stack
  pick: function(index) {
    var card = this.getAtIndex(index);
    if (card) {
      this.cards.splice(index, 1);
    }
    return card;
  }

};

function Dilemma(div) {
  this.stack = new Stack();
  this.stack.shuffle();
  this.root = div;
  this.titleTime = 200;
}
Dilemma.prototype = {
  start: function() {
    this.title();
  },

  title: function() {
    // this isn't this inside the callback
    var self = this;

    // The Monty Hall Dilemma
    this.root.innerHTML = '<p id="title" class="title" style="opacity:0.0">Title</p>';
    // TODO can the animate call with queue:false make this synchronous?
    $("#title").fadeTo(this.titleTime, 1.0);
    $("#title").fadeTo(this.titleTime, 0.0, function() {
      self.doors();
    });
  },

  doors: function() {
    var self = this;
    this.root.innerHTML = this.root.innerHTML +
                          '<div id="door0" class="door" ></div>' +
                          '<div id="door1" class="door" ></div>' +
                          '<div id="door2" class="door" ></div>';
    $(".door").click(function(){self.doorSelect(this.id)});
    // TODO - DRY violation
    $("#door0").animate({
      width: "50px", height: "100px", left: "100px", top: "10px"
    }, 1000);
    $("#door1").animate({
      width: "50px", height: "100px", left: "200px", top: "10px"
    }, 1000);
    $("#door2").animate({
      width: "50px", height: "100px", left: "300px", top: "10px"
    }, 1000);
  },

  doorSelect: function(which) {
    var doorsSelector = $(".door");
    doorsSelector.onclick = null;
    this.stack.pick(which);
    $("#" + which).hide(500);
  }

};
