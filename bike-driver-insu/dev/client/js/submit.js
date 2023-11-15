$(function(){

    //소유자 정보 RADIO 
    $('input:radio[name="soyuja"]').change(function(){
        var val = $('input:radio[name="soyuja"]').val();

        var st = $(":input:radio[name=soyuja]:checked").val();

        var id = $(this).attr('id');
       
        if(id=='tain'){
            $(".tain-area").css('display','block');
        }else{
            $(".tain-area").css('display','none');
        }
    });

});