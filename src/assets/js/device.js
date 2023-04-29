
function getLocation() {

  var lat = document.getElementById("geolocationlat");
  var long = document.getElementById("geolocationlong");

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
}

function showPosition(position) {

  $("#geolocationlat").val(position.coords.latitude);  
  $("#geolocationlong").val(position.coords.longitude);

}

function Capture(){

  var device =  'Mantra MFS 100';   //$("#device").val();
  //alert(device);return false;
  if(device == "not_selected"){
      swal("warning","Please select device","warning");
  }

  if(device == "Mantra MFS 100"){
    console.log("yes this device found");
      discoverMantraAvdm();
      CaptureMantraAvdm();
  }

  if(device == "Startek FM 220U"){
      discoverStartekAvdm();
      CaptureStartekAvdm();
  }

  if(device == "Morpho MSO 1300"){
      discoverMorphoAvdm();
      CaptureMorphoAvdm();
  }

}

/*
sending data on submit button

function Capture(data){

  console.log("js called");
  console.log(data);

  var device = $("#device").val();
  //alert(device);return false;
  if(device == "not_selected"){
      swal("warning","Please select device","warning");
  }

  if(device == "Mantra MFS 100"){
      discoverMantraAvdm();
      CaptureMantraAvdm();
  }

  if(device == "Startek FM 220U"){
      discoverStartekAvdm();
      CaptureStartekAvdm();
  }

  if(device == "Morpho MSO 1300"){
      discoverMorphoAvdm();
      CaptureMorphoAvdm();
  }

}

*/

