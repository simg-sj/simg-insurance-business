/**
 *
 *
 * 가입 설계 개인정보 수집하는 FORM  관련
 *
 *
 */

$(function() {

  // 배달의 민족 
  // var baseUrlUnderwrite = "https://connect-bike.simginsu.net/api/v1/flex/planagree"; // 운영계
  // var baseKey = "325CCBFF-2923-4461-849E-C9D545A4DD4B"; // 운영계
  // var baseUrlUnderwrite = "https://connect-bike-dev.simginsu.net/api/v1/flex/planagree"; // 테스트계
  // var baseKey = "67E86360-DEFC-11EB-9003-8F90302A9C99"; // 테스트계

  // 딜리온 테스
  var baseUrlUnderwrite = "https://connect-bike-delion.simginsu.net/api/v1/flex/planagree"; // 테스트계
  var baseKey = "32A95C3E-C993-42C7-9BE1-5587902093A7"; // 테스트계


  $('#simg-jumin1').keyup(function(){
    var val =  $('#simg-jumin1').val();
    if(val.length > 6){
      $(this).val($(this).val().slice(0,6)) ;
    }
  });
  $('#simg-jumin2').keyup(function(){
    var val =  $('#simg-jumin2').val();
    if(val.length > 7){
      $(this).val($(this).val().slice(0,7)) ;
    }
  });



  // 차량번호 오른쪽에서 4자리는 무조건 숫자여야하며, 숫자4자리는 무조건 충족해야한다. 
  // simg-carNum
  // 폼제출할때확인



  $("#contactForm input,#contactForm textarea").jqBootstrapValidation({
    preventSubmit: true,
    submitError: function($form, event, errors) {
      // additional error messages or events
    },
    submitSuccess: function($form, event) {
      event.preventDefault(); // prevent default submit behaviour

      var name = $("#simg-name").val();
      var cell1 = $("#simg-cell1").val();
      var cell2 = $("#simg-cell2").val();
      var cell3 = $("#simg-cell3").val();
      var jumin1 = $("#simg-jumin1").val();
      var jumin2 = $("#simg-jumin2").val();
      var carNum = $("#simg-carNum").val();7
      var carType = $(":input:radio[name=simg-carType]:checked").val();
      var jachaMangi = $("#simg-jachaMangi").val();

      var obj = {
        gubun: "planagree",
        name: name,
        cell1: cell1,
        cell2: cell2,
        cell3: cell3,
        jumin1: jumin1,
        jumin2: jumin2,
        carType : carType,
        carNum: carNum,
        dambo: '',
        jachaMangi: jachaMangi,
        soyuja: 'bonin', // 본인만됨 
        relation:'101',
        soyujaName: '',
        soyujaCell1: '',
        soyujaCell2: '',
        soyujaCell3: '',
        soyujaJumin1: '',
        soyujaJumin2: ''
      };
      // console.log(obj);

      // 피보험자 성명
      if (name == "" || name == null || name == undefined) {
        var offset = $("input#simg-name").offset();
        // console.log(offset)
        $("html").animate({ scrollTop: offset.top - 120 }, 400);
        return;
      }

      name = name.toUpperCase();
      // console.log(name);

      // 피보험자 핸드폰번호
      if (cell1 == "" || cell1 == null || cell1 == undefined) {
        var offset = $("#simg-cell1").offset();
        // console.log(offset)
        $("html").animate({ scrollTop: offset.top - 120 }, 400);
        return;
      }

      var regex = /[^0-9]/g;

      if (cell2 == "" || cell2 == null || cell2 == undefined) {
        var offset = $("#simg-cell1").offset();
        // console.log(offset)
        $("html").animate({ scrollTop: offset.top - 120 }, 400);
        return;
      }
      // 수자만 입력하도록 체크

      if (cell3 == "" || cell3 == null || cell3 == undefined) {
        var offset = $("#simg-cell1").offset();
        // console.log(offset)
        $("html").animate({ scrollTop: offset.top - 120 }, 400);
        return;
      }
      // 수자만 입력하도록 체크

      // 피보험자 주민번호
      if (jumin1 == "" || jumin1 == null || jumin1 == undefined) {
        var offset = $("#simg-jumin1").offset();
        // console.log(offset)
        $("html").animate({ scrollTop: offset.top - 120 }, 400);
        return;
      }
      if (jumin1.length<6) {
        var offset = $("#simg-jumin1").offset();
        alert('주민번호 앞자리는 6자리입니다.');
        // console.log(offset)
        $("html").animate({ scrollTop: offset.top - 120 }, 400);
        return;
      }


      if (jumin2 == "" || jumin2 == null || jumin2 == undefined) {
        var offset = $("#simg-jumin1").offset();
        // console.log(offset)
        $("html").animate({ scrollTop: offset.top - 120 }, 400);
        return;
      }
      if (jumin2.length<7) {
        var offset = $("#simg-jumin2").offset();
        alert('주민번호 뒷자리는 7자리입니다.');
        // console.log(offset)
        $("html").animate({ scrollTop: offset.top - 120 }, 400);
        return;
      }

      //주민번호가 00 이아닌데 1이나 2가 아닌경우 
      // console.log(jumin1.charAt(0))
      // console.log(jumin2.charAt(0))
      if(jumin1.charAt(0) != '0'){
        if(jumin2.charAt(0) == '1' || jumin2.charAt(0) == '2' || jumin2.charAt(0) == '5' || jumin2.charAt(0) == '6' ){
            // console.log('valid');
        }else{
          var offset = $("#simg-jumin2").offset();
          $("#simg-jumin2").val('');
          alert('주민번호 뒷자리의 첫째자리는 내국인( 1,2 ) 외국인 ( 5,6 ) 만 가능합니다.');
          // console.log(offset)
          $("html").animate({ scrollTop: offset.top - 120 }, 400);
          return;
        }

        


      }
      // juminValidation(jumin1,jumin2); // validationCheck
      // ssnCheck(jumin1, jumin2)
      var ju = jumin1 + jumin2;
      var re = validRegistrationNumber(ju);
      if(re){
        // console.log(re);
      }else{
        alert('신청자의 주민번호가 유효하지 않습니다.');
        var offset = $("#simg-jumin2").offset();        
        $("html").animate({ scrollTop: offset.top - 120 }, 400);3
        return
      }
      
      


      // 피보험 차량번호
      if (carNum == "" || carNum == null || carNum == undefined) {
        var offset = $("#simg-carNum").offset();
        // console.log(offset)
        $("html").animate({ scrollTop: offset.top - 120 }, 400);
        return;
      }

      // 차량번호 오른쪽에서 4자리는 무조건 숫자여야하며, 숫자4자리는 무조건 충족해야한다. 
      // simg-carNum
      // 폼제출할때확인
      var rightCarNum = carNum.slice(-4);
      // console.log('오른쪽 4자리 :: ', rightCarNum);
      
      var regex= /[^0-9]/g;
      var numChk = regex.test(rightCarNum);
      // console.log(numChk);
      if(numChk){
        var offset = $("#simg-carNum").offset();
        // console.log(offset)
        alert('차량번호 조합은 숫자 + 한글 + 4자리 숫자입니다.');
        $("html").animate({ scrollTop: offset.top - 120 }, 400);

        // console.log(offset)
        return;
      }
      


      // 자차 만기일
      if (jachaMangi == "" || jachaMangi == null || jachaMangi == undefined) {
        var offset = $("#simg-jachaMangi").offset();
        // console.log(offset)
        $("html").animate({ scrollTop: offset.top - 120 }, 400);
        return;
      }




      
      // return  유효성검증 할때만 제외 

      $this = $("#sendMessageButton");
      $this.prop("disabled", true); // Disable submit button until AJAX call is complete to prevent duplicate messages
      $.ajax({
        // url: baseUrlUnderwrite, // 일단 막아둠 [ 2023-11-15 ] 서버세팅해서 해당 서버에서 받아야함
        // url: "https://baemin-api.simgbiz.net/api/flex/planagree",
        type: "POST",
        beforeSend: function(xhr) {
          xhr.setRequestHeader(
            "X-API-SECRET",
            baseKey
          );
          xhr.setRequestHeader(
            "Content-type",
            "application/x-www-form-urlencoded"
          );
        },
        data: obj,
        cache: false,
        success: function(data) {
          // console.log(data);
          // Success message
          if (data[0].rCnt > 0) {
            // $("#success").html("<div class='alert alert-success'>");
            // $("#success > .alert-success")
            //   .html(
            //     "<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;"
            //   )
            //   .append("</button>");
            // $("#success > .alert-success").append(
            //   "<strong>가입신청이 완료되었습니다.</strong>"
            // );
            // $("#success > .alert-success").append("</div>");
            //clear all fields
            $("#contactForm").trigger("reset");

            alert("접수가 완료되었습니다.");
            $(".finish-back").css("display", "block");
            $(".user-form").css("display", "none");
            $(".formInformation").css("display", "none");
            $("html").animate({ scrollTop: 0 }, 400);
            initform();



          } else {
            
            alert(data[0].msg);
            // 다시 초기화 ==> // 동의화면으로 초기화 하기
            $(".agree-view").css("display", "block");
            $(".user-form").css("display", "none");
            $(".formInformation").css("display", "none");

            //nav 누르면 동의체크 다풀기
            var unCheck = "img/simg/unchecked.png";
            $("#allChk").attr("src", unCheck);
            $("#firstChk").attr("src", unCheck);
            $("#secondChk").attr("src", unCheck);
            $("#thirdChk").attr("src", unCheck);
            $("#forthChk").attr("src", unCheck);
            $("#fifthChk").attr("src", unCheck);

            //input form 도 모두 초기화
            $("#certiCell").val("");
            $("#certiNumber").val("");
            $("#certiCellConfirm").val("");
            $("#certiNumberConfirm").val("");

            // 인증번호 재전송도 초기화 

            $('#resendNumber').css('display','none');
            $('#sendNumber').css('display','block');
            $('#resendNumber').attr('disabled', true);
            
            

            // form 초기화
            initform();


          }

          // $(location).attr('href', 'https://baemin-flex.simginsu.net');
        },
        error: function() {
          // Fail message
          $("#success").html("<div class='alert alert-danger'>");
          $("#success > .alert-danger")
            .html(
              "<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;"
            )
            .append("</button>");
          $("#success > .alert-danger").append(
            $("<strong>").text(
              "죄송합니다. " +
                firstName +
                "님, 서버가 응답중에 에러가 발생하였습니다. 잠시후에 다시 시도해주세요!"
            )
          );
          $("#success > .alert-danger").append("</div>");
          //clear all fields
          $("#contactForm").trigger("reset");
        },
        complete: function() {
          setTimeout(function() {
            $this.prop("disabled", false); // Re-enable submit button when AJAX call is complete
          }, 1000);
        }
      });
    },
    filter: function() {
      return $(this).is(":visible");
    }
  });

  $('a[data-toggle="tab"]').click(function(e) {
    e.preventDefault();
    $(this).tab("show");
  });
});

