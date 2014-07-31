var pentago;
var refresh

$(document).ready(function() {

  var reset = function() {
    pentago = new Pentago();
  }

  refresh = function() {
    $('#pentago').html('');

    var order = ['a1 a2 a3 b1 b2 b3',
                 'a4 a5 a6 b4 b5 b6',
                 'a7 a8 a9 b7 b8 b9',
                 'c1 c2 c3 d1 d2 d3',
                 'c4 c5 c6 d4 d5 d6',
                 'c7 c8 c9 d7 d8 d9']

    for (var i = 0; i < order.length; i += 1) {
      var row = order[i].split(' ');
      var html = '';
      html += '<div class="row">';

      for (var j = 0; j < row.length; j += 1) {
        var space = pentago.board.space_at(row[j]);

        html += '<div class="space' + (space.is_occupied ? ' ' + space.is_occupied : '') + '" id="' + space.loc + '"></div>';
      }

      html += '</div>';
      $('#pentago').append(html);
    }
  }

  reset();
  refresh();

  var click_helper = function() {
    if (!pentago.board.space_at(this.id).is_occupied) {
      var space = this.id;
      $(this) .addClass(pentago.turn)
      $(document).off('click', '#pentago .space')
      $(document).on('click', '#pentago .space', function() {
        pentago.place_piece(pentago.turn, space, { sq: this.id[0], dir: 'cw' });
        refresh();
        $(document).off('click', '#pentago .space')
        $(document).on('click', '#pentago .space', click_helper)
      })
    }
  }

  $(document).on('click', '#pentago .space', click_helper)
});