function discoverMantraAvdm() {
console.log("comes here")
  var GetCustomDomName = "127.0.0.1";
  var SuccessFlag = 0;
  var primaryUrl = "http://" + GetCustomDomName + ":";

  try {
    var protocol = window.location.href;
    if (protocol.indexOf("https") >= 0) {
      primaryUrl = "https://" + GetCustomDomName + ":";
    }
  } catch (e) {}

  url = "";

  SuccessFlag = 0;
  for (var i = 11100; i <= 11112; i++) {
    console.log("Discovering RD service on port : " + i.toString());
    var verb = "RDSERVICE";
    var err = "";

    var res;
    $.support.cors = true;
    var httpStaus = false;
    var jsonstr = "";
    var data = new Object();
    var obj = new Object();

    $.ajax({
      type: "RDSERVICE",
      async: false,
      crossDomain: true,
      url: primaryUrl + i.toString(),
      contentType: "text/xml; charset=utf-8",
      processData: false,
      cache: false,
      crossDomain: true,

      success: function (data) {
        httpStaus = true;
        res = {
          httpStaus: httpStaus,
          data: data
        };
        //alert(data);
        $("#txtDeviceInfo").val(data);
        finalUrl = primaryUrl + i.toString();
        var $doc = $.parseXML(data);//$data
  debugger;
        var CmbData1 = $($doc).find('RDService').attr('status');
        var CmbData2 = $($doc).find('RDService').attr('info');
      
         if(RegExp('\\b'+ 'Mantra' +'\\b').test(CmbData2)==true  ||  RegExp('\\b'+ 'Morpho_RD_Service' +'\\b').test(CmbData2)==true  ||  RegExp('\\b'+ 'SecuGen India Registered device Level 0' +'\\b').test(CmbData2)==true ||  RegExp('\\b'+ 'Precision - Biometric Device is ready for capture' +'\\b').test(CmbData2)==true ||  RegExp('\\b'+ 'RD service for Startek FM220 provided by Access Computech' +'\\b').test(CmbData2)==true ||  RegExp('\\b'+ 'NEXT' +'\\b').test(CmbData2)==true  ){
   
   debugger;
        console.log($($doc).find('Interface').eq(0).attr('path'));
      
        if(RegExp('\\b'+ 'Mantra' +'\\b').test(CmbData2)==true){
        
                if($($doc).find('Interface').eq(0).attr('path')=="/rd/capture")
                {
                  MethodCapture=$($doc).find('Interface').eq(0).attr('path');
                }
                if($($doc).find('Interface').eq(1).attr('path')=="/rd/capture")
                {
                  MethodCapture=$($doc).find('Interface').eq(1).attr('path');
                }
                if($($doc).find('Interface').eq(0).attr('path')=="/rd/info")
                {
                  MethodInfo=$($doc).find('Interface').eq(0).attr('path');
                }
                if($($doc).find('Interface').eq(1).attr('path')=="/rd/info")
                {
                  MethodInfo=$($doc).find('Interface').eq(1).attr('path');
                }
        }else if(RegExp('\\b'+ 'Morpho_RD_Service' +'\\b').test(CmbData2)==true){
                MethodCapture=$($doc).find('Interface').eq(0).attr('path');
                MethodInfo=$($doc).find('Interface').eq(1).attr('path');
        }else if(RegExp('\\b'+ 'SecuGen India Registered device Level 0' +'\\b').test(CmbData2)==true){
                MethodCapture=$($doc).find('Interface').eq(0).attr('path');
                MethodInfo=$($doc).find('Interface').eq(1).attr('path');
        }else if(RegExp('\\b'+ 'Precision - Biometric Device is ready for capture' +'\\b').test(CmbData2)==true){
                MethodCapture=$($doc).find('Interface').eq(0).attr('path');
                MethodInfo=$($doc).find('Interface').eq(1).attr('path');
        }else if(RegExp('\\b'+ 'RD service for Startek FM220 provided by Access Computech' +'\\b').test(CmbData2)==true){
                MethodCapture=$($doc).find('Interface').eq(0).attr('path');
                MethodInfo=$($doc).find('Interface').eq(1).attr('path');
        }else if(RegExp('\\b'+ 'NEXT' +'\\b').test(CmbData2)==true){
                MethodCapture=$($doc).find('Interface').eq(0).attr('path');
                MethodInfo=$($doc).find('Interface').eq(1).attr('path');
        }

        if(CmbData1=='READY')
        { 
         
            $('#method').val( finalUrl+MethodCapture);
            $('#info').val( finalUrl+MethodInfo);
         
          SuccessFlag=1;
          
              alert("Device detected successfully");            
          return false;
        }
        else if(CmbData1=='USED')
        { 
           $('#method').val( finalUrl+MethodCapture);
           $('#info').val( finalUrl+MethodInfo);
         
          SuccessFlag=1;
          
           alert("Device detected successfully");
               
            
          return false;
        }
        
        
        else if(CmbData1=='NOTREADY')
        {
          alert("Device Not Discover");
          return false;               
        } 
      }

      },
      error: function (jqXHR, ajaxOptions, thrownError) {
        if (i == "8005" && OldPort == true) {
          OldPort = false;
          i = "11099";
        }
      },

    });

    if (SuccessFlag == 1) {
      break;
    }
  }

  if (SuccessFlag == 0) {
    alert("Connection failed Please try again.");
  } else {
    //alert("RDSERVICE Discover Successfully");
  }
  $("select#ddlAVDM").prop('selectedIndex', 0);
  return res;
};