/*When clicking on Full hide fail/success boxes */
$("#name").focus(function() {
  $("#success").html("");
});

function initform(){

  var name = $("#simg-name").val(null);
  var cell1 = $("#simg-cell1").val(null);
  var cell2 = $("#simg-cell2").val(null);
  var cell3 = $("#simg-cell3").val(null);
  var jumin1 = $("#simg-jumin1").val(null);
  var jumin2 = $("#simg-jumin2").val(null);
  var carNum = $("#simg-carNum").val(null);
  $('#certiCell').attr('disabled', false);
  // $('#resendNumber').attr('disabled', false);
  $("#simg-jachaMangi").val(null);
}







function juminValidation(jumin1, jumin2){
  // console.log(jumin1)
  // console.log(jumin2)
  var re = /^[a-zA-Z0-9]{4,12}$/ // 아이디와 패스워드가 적합한지 검사할 정규식
        var re2 = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
        // 이메일이 적합한지 검사할 정규식

        // var num1 = document.getElementById("unum1");
        // var num2 = document.getElementById("unum2");

        var arrNum1 = new Array(); // 주민번호 앞자리숫자 6개를 담을 배열
        var arrNum2 = new Array(); // 주민번호 뒷자리숫자 7개를 담을 배열

        // -------------- 주민번호 -------------

        for (var i=0; i<jumin1.length; i++) {
            arrNum1[i] = jumin1.charAt(i);
        } // 주민번호 앞자리를 배열에 순서대로 담는다.

        for (var i=0; i<jumin2.length; i++) {
            arrNum2[i] = jumin2.charAt(i);
        } // 주민번호 뒷자리를 배열에 순서대로 담는다.

        var tempSum=0;

        for (var i=0; i<jumin1.length; i++) {
            tempSum += arrNum1[i] * (2+i);
        } // 주민번호 검사방법을 적용하여 앞 번호를 모두 계산하여 더함

        for (var i=0; i<jumin2.length-1; i++) {
            if(i>=2) {
                tempSum += arrNum2[i] * i;
            }
            else {
                tempSum += arrNum2[i] * (8+i);
            }
        } // 같은방식으로 앞 번호 계산한것의 합에 뒷번호 계산한것을 모두 더함

        if((11-(tempSum%11))%10!=arrNum2[6]) {
            alert("올바른 주민번호가 아닙니다. [주민번호 유효성 오류]");
            return false;
        }else{
          alert("올바른 주민등록번호 입니다.");
          return true;
        }
}




