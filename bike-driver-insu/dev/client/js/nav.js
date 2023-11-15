/**
 * 
 * Navigation 초기화 
 */

function navgation(par){
    // console.log(par);

    // $('.navigator').css('display','block');
    $('.main-view').css('display','none');
    $('html').animate({scrollTop : 0}, 400);

    if(par==1){
        //보험심사 안내
        $('.bojangPage').css('display','block');
        $('.agree-view').css('display','none');
        $('.user-form').css('display','none');
        $('.formInformation').css('display','none');
        $('.finish-back').css('display','none');
        $('.underwriting-status').css('display','none');
        $('#sub-menu').css('display','none');
    }

    if(par==2){
        //보험심사 안내
        $('.bojangPage').css('display','none');
        $('.agree-view').css('display','block');
        $('.finish-back').css('display','none');
        $('.underwriting-status').css('display','none');
        $('.footer-container').css('display','inline-block')

        // 네비 컨트롤
        $('#sub-menu').css('display','block');
        $('#sub-menu').find('ul').css('justify-content','space-around')
        $('#sub-menu-nav-2').css('display','block');
        $('#sub-menu-divider').css('display','block')
    }

    if(par==3){
        //보험심사 안내
        $('.bojangPage').css('display','none');
        $('.agree-view').css('display','none');
        $('.user-form').css('display','none');
        $('.formInformation').css('display','none');
        $('.finish-back').css('display','none');
        $('.underwriting-status').css('display','block');
        $('.footer-container').css('display','inline-block');
        
        // 네비 컨트롤
        $('#sub-menu').css('display','block');
        $('#sub-menu').find('ul').css('justify-content','center')
        $('#sub-menu-divider').css('display','none')
        $('#sub-menu-nav-2').css('display','none');
     
    }


    
    $('.text-section').css('display','block');
    $('.search-section').css('display','block');

    $('.result-section').css('display','none');
    $('.no-result-section').css('display','none');
    $('#certiCellConfirm').val('');
    $('#certiNumberConfirm').val('');
    $('#resendNumberConfirm').css('display','none');
    $('#sendNumberConfirm').css('display','block');
    $('#sendNumberConfirm').attr('disabled', true);
    $('#certiNumCheckConfirm').attr('disabled', true);
    
    
    //nav 누르면 동의체크 다풀기 
    var unCheck = "img/simg/unchecked.png";
      $('#allChk').attr('src',unCheck);
      $('#firstChk').attr('src',unCheck);
      $('#secondChk').attr('src',unCheck);
      $('#thirdChk').attr('src',unCheck);
      $('#forthChk').attr('src',unCheck);
      $('#fifthChk').attr('src',unCheck);


      //input form 도 모두 초기화 

    $('#certiCell').val('');
    $('#certiNumber').val('');

    $('#certiCellConfirm').val('');
    $('#certiNumberConfirm').val('');

       // 인증번호 재전송도 초기화 

       $('#resendNumber').css('display','none');
       $('#sendNumber').css('display','block');
       $('#resendNumber').attr('disabled', true);

       var stateImg = '/img/simg/basic.png';
       $('.finish-logo').attr('src', stateImg);

      

      

    //보험심사 상태조회
    
}