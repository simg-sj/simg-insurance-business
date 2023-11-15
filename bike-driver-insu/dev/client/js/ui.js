$(function(){

  var baseUrl = "https://connect-bike-delion.simginsu.net/api/v1/flex/sms"; // 운영계 // 서버 바뀌면 바뀐 서버에서 ~ 
  // var baseUrl = "https://connect-bike-dev.simginsu.net/api/v1/flex/sms"; // 테스트계 
    // Handler when the DOM is fully loaded
  var unCheck = "img/simg/unchecked.png";
  var check = "img/simg/checked.png";
  var certiNum = "";
  $('#firstChk').click(function(){
    var chk = $('#firstChk').attr('src');
    toggleImg(chk, 'firstChk');

  })
  $('#secondChk').click(function(){
    var chk = $('#secondChk').attr('src');
    toggleImg(chk, 'secondChk');

  })
  $('#thirdChk').click(function(){
    var chk = $('#thirdChk').attr('src');
    toggleImg(chk, 'thirdChk');

  })
  $('#forthChk').click(function(){
    var chk = $('#forthChk').attr('src');
    toggleImg(chk, 'forthChk');

  })
  $('#fifthChk').click(function(){
    var chk = $('#fifthChk').attr('src');
    toggleImg(chk, 'fifthChk');

  })
  $('#allChk').click(function(){
    var chk = $('#allChk').attr('src');
    AlltoggleImg(chk)
  })



  //toggle check img
  function toggleImg(img, id){
    var chk = img;
    var id = '#'+id;
    // console.log(id);
    if(chk == unCheck){
        $(id).attr('src',check);
        
        // 4개 다되면 AlltoggleImg true
        var cnt = 0;
        $(".check-area-simg").find('img').each(function(){
          
          if($(this).attr('src').indexOf("mg/checked") != -1){
            cnt++
          }
          // console.log(cnt)
          if(cnt == 5){
            AlltoggleImg(unCheck)
          }
        });
    }else{
      $(id).attr('src',unCheck);
      // 하나라도 체크풀리면
      $('#sendNumber').attr('disabled', true);
      $('#resendNumber').attr('disabled', true);
      // 4개 하나라도꺼지면 AlltoggleImg false
      var cnt = 0;
      $(".check-area-simg").find('img').each(function(){
        // console.log($(this).attr('src'));
        if($(this).attr('src').indexOf("mg/unchecked") != -1){
          // console.log('일치');
          cnt++
        }
        // console.log(cnt)
        if(cnt > 0){
          $('#allChk').attr('src',unCheck);
        }
      });
    }

  }
  // alltogle
  function AlltoggleImg(img){
    var chk = img;
    var cell = $('#certiCell').val();

    if(chk == unCheck){
      $('#allChk').attr('src',check);
        $('#firstChk').attr('src',check);
        $('#secondChk').attr('src',check);
        $('#thirdChk').attr('src',check);
        $('#forthChk').attr('src',check);
        $('#fifthChk').attr('src',check);
        // $('#sixthChk').attr('src',check);

        // 모두 체크이면서 핸드폰번호가 트루인경우, 인증번호 전송 풀기 
        console.log(cell)
        if(cell){
          $('#sendNumber').attr('disabled', false);
          $('#resendNumber').attr('disabled', false);
        }
        


    }else{
      $('#allChk').attr('src',unCheck);
      $('#firstChk').attr('src',unCheck);
      $('#secondChk').attr('src',unCheck);
      $('#thirdChk').attr('src',unCheck);
      $('#forthChk').attr('src',unCheck);
      $('#fifthChk').attr('src',unCheck);
      // $('#sixthChk').attr('src',unCheck);

      // 하나라도 체크풀리면
      $('#sendNumber').attr('disabled', true);
      $('#resendNumber').attr('disabled', true);
        
    }

  }






  /**
   * 핸드폰 넣으면
   */
  $('#certiCell').keyup(function(){
    var certiCell =  $('#certiCell').val();

    var agreeCnt =0;
    $(".check-area-simg").find('img').each(function(){
      
      if($(this).attr('src').indexOf("mg/checked") != -1){

        agreeCnt++
        
      }else{

      }
      
      
    });

    // console.log(agreeCnt);
    
    // 문자길이 ( 10자리 핸드폰일경우 )
    if(certiCell.length > 10){
      $(this).val($(this).val().slice(0,11)) ;
    }

    // 버튼 disalbed  ( 10자리 핸드폰일경우 )
    if(certiCell.length>9 && agreeCnt==6){
      $('#sendNumber').attr('disabled', false);
      $('#resendNumber').attr('disabled', false);
    }else{
      $('#sendNumber').attr('disabled', true);
      $('#resendNumber').attr('disabled', true);
    }
  })


  /**
   * 인증번호 전송버튼
   * 
   */
  $('#sendNumber').click(function(){
    var ranNum = random_number(100000,999999);
    certiNum = ranNum;

    var certiCell = $('#certiCell').val();

    smsSend(certiCell,ranNum);
    //테스트모드일때
    // var msg = "본인 인증 번호는 [ " + ranNum + " ] 입니다. "    
    // alert(msg);



    $('#resendNumber').css('display','block');
    $('#sendNumber').css('display','none');
    $('#resendNumber').attr('disabled', true);
    $('#certiCell').attr('disabled', true);  // 핸드폰 번호도 묶는다. 수정하지못하도록

    //재전송은 5초뒤에 !!!!!!!!! 7
    setTimeout(function(){
      $('#resendNumber').attr('disabled', false);
    },7000)
  })
  
  
  /**
   * 인증번호 재전송버튼
   * 
   */
  $('#resendNumber').click(function(){
    // console.log('click');
    $('#certiNumber').val('');
    var ranNum = random_number(100000,999999);
    certiNum = ranNum;
    var certiCell = $('#certiCell').val();
    resmsSend(certiCell,ranNum);

    //테스트모드일때
    // var msg = "본인 인증 번호는 [ " + ranNum + " ] 입니다. "    
    // alert(msg);
    
    // $('#resendNumber').css('display','block');
    $('#sendNumber').css('display','none');
    $('#resendNumber').attr('disabled', true);

    //재전송은 5초뒤에 
    setTimeout(function(){
      $('#resendNumber').attr('disabled', false);
    },5000)
  })

  /**
   * 랜덤 번호
   * @param {*} min 
   * @param {*} max 
   */
  function random_number(min, max) {
    return Math.floor(Math.random() * (max + 1 - min) + min);
  }

  /**
   * 인증번호 6자리 타이핑했을때
   */
  $('#certiNumber').keyup(function(){

    var certiNum =  $('#certiNumber').val();
    // console.log(certiNum);
    
    if(certiNum.length > 6){
      $('#certiNumber').val($(this).val().slice(0, 6)) ;
  }

    if(certiNum.length>5){
      $('#certiNum_check').attr('disabled', false);
    }else{
      $('#certiNum_check').attr('disabled', true);
    }
  })
  $("#certiNumber").on("propertychange change keyup paste input", function() {
    var currentVal = $(this).val();
    // console.log(currentVal)
    
    if(currentVal.length > 6){
      $('#certiNumber').val($(this).val().slice(0, 6)) ;
  }

    if(currentVal.length>5){
      $('#certiNum_check').attr('disabled', false);
    }else{
      $('#certiNum_check').attr('disabled', true);
    }
 
    
});
  


  

  /**
   *  SMS 발송하기 
   */
  function smsSend(receiver, num){
    $.ajax({
      /* 서버 바뀌면 바뀐 서버에서 나갈 수 있게 바꿔야함 */
      url: baseUrl,
      type: "POST",
      beforeSend : function(xhr){
          xhr.setRequestHeader("X-API-SECRET", "32A95C3E-C993-42C7-9BE1-5587902093A7");
          xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
      },
      data: {
        cell:receiver,
        code:num
      },
      success: function(data) {
        // console.log(data);
        if(data.rCnt>0){
          alert('인증번호 문자가 전송되었습니다.');
        }
      },
      error: function() {
        // Fail message
        alert('서버오류 : [ 1877-3006 ] 고객센터에 문의바랍니다. ');
      
      },
      
    });
  }
   /**
   *  SMS 발송하기 
   */
  function resmsSend(receiver, num){
    $.ajax({
      url: baseUrl,
      type: "POST",
      beforeSend : function(xhr){
          xhr.setRequestHeader("X-API-SECRET", "0AAC0420-113F-11EC-8F4E-A1358987ECC8");
          xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
      },
      data: {
        cell:receiver,
        code:num
      },
      success: function(data) {
        // console.log(data);
        if(data.rCnt>0){
          alert('인증번호 문자가 재전송되었습니다. [ 1877-3006 ] \n 문자가 수신되지 않을경우 수신거부번호로 등록되어있거나, \n 지연되어 도착하는 경우가 있으니 참고바랍니다.');
        }
      },
      error: function() {
        // Fail message
        alert('서버오류 : [ 1877-3006 ] 고객센터에 문의바랍니다. ');
      
      },
      
    });
  }
  

  
  


  /** 
   * 
   * certiNum_check
   */
  $('#certiNum_check').click(function(){
    var num = $('#certiNumber').val();
    
    if(num == certiNum){
      successFinish();
    }else{
      alert('인증문자가 틀렸습니다. \n 재인증바랍니다.');

    }
  })

  /**
   * 
   * 초기화 하기 
   */
  function initialize(){
    $('#certiNumber').val('');
    $('#certiCell').val('');
    var chk = $('#allChk').attr('src');
    // toggleImg(chk, );
    AlltoggleImg(chk)
  }


  $('.simgTool').tooltip()

  /**
   * 
   * 인증번호 성공시에 
   */
  function successFinish(){
    alert('보험가입 설계를 위하여 \n 양식을 작성해주세요.');
    $('.user-form').css('display','block');
    $('.formInformation').css('display','block');
    $('.agree-view').css('display','none');

    var certiCell = $('#certiCell').val(); //  인증한 핸드폰 번호 
    $('#simg-cell1').val(certiCell.substring(0,3));
    $('#simg-cell2').val(certiCell.substring(3,7));
    $('#simg-cell3').val(certiCell.substring(7,11));
    
    $('#simg-cell1').attr("disabled",true); 
    $('#simg-cell2').attr("disabled",true); 
    $('#simg-cell3').attr("disabled",true); 
    $("html").animate({ scrollTop: 0 }, 400);
 
    initialize(); // 초기화 하기 
  }

})

