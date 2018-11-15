var $msgModal = $('#msgModal').modal({backdrop : false, show : false, keyboard : false}),
  showMsg = function (header, text, callback) {
    $msgModal
      .find('.modal-header > h3').text(header).end()
      .find('.modal-body').text(text).end()
      .find('.callback-btn').off('click.callback')
        .on('click.callback', callback).end()
      .modal('show');
  },
  headers = ["OMG!!", "WAT", "Alert", "Random Notice"],
  bodies = [
    "Yep...",
    "You're not supposed to do that!",
    "It's over 9000!!!",
    "We're doing it live!"
  ];
  
$('#modalPopper').click(function (e) {
  var d = new Date();
  showMsg(headers[Math.floor(Math.random()*headers.length)],
    bodies[Math.floor(Math.random()*bodies.length)],
    function () {
      console.log("Closing message from event", d, e);
  });
});