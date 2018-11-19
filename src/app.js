$('form').submit(function () {

    var name = $.trim($('#user').val());
    var tipo = $.trim($('#tipo').val());


    if (name  === '') {
        $.trim($('#message').text("El usuario es requerido"));
        $('#myModal').modal('show')
        //alert('El usuario es obligatorio.');
        return false;
    }
});