var pentago;
var refresh

$(document).ready(function() {

  var reset = function() {
    pentago = new Pentago();
  }

  refresh = function() {
    $('#pentago').html('');
    $('.move').text(pentago.turn[0].toUpperCase() + pentago.turn.substr(1, pentago.turn.length-1) + ' to move.')

    var order = [
      [
        'a1 a2 a3', 
        'a4 a5 a6',
        'a7 a8 a9'
      ],
      [
        'b1 b2 b3',
        'b4 b5 b6',
        'b7 b8 b9'
      ],
      [
        'c1 c2 c3',
        'c4 c5 c6',
        'c7 c8 c9'
      ],
      [
        'd1 d2 d3',
        'd4 d5 d6',
        'd7 d8 d9'
      ]
    ]

    for (var i = 0; i < order.length; i += 1) {
      var html = '';
      html += '<div class="block">';

      for (var j = 0; j < order[i].length; j += 1) {
        html += '<div class="row">';
        var row = order[i][j].split(' ');

        for (var k = 0; k < row.length; k += 1) {
          var space = pentago.board.space_at(row[k]);

          html += '<div class="space' + (space.is_occupied ? ' ' + space.is_occupied : '') + '" id="' + space.loc + '"></div>';
        }

        html += '</div>';
      }

      html += '</div>';

      $('#pentago').append(html);
    }

    // for (var i = 0; i < order.length; i += 1) {
    //   var row = order[i].split(' ');
    //   var html = '';
    //   html += '<div class="row">';

    //   for (var j = 0; j < row.length; j += 1) {
    //     var space = pentago.board.space_at(row[j]);

    //     html += '<div class="space' + (space.is_occupied ? ' ' + space.is_occupied : '') + '" id="' + space.loc + '"></div>';
    //   }

    //   html += '</div>';
    //   $('#pentago').append(html);
    // }
  }

  reset();
  refresh();

  var click_helper = function() {
    if (!pentago.board.space_at(this.id).is_occupied) {
      var space = this.id;
      $(this) .addClass(pentago.turn)
      $(document).off('click', '#pentago .space')

      $('.move').text(pentago.turn[0].toUpperCase() + pentago.turn.substr(1, pentago.turn.length-1) + ' to rotate.')
      $(document).on('click', '#pentago .space', function() {
        if (parseInt(this.id[1], 10) % 3 == 1 || parseInt(this.id[1], 10) % 3 == 0) {
        pentago.place_piece(pentago.turn, space, { sq: this.id[0], dir: (parseInt(this.id[1], 10) % 3 == 1 ? 'ccw' : 'cw')  });
        refresh();
        $(document).off('click', '#pentago .space')
        $(document).on('click', '#pentago .space', click_helper)
        }
      })
    }
  }

  $(document).on('click', '#pentago .space', click_helper)
});
