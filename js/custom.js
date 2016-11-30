$(document).ready(function() {
    console.log("Ready");
    window.myChart;
});

var createOrUpdate = 0;

function createData() {
    var ipcpm = parseInt($('#income-per-client').val());
    var epm = parseInt($('#expenditure').val()); //90127.5
    var results = parseInt($('#num-of-results').val());
    var interval = parseInt($('#interval-client-pm').val());
    var cpm = parseInt($('#starting-clients').val());

    var data = [];


    for (var i = 0; i < results; i++) {
        var income = 0;
        var expense = 0;
        var people = 0;
        var months = 0;

        var counter = 0;
        var safety = 100;
        cpm += interval;

        do {

            people += cpm;
            income += people * ipcpm;
            expense += epm;
            months++;
            safety++;

        } while (income < expense && counter < safety);

        data[i] = [months, cpm];
    }

    // $.each(data, function(key, value) {
    //     console.log('key:' + key + ' months:' + value[0] + ' additional-cpm:' + value[1]);
    // });

    return data;
}


function createChart() {
    if (createOrUpdate == 1) {
        window.myChart.destroy();
    } else {
        createOrUpdate = 1;
    }
    var data = this.createData();
    var labels = [];
    var values = [];

    $.each(data, function(key, value) {
        labels[key] = value[1];
        values[key] = value[0];
    });

    var ctx = $('#myChart');

    var data = {
        labels: labels,
        datasets: [{
            label: "Months",
            borderWidth: 1,
            data: values,
			backgroundColor: 'rgba(244, 78, 66, 0.5)'
        }]
    };

    window.myChart = new Chart(ctx, {
        type: 'bar',
        data: data,
        options: {
            title: {
                display: true,
                text: 'Months to Break-Even/Clients per Month'
            },
            scales: {
                yAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: 'Months to Break-Even'
                    },
                    ticks: {
                        beginAtZero: true,
						suggestedMin: 1
                    }
                }],
                xAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: 'Additional Clients per Month'
                    }
                }]
            }
        },
    });
};