function CaptureMantraAvdm()
{

  DString = '';
  device="mantra";

  var strWadh="";
  var strOtp="";

  // var XML='<?xml version="1.0"?> <PidOptions ver="1.0"> <Opts fCount="1" fType="0" iCount="0" pCount="0" format="0" pidVer="2.0" timeout="10000" posh="UNKNOWN" env="PP" /> '+DString+'<CustOpts><Param name="mantrakey" value="" /></CustOpts> </PidOptions>';
 var XML ='<?xml version="1.0"?> <PidOptions ver="1.0"> <Opts fCount="1" fType="0" iCount="0" pCount="0" pgCount="2" format="0"   pidVer="2.0" timeout="10000" pTimeout="20000" posh="UNKNOWN" env="P" /> <CustOpts><Param name="mantrakey" value="" /></CustOpts> </PidOptions>'
  var finUrl=  $('#method').val();
  console.log("capture admin called");
  var verb = "CAPTURE";
  var err = "";
  var res;

  $.support.cors = true;
  var httpStaus = false;
  var jsonstr="";
        
    $.ajax({
    type: "CAPTURE",
    async: false,
    crossDomain: true,
    // url: finUrl,
    url: "https://127.0.0.1:11100/rd/capture",

    data:XML,
    contentType: "text/xml; charset=utf-8",
    processData: false,
    success: function (data) {
      
      if(device == "morpho"){
         var xmlString = (new XMLSerializer()).serializeToString(data);  //morpho
      }else if(device == "mantra"){
        var xmlString = data;  //mantra
      }else if(device == "secugen"){
        var xmlString = (new XMLSerializer()).serializeToString(data);  //secugen
      }else if(device == "precision"){
        var xmlString = (new XMLSerializer()).serializeToString(data);  //precision
      }else if(device == "startek"){
        var xmlString = (new XMLSerializer()).serializeToString(data);  //startek
      }else if(device == "nextrd"){
          var xmlString = (new XMLSerializer()).serializeToString(data);  //next rd
      }
      httpStaus = true;
      res = { httpStaus: httpStaus, data: xmlString};
      
      console.log(res);


      $('#txtPidData').val(xmlString); 
      //console.log(xmlString);                                 
      var $doc = data;
      var Message =  $($doc).find('Resp').attr('errInfo');
      var errorcode =  $($doc).find('Resp').attr('errCode');
      

      var $docdata = $.parseXML(xmlString);
      //console.log($docdata);
      var ci = $($docdata).find('Skey').attr('ci');
      $('#txtCi').val(ci);

      console.log("Messagae ; "+Message);
      console.log("error code: "+errorcode)

        if(errorcode==0)
        {

          var $doc = $.parseXML(data);
          var Message =  $($doc).find('Resp').attr('errInfo');
          
          //alert(Message);
          
        }else{
          $('#loaderbala').css("display","none");
          alert('Capture Failed');
          //window.location.reload();
        } 

    },
    error: function (jqXHR, ajaxOptions, thrownError) {
      //$('#txtPidOptions').val(XML);
      alert(thrownError);
      res = { httpStaus: httpStaus, err: getHttpError(jqXHR) };
    },
  });

  return res;

}

/* STARTEK DEVICE FUNCTIONS*/

function discoverStartekAvdm() {

  //alert("here");
    
  var port;
  var customDomainName = "127.0.0.1";
  var SuccessFlag = 0;
  var urlStr = "http://" + customDomainName + ":";

  for(var i = 11102; i <= 11110; i++) {
      var url = urlStr+ i.toString();
      //alert(url);return false;

      $.ajax({

        type: "RDSERVICE",
        async: false,
        crossDomain: true,
        url: url,
        contentType: "text/xml; charset=utf-8",
        processData: false,
        cache: false,
        crossDomain: true,

        success: function (data) {

          var xmlString = (new XMLSerializer()).serializeToString(data);
          $("#txtDeviceInfo").val(xmlString);
          var xmlDoc = $.parseXML(data);//$data

          $doc = $(xmlDoc);
          debugger;
          var CmbData1 = $(data).find('RDService').attr('status');
          var CmbData2 = $(data).find('RDService').attr('info');
          if(CmbData1=='READY')
          { 
            //$('#method').val( url+MethodCapture);
            //$('#info').val( url+MethodInfo);
            SuccessFlag=1;
            alert("Device detected successfully");
            return false;
          }else{
            alert("Device Not Discover");
            return false; 
          }

        },

      });
      //alert(SuccessFlag);
      if(SuccessFlag == 1) {
        break;
      }
      break;
  }
  
  if (SuccessFlag == 0) {
    alert("Connection failed Please try again.");
  } 

}

