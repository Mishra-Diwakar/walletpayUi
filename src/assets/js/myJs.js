
function getChart2(data){
  var payinAmt  = data.get("payinAmt")
  var payoutAmt  =data.get("payoutAmt")
  var todayPayin  = data.get("todayPayin")
  var todayPayout  = data.get("todayPayout")
  var ctx = document.getElementById("chart2").getContext('2d');

  var gradientStroke1 = ctx.createLinearGradient(0, 0, 0, 300);
  gradientStroke1.addColorStop(0, '#fc4a1a');
  gradientStroke1.addColorStop(1, '#f7b733');

  var gradientStroke2 = ctx.createLinearGradient(0, 0, 0, 300);
  gradientStroke2.addColorStop(0, '#4776e6');
  gradientStroke2.addColorStop(1, '#8e54e9');


  var gradientStroke3 = ctx.createLinearGradient(0, 0, 0, 300);
  gradientStroke3.addColorStop(0, '#ee0979');
  gradientStroke3.addColorStop(1, '#ff6a00');

  var gradientStroke4 = ctx.createLinearGradient(0, 0, 0, 300);
  gradientStroke4.addColorStop(0, '#42e695');
  gradientStroke4.addColorStop(1, '#3bb2b8');


  var myChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ["Payin Amount", "Total Payin", "Payout Amount", "Total Payout"],
      datasets: [{
        backgroundColor: [
          gradientStroke1,
          gradientStroke2,
          gradientStroke3,
          gradientStroke4
        ],
        hoverBackgroundColor: [
          gradientStroke1,
          gradientStroke2,
          gradientStroke3,
          gradientStroke4
        ],
        data: [payinAmt,todayPayin,payoutAmt,todayPayout],
        borderWidth: [1, 1, 1, 1]
      }]
    },
    options: {
      maintainAspectRatio: false,
      cutoutPercentage: 75,
      legend: {
        position: 'bottom',
        display: false,
        labels: {
          boxWidth: 8
        }
      },
      tooltips: {
        displayColors: false,
      }
    }
  });

}


function getChart4(data){

  var SUCCESS  = data.get("SUCCESS")
  var PROCESSING  = data.get("PROCESSING")
  var FAILED  = data.get("FAILED")
  var REFUND  =data.get("REFUND")
  var ctx = document.getElementById("chart4").getContext('2d');

  var gradientStroke1 = ctx.createLinearGradient(0, 0, 0, 300);
  gradientStroke1.addColorStop(0, '#42e695');
  gradientStroke1.addColorStop(1, '#3bb2b8');

  var gradientStroke2 = ctx.createLinearGradient(0, 0, 0, 300);
  gradientStroke2.addColorStop(0, '#ee0979');
  gradientStroke2.addColorStop(1, '#ff6a00');

  var gradientStroke3 = ctx.createLinearGradient(0, 0, 0, 300);
  gradientStroke3.addColorStop(0, '#7f00ff');
  gradientStroke3.addColorStop(1, '#e100ff');
  
  var gradientStroke4 = ctx.createLinearGradient(0, 0, 0, 300);
  gradientStroke4.addColorStop(0, '#ee0979');
  gradientStroke4.addColorStop(1, '#ff6a00');

  var myChart = new Chart(ctx, {
    type: 'pie',
    data: {
      labels: ["Success", "Processing", "Failed", "Refund"],
      datasets: [{
        backgroundColor: [
          gradientStroke1,
          gradientStroke2,
          gradientStroke3,
          gradientStroke4
        ],

        hoverBackgroundColor: [
          gradientStroke1,
          gradientStroke2,
          gradientStroke3,
          gradientStroke4
        ],

        data: [SUCCESS, PROCESSING, FAILED, REFUND],
        borderWidth: [1, 1, 1, 1]
      }]
    },
    options: {
      maintainAspectRatio: false,
      cutoutPercentage: 0,
      legend: {
        position: 'bottom',
        display: false,
        labels: {
          boxWidth: 8
        }
      },
      tooltips: {
        displayColors: false,
      },
    }
  });
}
function hideModel(){
  return document.getElementById("m").getAttributeNode("data-bs-dismiss").value="modal";
  // a.getAttributeNode("data-bs-dismiss").value="modal";
}


function showPassword() {
  var x = document.getElementById("password");
  if (x.type === "password") {
    x.type = "text";
  } else {
    x.type = "password";
  }
}

function showSpinner(data){
  var value = JSON.parse(JSON.stringify(data))
  var id = data.id;
  var x = document.getElementById("id");
  return true;
}
