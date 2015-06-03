var gameStopped = true;

if(gameStopped === true){
  $('#start').on('click', function (e) {
    $('#ball').addClass('active');
    $('.two').addClass('ball');
    setTimeout(function(){
      $('#ball').addClass('fadeOut');
    }, 1000);
  });
  gameStopped = false;
}

// function randomize () {
//   function firstOne {
//
//   }
//   $table = $('#table');
//   $cups = $('.cup');
//
// }
//
var game = {
  $table: $('#table ul'),
  location: ['one', 'two', 'three'],
  cupsNames: ['first', 'second', 'third'],
  cups: [],


  randomTwo: function () {
    var loc1 = this.cupsNames[Math.floor(Math.random() * 3)];
    var loc2 = this.cupsNames[Math.floor(Math.random() * 3)];

    while (loc1 === loc2) {
      loc2 = this.cupsNames[Math.floor(Math.random() * 3)];
    }
    var first = this.cupsNames.indexOf(loc1);
    var second = this.cupsNames.indexOf(loc2);
    this.cupsNames[first].location = loc2;
    this.cupsNames[second].location = loc1;
  },


  init: function () {
    if(gameStopped === true){
      $('#start').on('click', function (e) {
        $('#ball').addClass('active');
        $('.two').addClass('ball');
        setTimeout(function(){
          $('#ball').addClass('fadeOut');
        }, 1000);
      });
      gameStopped = false;
    };

    for(var i = 0; i < this.cupsNames.length; i++) {
      this.cupsNames[i] = new Cup(this.location[i]);
      this.cupsNames[i].render();
    }
  }
};

var Cup = function (location) {
  this.$el = $('<li>');
  this.location = location;
  this.$el.addClass('cup').addClass(location);
  if(location === 'two'){
    this.$el.addClass('#ball');
  }
};

Cup.prototype.render = function () {
  $('#append-here').append(this.$el);
}


game.init();