function CaptureStartekAvdm() {
  
  DString = '';
  device="startek";

  var strWadh="";
  var strOtp="";

  var XML='<?xml version="1.0"?> <PidOptions ver="1.0"> <Opts fCount="1" fType="0" iCount="0" pCount="0" format="0" pidVer="2.0" timeout="10000" posh="UNKNOWN" env="S" /> '+DString+'<CustOpts><Param name="mantrakey" value="" /></CustOpts> </PidOptions>';
  var finUrl=  'http://localhost:11102/rd/capture';

  var verb = "CAPTURE";
  var err = "";
  var res;

  $.support.cors = true;
  var httpStaus = false;
  var jsonstr="";
        
    $.ajax({

    type: "CAPTURE",
    async: false,
    crossDomain: true,
    url: finUrl,
    data:XML,
    contentType: "text/xml; charset=utf-8",
    processData: false,
    success: function (data) {
      
      var xmlString = (new XMLSerializer()).serializeToString(data);
      //alert(xmlString);
      httpStaus = true;
      res = { httpStaus: httpStaus, data: xmlString};
  
      $('#txtPidData').val(xmlString);                                  
      var $doc = data;
      var Message =  $(data).find('Resp').attr('errInfo');
      var errorcode =  $(data).find('Resp').attr('errCode');
        if(errorcode==0)
        {

          var $doc = $.parseXML(data);
          var Message =  $(data).find('Resp').attr('errInfo');
          
          alert(Message);
          
        }else{
          $('#loaderbala').css("display","none");
          alert('Capture Failed');
          window.location.reload();
        } 

    },
    error: function (jqXHR, ajaxOptions, thrownError) {
      //$('#txtPidOptions').val(XML);
      alert(thrownError);
      res = { httpStaus: httpStaus, err: getHttpError(jqXHR) };
    },
  });

  return res;

}

