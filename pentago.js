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
      this.turn = this.turn == 'red' ? 'black' : 'red';

      this.board.rotate_square(rot['sq'], rot['dir']);

      if (this.has_won(col)) {
        alert(col + ' won!');
      }

      return true;
    }

    return false;
  }

  this.has_won = function(col) {
    var spaces = this.board.spaces.filter(function(el) { return el.is_occupied == col });
    var pws = [
      'a1 a2 a3 b1 b2',
      'a2 a3 b1 b2 b3',
      'a4 a5 a6 b4 b5',
      'a5 a6 b4 b5 b6',
      'a7 a8 a9 b7 b8',
      'a8 a9 b7 b8 b9',
      'c1 c2 c3 d1 d2',
      'c2 c3 d1 d2 d3',
      'c4 c5 c6 d4 d5',
      'c5 c6 d4 d5 d6',
      'c7 c8 c9 d7 d8',
      'c8 c9 d7 d8 d9',
      'a1 a4 a7 c1 c4',
      'a4 a7 c1 c4 c7',
      'a2 a5 a8 c2 c5',
      'a5 a8 c2 c5 c8',
      'a3 a6 a9 c3 c6',
      'a6 a9 c3 c6 c9',
      'b1 b4 b7 d1 d4',
      'b4 b7 d1 d4 d7',
      'b2 b5 b8 d2 d5',
      'b5 b8 d2 d5 d8',
      'b3 b6 b9 d3 d6',
      'b6 b9 d3 d6 d9',
      'a1 a5 a9 d1 d5',
      'a5 a9 d1 d5 d9',
      'b3 b5 b7 c3 c5',
      'b5 b7 c3 c5 c7',
      'a2 a6 b7 d2 d6',
      'a4 a8 c3 d4 d8',
      'b2 b4 a9 c2 c4',
      'b6 b8 d1 c6 c8'
    ]

    for (var i = 0; i < pws.length; i += 1) {
      pw = pws[i].split(' ');
      var t = true;

      for (var j = 0; j < pw.length; j += 1) {
        if (spaces.filter(function(el) { return el.loc == pw[j] }).length == 0) {
          t = false;
          break;
        }
      }

      if (t) {
        return true;
      }
    }

    return false;
  }

  this.turn = 'red';
  this.board = new Board();
}