/**
 * 
 * 
 * 심사결과조회 관련 
 * 
 */

$(function(){
var  certiNum = "000000"

var baseUrl = "https://connect-bike-delion.simginsu.net/api/v1/flex/sms"; // 운영계
// var baseUrl = "https://connect-bike-dev.simginsu.net/api/v1/flex/sms"; // 테스트계 

// 배민
  // var baseUrlUnderwrite = "https://connect-bike.simginsu.net/api/v1/flex/planagree"; // 운영계
  // var baseKey = "325CCBFF-2923-4461-849E-C9D545A4DD4B"; // 운영계
  // var baseUrlUnderwrite = "https://connect-bike-dev.simginsu.net/api/v1/flex/planagree"; // 테스트계
  // var baseKey = "67E86360-DEFC-11EB-9003-8F90302A9C99"; // 테스트계

  var baseUrlUnderwrite = "https://connect-bike-delion.simginsu.net/api/v1/flex/planagree"; // 테스트계
  var baseKey = "32A95C3E-C993-42C7-9BE1-5587902093A7"; // 테스트계

/**
   * 핸드폰 넣으면
   */
  $('#certiCellConfirm').keyup(function(){
    var certiCell =  $('#certiCellConfirm').val();


    
    // 문자길이 ( 10자리 핸드폰일경우 )
    if(certiCell.length > 10){
      $(this).val($(this).val().slice(0,11)) ;
    }

    // 버튼 disalbed  ( 10자리 핸드폰일경우 )
    if(certiCell.length>9){
      $('#sendNumberConfirm').attr('disabled', false);
      $('#resendNumberConfirm').attr('disabled', false);
    }else{
      $('#sendNumberConfirm').attr('disabled', true);
      $('#resendNumberConfirm').attr('disabled', true);
    }
  })

   /**
   * 인증번호 6자리 타이핑했을때
   */
    var currentVal = $(this).val();
    $('#certiNumberConfirm').keyup(function(){

    var certiNum =  $('#certiNumberConfirm').val();
    // console.log(certiNum);
    
    if(certiNum.length > 6){
      $('#certiNumberConfirm').val($(this).val().slice(0, 6)) ;
  }

    if(certiNum.length>5){
      $('#certiNum_check').attr('disabled', false);
    }else{
      $('#certiNum_check').attr('disabled', true);
    }
  })
  $("#certiNumberConfirm").on("propertychange change keyup paste input", function() {
    var currentVal = $(this).val();
    // console.log(currentVal)
    
    if(currentVal.length > 6){
      $('#certiNumberConfirm').val($(this).val().slice(0, 6)) ;
  }

    if(currentVal.length>5){
      $('#certiNum_check').attr('disabled', false);
    }else{
      $('#certiNum_check').attr('disabled', true);
    }
 
    
});







  /**
   * 인증번호 전송버튼
   * 
   */
  $('#sendNumberConfirm').click(function(){
    var ranNum = random_number(100000,999999);
    certiNum = ranNum;

    var certiCell = $('#certiCellConfirm').val();

    smsSendConfirm(certiCell,ranNum);
    //테스트모드일때
    // var msg = "본인 인증 번호는 [ " + ranNum + " ] 입니다. "    
    // alert(msg);



    $('#resendNumberConfirm').css('display','block');
    $('#sendNumberConfirm').css('display','none');
    $('#resendNumberConfirm').attr('disabled', true);

    //재전송은 5초뒤에 
    setTimeout(function(){
      $('#resendNumberConfirm').attr('disabled', false);
    },5000)
  })
  
  
  /**
   * 인증번호 재전송버튼
   * 
   */
  $('#resendNumberConfirm').click(function(){
    // console.log('click');
    $('#certiNumberConfirm').val('');
    var ranNum = random_number(100000,999999);
    certiNum = ranNum;
    var certiCell = $('#certiCellConfirm').val();
    resmsSendConfirm(certiCell,ranNum);

    //테스트모드일때
    // var msg = "본인 인증 번호는 [ " + ranNum + " ] 입니다. "    
    // alert(msg);
    
    // $('#resendNumber').css('display','block');
    $('#sendNumberConfirm').css('display','none');
    $('#resendNumberConfirm').attr('disabled', true);

    //재전송은 5초뒤에 
    setTimeout(function(){
      $('#resendNumberConfirm').attr('disabled', false);
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
  $('#certiNumberConfirm').keyup(function(){
    var certiNum =  $('#certiNumberConfirm').val();
    // console.log(certiNum);
    
    if(certiNum.length > 6){
      $('#certiNumberConfirm').val($(this).val().slice(0, 6)) ;
  }

    if(certiNum.length>5){
      $('#certiNumCheckConfirm').attr('disabled', false);
    }else{
      $('#certiNumCheckConfirm').attr('disabled', true);
    }
  })

  


  
 
  /**
   *  SMS 발송하기 
   */
  function smsSendConfirm(receiver, num){
    $.ajax({
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
  function resmsSendConfirm(receiver, num){
    $.ajax({
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
  $('#certiNumCheckConfirm').click(function(){
    var num = $('#certiNumberConfirm').val();
    // console.log('확인번호', certiNum);
    // console.log('인증번호', num);
    
    if(num == certiNum){
      resultSearch()


    }else{
      alert('인증문자가 틀렸습니다. \n 재인증바랍니다.');

    }
  })
    
  function resultSearch(){
    var cell = $('#certiCellConfirm').val();
    var obj = {
      gubun : 'search',
      cell : cell,
      
  }


  $.ajax({
    url: baseUrlUnderwrite,
    // url: "https://baemin-api.simgbiz.net/api/flex/planagree",
    type: "POST",
    beforeSend : function(xhr){
        xhr.setRequestHeader("X-API-SECRET", baseKey);
        xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    },
    data: obj,
    cache: false,
    success: function(data) {
      // console.log(data);
      // Success message
      if(data[0]){
        // 전환하기 
        // 조회 결과안내 
        afterResult(data[0]);
      }else{
        // alert('삼사중인 결과가 없습니다.');
        resetForm();
        
      }

      
      // $(location).attr('href', 'https://baemin-flex.simginsu.net');

    },
    error: function() {
      // Fail message
    
    },
    complete: function() {
      setTimeout(function() {
        $this.prop("disabled", false); // Re-enable submit button when AJAX call is complete
      }, 1000);
    }
  });

  }


  function afterResult(data){
    console.log(data);
    $('html').animate({scrollTop : 0}, 400);
    $('.result-section').css('display','block');
    $('.text-section').css('display','none');
    $('.search-section').css('display','none');
    $('#nameTxt').empty().append(data.bdName);
    
    var dambo = '이륜차 시간제 보험';
    

    $('#damboTxt').empty().append(dambo);
    $('#requestTxt').empty().append(data.created);

    var state = '';
    var stateImg = '/img/simg/accepted.png';

    switch(data.pState){
      case 'READY':
      state = '심사요청';
      stateImg = '/img/simg/error.png';
      break;
      case 'UNDERWRITE':
      state = '심사중'
      stateImg = '/img/simg/error.png';
      break;
      case 'DELAY':
      state = '서류요청중 [*서류요청 요인]'+
      '<br>- 신청자의 정보와 보험개발원에서 조회한 정보가 불일치한 경우'+
      '<br>- 이륜차량의 종합보험내역이 조회가 되지않는 경우';
      // '<br>- 프로미카 자기차량손해담보가입을 하신경우에 신청차량의 종함보험내역에서 자기차량손해담보가 없는경우';
      
      stateImg = '/img/simg/error.png';
      break;
      case 'ACCEPTED':
      state = '심사통과'
      stateImg = '/img/simg/accepted.png';
      break;
      case 'REJECTED':
      state = '심사거절 [*주요인수 기준]<br>1.연령 만 26~65세' + '<br>2.사고다발 유형'+ '<br>3.음주 및 무면허'+ '<br>4.중대과실 경력'+'<br>5.보험가입 경력 부족'
      +'<br>6.신청한 자동차의 자가용 보험 부재'
      +'<br>7.신청정보의 적합성 오류'
      +'<br>8.가입불가 차량';
      // +'<br>9.자차담보신청시 개인종합보험의 자차담보부재';
      stateImg = '/img/simg/rejected.png';
      break;
      case 'ERROR':
      state = '심사거절 <br>- 신청 이력정보중 부정확한 정보혹은 가입불가의 정보가 입력되었습니다. <br>- 세부내역은 문의부탁드립니다.'
      stateImg = '/img/simg/rejected.png';
      break;
    }

    if(state =='심사통과'){
      if(!data.signYN){
        state = '심사통과 [ 내부절차 진행중 입니다. ]'
      }
    }
    


    if(state == ''){
      state = '별도의 안내필요, 안내가 진행됩니다.'
    }

    if(data.pState=='READY' && data.dSoyuja=='tain' && data.otherAgreeYN !='Y'){
      state = '신청자의 차량이 타인의 소유차량이므로 차주의 동의가 필요합니다.'
      +'<br>[차주동의 절차] '
      +'<br>1.신청시점에 차주에게 동의요청 문자혹은 알림톡이 발송되었습니다. '
      +'<br>2.해당 문자혹은 알림톡에 있는 URL을 통해서 차주께서 동의이후에 가입절차가 진행됩니다.'
      +'<br>3.차주께서 동의하시면 신청자에게 심사절차가 진행된다는 안내가 전송됩니다.'

    }


    $('#pStateTxt').empty().append(state);
    $('.finish-logo').attr('src', stateImg);
  }
  function resetForm(){
    $('.text-section').css('display','none');
    $('.search-section').css('display','none');
    $('.no-result-section').css('display','block');
    $('#certiCellConfirm').val('');
    $('#certiNumberConfirm').val('');
    $('#resendNumberConfirm').css('display','none');
    $('#sendNumberConfirm').css('display','block');
    $('#sendNumberConfirm').attr('disabled', true);
  }
  
  
})