function discoverMorphoAvdm() {

  // New
        var GetCustomDomName = "127.0.0.1";
    
    //var GetCustomDomName = "localhost";
    
    
        // if ($("#txtSSLDomName").val().trim().length > 0) {
        //   GetCustomDomName = $("#txtSSLDomName").val().trim();
        // }

        // openNav();

        // $('#txtWadh').val('');
        // $('#txtDeviceInfo').val('');
        // $('#txtPidOptions').val('');
        // $('#txtPidData').val('');

        //
        var SuccessFlag = 0;
        var primaryUrl = "http://" + GetCustomDomName + ":";

        try {
          var protocol = window.location.href;
          if (protocol.indexOf("https") >= 0) {
            primaryUrl = "http://" + GetCustomDomName + ":";
          }
        } catch (e) {}

        url = "";
        // $("#ddlAVDM").empty();
        // alert("Please wait while discovering port from 11100 to 11120.\nThis will take some time.");
        SuccessFlag = 0;
        for (var i = 11100; i <= 11112; i++) {
         // if (primaryUrl == "https://" + GetCustomDomName + ":" && OldPort == true) {
          //  i = "8005";
          //}
          console.log("Discovering RD service on port : " + i.toString());

          var verb = "RDSERVICE";
          var err = "";

          var res;
          $.support.cors = true;
          var httpStaus = false;
          var jsonstr = "";
          var data = new Object();
          var obj = new Object();

          $.ajax({
            type: "RDSERVICE",
            async: false,
            crossDomain: true,
            url: primaryUrl + i.toString(),
            contentType: "text/xml; charset=utf-8",
            processData: false,
            cache: false,
            crossDomain: true,

            success: function (data) {
              httpStaus = true;
              res = {
                httpStaus: httpStaus,
                data: data
              };
              //alert(data);
              $("#txtDeviceInfo").val(data);
              finalUrl = primaryUrl + i.toString();
              var $doc =  data;//$.parseXML(data);//
        debugger;
              var CmbData1 = $($doc).find('RDService').attr('status');
              var CmbData2 = $($doc).find('RDService').attr('info');

               if(RegExp('\\b'+ 'Mantra' +'\\b').test(CmbData2)==true  ||  RegExp('\\b'+ 'Morpho_RD_Service' +'\\b').test(CmbData2)==true  ||  RegExp('\\b'+ 'SecuGen India Registered device Level 0' +'\\b').test(CmbData2)==true ||  RegExp('\\b'+ 'Precision - Biometric Device is ready for capture' +'\\b').test(CmbData2)==true ||  RegExp('\\b'+ 'RD service for Startek FM220 provided by Access Computech' +'\\b').test(CmbData2)==true ||  RegExp('\\b'+ 'NEXT' +'\\b').test(CmbData2)==true  ){
         
         debugger;
              console.log($($doc).find('Interface').eq(0).attr('path'));
            
              if(RegExp('\\b'+ 'Mantra' +'\\b').test(CmbData2)==true){
              
                      if($($doc).find('Interface').eq(0).attr('path')=="/rd/capture")
                      {
                        MethodCapture=$($doc).find('Interface').eq(0).attr('path');
                      }
                      if($($doc).find('Interface').eq(1).attr('path')=="/rd/capture")
                      {
                        MethodCapture=$($doc).find('Interface').eq(1).attr('path');
                      }
                      if($($doc).find('Interface').eq(0).attr('path')=="/rd/info")
                      {
                        MethodInfo=$($doc).find('Interface').eq(0).attr('path');
                      }
                      if($($doc).find('Interface').eq(1).attr('path')=="/rd/info")
                      {
                        MethodInfo=$($doc).find('Interface').eq(1).attr('path');
                      }
              }else if(RegExp('\\b'+ 'Morpho_RD_Service' +'\\b').test(CmbData2)==true){
                      MethodCapture=$($doc).find('Interface').eq(0).attr('path');
                      MethodInfo=$($doc).find('Interface').eq(1).attr('path');
              }else if(RegExp('\\b'+ 'SecuGen India Registered device Level 0' +'\\b').test(CmbData2)==true){
                      MethodCapture=$($doc).find('Interface').eq(0).attr('path');
                      MethodInfo=$($doc).find('Interface').eq(1).attr('path');
              }else if(RegExp('\\b'+ 'Precision - Biometric Device is ready for capture' +'\\b').test(CmbData2)==true){
                      MethodCapture=$($doc).find('Interface').eq(0).attr('path');
                      MethodInfo=$($doc).find('Interface').eq(1).attr('path');
              }else if(RegExp('\\b'+ 'RD service for Startek FM220 provided by Access Computech' +'\\b').test(CmbData2)==true){
                      MethodCapture=$($doc).find('Interface').eq(0).attr('path');
                      MethodInfo=$($doc).find('Interface').eq(1).attr('path');
              }else if(RegExp('\\b'+ 'NEXT' +'\\b').test(CmbData2)==true){
                      MethodCapture=$($doc).find('Interface').eq(0).attr('path');
                      MethodInfo=$($doc).find('Interface').eq(1).attr('path');
              }

              if(CmbData1=='READY')
              { 
               //  $('#method').val( "http:/"+MethodCapture);
               //  $('#info').val( "http:/"+MethodInfo);
                  $('#method').val( finalUrl+MethodCapture);
                 $('#info').val( finalUrl+MethodInfo);
               
                SuccessFlag=1;
                
                    alert("Device detected successfully");
                     
                  
                return false;
              }
              else if(CmbData1=='USED')
              { 
                 $('#method').val( finalUrl+MethodCapture);
                 $('#info').val( finalUrl+MethodInfo);
               
                SuccessFlag=1;
                
                    alert("Device detected successfully");
                     
                  
                return false;
              }
              
              
              else if(CmbData1=='NOTREADY')
              {
                //alert("Device Not Discover");
                //return false;               
              } 
            }

            },
            error: function (jqXHR, ajaxOptions, thrownError) {
              if (i == "8005" && OldPort == true) {
                OldPort = false;
                i = "11099";
              }
              //$('#txtDeviceInfo').val("");
              //alert(thrownError);

              //res = { httpStaus: httpStaus, err: getHttpError(jqXHR) };
            },

          });

          if (SuccessFlag == 1) {
            break;
          }

          //$("#ddlAVDM").val("0");
        }

        if (SuccessFlag == 0) {
          alert("Connection failed Please try again.");
        } else {
          alert("RDSERVICE Discover Successfully");
        }

        $("select#ddlAVDM").prop('selectedIndex', 0);

        // closeNav();
        return res;
}

