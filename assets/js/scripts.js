$(document).ready(function () {

    $('.card .card-price ul.additional-info li:last-child a').click(function(e){
        e.preventDefault();
        console.log('working');
        $(this).toggleClass('active');
        $(this).parent().parent().parent().parent().find('.card-overlay').toggleClass('open');
        $(this).parent().parent().parent().parent().parent().toggleClass('open');
        if($(this).hasClass('active')){
            $(this).find('i').removeClass('fa-ellipsis-h').addClass('fa-caret-down');
        }else{
            $(this).find('i').removeClass('fa-caret-down').addClass('fa-ellipsis-h');
        }
    });

    /*$('.readmore a').click(function(e){
        e.preventDefault();
        console.log('working');
        $(this).parent().parent().parent().find('.block.details').toggle();
    });*/

});