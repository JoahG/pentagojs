var Pentago = function() {
  var Space = function(coor) {
    this.is_occupied = false;
    this.loc = coor;
  }

  var Board = function() {
    this.spaces = [];

    this.init = function() {
      this.spaces = [];

      var t = 'abcd'.split('');
      var s = '123456789'.split('');

      for (var i = 0; i < t.length; i += 1) {
        for (var j = 0; j < s.length; j += 1) {
          this.spaces.push(new Space(t[i] + s[j]));
        }
      }
    }

    this.space_at = function(coor) {
      return this.spaces.filter(function(el) { return el.loc == coor })[0] || false;
    }

    this.rotate_square = function(sq, dir) {
      var spaces = this.spaces.filter(function(el) { return el.loc[0] == sq });

      for (var i = 0; i < spaces.length; i += 1) {
        var space = spaces[i];
        var v = space.loc[1];

        if (dir == 'cw') {
          if (v == '1') {
            v = '3'
          } else if (v == '2') {
            v = '6';
          } else if (v == '3') {
            v = '9';
          } else if (v == '4') {
            v = '2';
          } else if (v == '6') {
            v = '8';
          } else if (v == '7') {
            v = '1';
          } else if (v == '8') {
            v = '4';
          } else if (v == '9') {
            v = '7'
          }
        } else if (dir == 'ccw') {
          if (v == '1') {
            v = '7'
          } else if (v == '2') {
            v = '4';
          } else if (v == '3') {
            v = '1';
          } else if (v == '4') {
            v = '8';
          } else if (v == '6') {
            v = '2';
          } else if (v == '7') {
            v = '9';
          } else if (v == '8') {
            v = '6';
          } else if (v == '9') {
            v = '3'
          }
        }

        space.loc = space.loc[0] + v;
      }

      return true;
    }

    this.init();
  }

  this.place_piece = function(col, coor, rot) {
    var space = this.board.space_at(coor);
    if (!space.is_occupied && col == this.turn) {
      space.is_occupied = col;
      this.turn = this.turn == 'white' ? 'black' : 'white';

      this.board.rotate_square(rot['sq'], rot['dir']);

      return true;
    }

    return false;
  }

  this.turn = 'white';
  this.board = new Board();
}