var todayTransaction;
function setTodayTransaction(data){
  todayTransaction = data;
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
      labels: ["Money Transferred", "AEPS Transaction", "Recharge/Utility", "Refunded"],
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
        data: todayTransaction,
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

function setTodayBusiness(business){
  var ctx = document.getElementById("chart4").getContext('2d');

  var gradientStroke1 = ctx.createLinearGradient(0, 0, 0, 300);
  gradientStroke1.addColorStop(0, '#ee0979');
  gradientStroke1.addColorStop(1, '#ff6a00');

  var gradientStroke2 = ctx.createLinearGradient(0, 0, 0, 300);
  gradientStroke2.addColorStop(0, '#283c86');
  gradientStroke2.addColorStop(1, '#39bd3c');

  var gradientStroke3 = ctx.createLinearGradient(0, 0, 0, 300);
  gradientStroke3.addColorStop(0, '#7f00ff');
  gradientStroke3.addColorStop(1, '#e100ff');
  
  var gradientStroke4 = ctx.createLinearGradient(0, 0, 0, 300);
  gradientStroke4.addColorStop(0, '#42e695');
  gradientStroke4.addColorStop(1, '#3bb2b8');

  var myChart = new Chart(ctx, {
    type: 'pie',
    data: {
      labels: ["Success", "Pending", "Failed", "Refund"],
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

        data: business,
        borderWidth: [1, 1, 1]
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

function getChart2(){
  
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
      labels: ["Money Transferred", "AEPS Transaction", "Recharge/Utility", "Refunded"],
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
        data: [25, 10, 65, 14],
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

function getChart4(){
  var ctx = document.getElementById("chart4").getContext('2d');

  var gradientStroke1 = ctx.createLinearGradient(0, 0, 0, 300);
  gradientStroke1.addColorStop(0, '#ee0979');
  gradientStroke1.addColorStop(1, '#ff6a00');

  var gradientStroke2 = ctx.createLinearGradient(0, 0, 0, 300);
  gradientStroke2.addColorStop(0, '#283c86');
  gradientStroke2.addColorStop(1, '#39bd3c');

  var gradientStroke3 = ctx.createLinearGradient(0, 0, 0, 300);
  gradientStroke3.addColorStop(0, '#7f00ff');
  gradientStroke3.addColorStop(1, '#e100ff');
  
  var gradientStroke4 = ctx.createLinearGradient(0, 0, 0, 300);
  gradientStroke4.addColorStop(0, '#42e695');
  gradientStroke4.addColorStop(1, '#3bb2b8');

  var myChart = new Chart(ctx, {
    type: 'pie',
    data: {
      labels: ["Success", "Pending", "Failed", "Refund"],
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

        data: [50, 50, 50, 50],
        borderWidth: [1, 1, 1]
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