function CaptureMorphoAvdm() {
  
  DString = '';
       device="mantra";


      var strWadh="";
        var strOtp="";
        // Demo();

         if($("#txtWadh").val()!="")
         {
              strWadh=" wadh=\""+$("#txtWadh").val()+'"';
         }
         if($("#txtotp").val()!="")
         {
              strOtp=" otp=\""+$("#txtotp").val()+'"';
         }
     
     
     if($("#txtWadh").val().trim()!="")
     {
     var XML='<?xml version="1.0"?> <PidOptions ver="1.0"> <Opts fCount="1" fType="0" iCount="0" pCount="0" format="0" pidVer="2.0" timeout="10000" wadh="'+$("#txtWadh").val()+'" posh="UNKNOWN" env="P" /> '+DString+'<CustOpts><Param name="mantrakey" value="" /></CustOpts> </PidOptions>';
     }
     else
     {
     var XML='<?xml version="1.0"?> <PidOptions ver="1.0"> <Opts fCount="1" fType="0" iCount="0" pCount="0" format="0" pidVer="2.0" timeout="10000" posh="UNKNOWN" env="P" /> '+DString+'<CustOpts><Param name="mantrakey" value="" /></CustOpts> </PidOptions>';
     }

            var finUrl=  $('#method').val();
        /*  finalUrl = "http://"+GetCustomDomName+":" + $("#ddlAVDM").val();

          try {
            var protocol = window.location.href;
            if (protocol.indexOf("https") >= 0) {
              finalUrl = "http://"+GetCustomDomName+":" + $("#ddlAVDM").val();
            }
          } catch (e)
          { }
                */


           var verb = "CAPTURE";


                        var err = "";

            var res;
            $.support.cors = true;
            var httpStaus = false;
            var jsonstr="";
            
              $.ajax({

              type: "CAPTURE",
              async: false,
              crossDomain: true,
              url: finUrl,
              data:XML,
              contentType: "text/xml; charset=utf-8",
              processData: false,
              success: function (data) {
              
               if(device == "morpho"){
                 var xmlString = (new XMLSerializer()).serializeToString(data);  //morpho
              }else if(device == "mantra"){
                var xmlString = data;  //mantra
              }else if(device == "secugen"){
                var xmlString = (new XMLSerializer()).serializeToString(data);  //secugen
              }else if(device == "precision"){
                var xmlString = (new XMLSerializer()).serializeToString(data);  //precision
              }else if(device == "startek"){
                var xmlString = (new XMLSerializer()).serializeToString(data);  //startek
              }else if(device == "nextrd"){
                  var xmlString = (new XMLSerializer()).serializeToString(data);  //next rd
              }
              var xmlString = (new XMLSerializer()).serializeToString(data);
              httpStaus = true;
              res = { httpStaus: httpStaus, data: xmlString};
              
              //alert(xmlString);

                $('#txtPidData').val(xmlString);                                  
                var $doc = data;
                var Message =  $($doc).find('Resp').attr('errInfo');
                var errorcode =  $($doc).find('Resp').attr('errCode');
                  if(errorcode==0)
                  {

                    var $doc = $.parseXML(data);
                    var Message =  $($doc).find('Resp').attr('errInfo');

                    alert(Message);
                    
                  }else{
                    $('#loaderbala').css("display","none");
                    alert('Capture Failed');
                    window.location.reload();
                  } 

              },
              error: function (jqXHR, ajaxOptions, thrownError) {
              //$('#txtPidOptions').val(XML);
              alert(thrownError);
                res = { httpStaus: httpStaus, err: getHttpError(jqXHR) };
              },
            });

            return res;
    }
    
    function getHttpError(jqXHR) {
        var err = "Unhandled Exception";
        if (jqXHR.status === 0) {
            err = 'Service Unavailable';
        } else if (jqXHR.status == 404) {
            err = 'Requested page not found';
        } else if (jqXHR.status == 500) {
            err = 'Internal Server Error';
        } else if (thrownError === 'parsererror') {
            err = 'Requested JSON parse failed';
        } else if (thrownError === 'timeout') {
            err = 'Time out error';
        } else if (thrownError === 'abort') {
            err = 'Ajax request aborted';
        } else {
            err = 'Unhandled Error';
        }
        return err;

}

function getPosition(string, subString, index) {
  return string.split(subString, index).join(subString).length;
}