function ssnCheck(_ssn1, _ssn2)
{
    var ssn1    = _ssn1,
        ssn2    = _ssn2,
        ssn     = ssn1+''+ssn2,
        arr_ssn = [],
        compare = [2,3,4,5,6,7,8,9,2,3,4,5],
        sum     = 0;
 
    // 입력여부 체크
    if (ssn1 == '')
    {
        alert('주민등록번호를 기입해주세요.');
        return false;
    }
 
    if (ssn2 == '')
    {
        alert('주민등록번호를 기입해주세요.');
        return false;
    }    
 
    // 입력값 체크
    if (ssn1.match('[^0-9]'))
    {
        alert("주민등록번호는 숫자만 입력하셔야 합니다."); 
        return false; 
    }
    if (ssn2.match('[^0-9]'))
    {
        alert("주민등록번호는 숫자만 입력하셔야 합니다."); 
        return false; 
    }
 
    // 자리수 체크
    if (ssn.length != 13)
    {
        alert("올바른 주민등록 번호를 입력하여 주세요.");
        return false;
    }    
 
 
    // 공식: M = (11 - ((2×A + 3×B + 4×C + 5×D + 6×E + 7×F + 8×G + 9×H + 2×I + 3×J + 4×K + 5×L) % 11)) % 11
    for (var i = 0; i<13; i++) 
    { 
        arr_ssn[i] = ssn.substring(i,i+1); 
    }
     
    for (var i = 0; i<12; i++)
    {
        sum = sum + (arr_ssn[i] * compare[i]); 
    }
 
    sum = (11 - (sum % 11)) % 10;
     
    if (sum != arr_ssn[12])
    { 
        alert("올바른 주민등록 번호를 입력하여 주세요.");
        return false; 
    }
    alert("올바른 주민번호입니다.");
    return true;
}



// 주민/외국인 등록번호 검사
// 주민/외국인 등록번호 검사
function validRegistrationNumber( rn, type ) {
  // 하이픈이 있을지도 모르니까 날려버리자
  rn = rn.split("-").join('');
  // 13자리 숫자인지 확인해보자, 아니면 꺼져버려
  if( rn.length !== 13 ) return false;

  // 검증값 합계
  var checkSum = 0;
  for(var i=0; i<12; i++) checkSum += ((rn.substr(i,1)>>0)*((i%8)+2));

  // 검증
  var modCheckSum = checkSum%11;    // 검증값 합계의 11의 나머지수
  var rrnMatch = (11-(modCheckSum))%10 == rn.substr(12,1);    // 주민번호 검증
  var frnMatch = (13-(modCheckSum))%10 == rn.substr(12,1);    // 외국인번호 검증

  if( type === 'rrn' ) {
      return rrnMatch;
  }
  else if( type === 'frn' ) {
      return frnMatch;
  }

  // 주민/외국인 여부 상관 없이 등록번호 검사 
  return rrnMatch || frnMatch;
};
