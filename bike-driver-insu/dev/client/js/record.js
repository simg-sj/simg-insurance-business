function record() {
  // var baseUrlUnderwrite = "https://connect-bike.simginsu.net/api/v1/flex/planagree"; // 운영계
  // var baseKey = "325CCBFF-2923-4461-849E-C9D545A4DD4B"; // 운영계
  // var baseUrlUnderwrite = "https://connect-bike-dev.simginsu.net/api/v1/flex/planagree"; // 테스트계
  // var baseKey = "67E86360-DEFC-11EB-9003-8F90302A9C99"; // 테스트계


  // 딜리온 
  var baseUrlUnderwrite = "https://connect-bike-delion.simginsu.net/api/v1/flex/planagree"; // 테스트계
  var baseKey = "32A95C3E-C993-42C7-9BE1-5587902093A7"; // 테스트계

  $.ajax({
    url: baseUrlUnderwrite,
    type: "POST",
    beforeSend: function(xhr) {
      xhr.setRequestHeader(
        "X-API-SECRET",
        baseKey
      );
      xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    },
    data: {
      gubun: "RECORD",
      job:'S',
      webview : "planagree"
    },
    cache: false,
    success: function(data) {
    //   console.log(data);
      
    },
    error: function() {
      
    },
    complete: function() {
      
    }
  });
}
