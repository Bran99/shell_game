var game = {
  gameStopped: true,
  $table: $('#table ul'),
  location: ['one', 'two', 'three'],
  cupsNames: ['first', 'second', 'third'],
  cups: [],
  score: 0,
  level: 1,
  transition: 0.25,

  init: function () {
    if(this.gameStopped === true){
      $('#start').on('click', function (e) {
        $('.cup').css('transition', 'transform ' + this.transition + 's ease');
        $('#score').html('Score: ' + this.score);
        $('#level').html('Level: ' + this.level);
        $('#ball').addClass('active');
        $('.two').addClass('ball');
        setTimeout(function(){
          $('#ball').addClass('fadeOut');
        }.bind(game), this.transition * 1000);
        setTimeout(function(){
          this.startShit();
        }.bind(this), this.transition * 2000);
      }.bind(this));

      this.gameStopped = false;
    };

    for(var i = 0; i < this.cupsNames.length; i++) {
      this.cupsNames[i] = new Cup(this.location[i]);
      this.cupsNames[i].render();
    }
  },

  randomTwo: function () {
    var loc1 = this.cupsNames[Math.floor(Math.random() * 3)];
    var loc2 = this.cupsNames[Math.floor(Math.random() * 3)];

    while (loc1 === loc2) {
      loc2 = this.cupsNames[Math.floor(Math.random() * 3)];
    }

    temp = loc1.location;

    loc1.move(loc2.location);
    loc2.move(temp);
  },

  startShit: function () {
    var timerID = setInterval(function (){
      this.randomTwo();
    }.bind(this), this.transition * 2000);
    setTimeout(function () {
      clearInterval(timerID);
      this.finishGame();
    }.bind(this), this.transition * 80000);
  },

  finishGame: function () {
    $('.ball').on('click', function () {
      $('#ball').removeClass('fadeOut');
      $('#ball').removeClass('active');
      alert('You win!');
      this.updateScore();
      this.gameStopped = true;
    }.bind(this));
  },

  updateScore: function () {
    this.score += 10;
    this.level += 1;
    $('#score').html('Score: ' + this.score);
    $('#level').html('Level: ' + this.level);
  }
};

var Cup = function (location) {
  this.$el = $('<li>');
  this.location = location;
  this.$el.addClass('cup').addClass(location);
};

Cup.prototype.render = function () {
  $('#append-here').append(this.$el);
}

Cup.prototype.move = function (location) {
  this.$el.removeClass(this.location);
  this.location = location;
  this.$el.addClass(this.location);
}


game.init();
