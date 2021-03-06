//Main variables
var table = [];
var csvUrl = "https://raphaelvddoel.github.io/visualization/dataset.csv";

//variables for charts
var dataDefaultChart = [0,0,0,0,0,0]; 
var dataWeatherChart = [0,0,0,0,0,0,0,0,0];
var dataUserChart = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
var dataConditionChart = [0,0,0,0,0,0,0,0,0,0];

var dataAgeChart1 = [0,0,0,0,0,0,0,0,0,0,0];
var dataAgeChart2 = [0,0,0,0,0,0,0,0,0,0,0];
var dataAgeChart3 = [0,0,0,0,0,0,0,0,0,0,0];
var dataAgeChart4 = [0,0,0,0,0,0,0,0,0,0,0];
var dataAgeChart5 = [0,0,0,0,0,0,0,0,0,0,0];
var dataAgeChart6 = [0,0,0,0,0,0,0,0,0,0,0];

var dataTimeChart1 = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
var dataTimeChart2 = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
var dataTimeChart3 = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
var dataTimeChart4 = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
var dataTimeChart5 = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
var dataTimeChart6 = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];

//data for filtering charts
var noneConditions = 0; // condition chart
var filteredItems = 0; // user chart

//config variable declaration
var defaultChart;
var weatherChart;
var userChart;
var conditionChart;
var ageChart;
var timeChart;

//Chart objects
var leftTopChart;
var leftBottomChart;
var centerTopChart;
var centerBottomChart;
var rightTopChart;
var rightBottomChart;

//labels for charts
var labelsRoadClasses = ["Motorway", "A(M)", "A", "B", "C", "Unclassified"]; // in dataset 1,2,3,4,5,6
var labelsUserTypesDefault = ['Pedestrian', 
'Cyclist',
'Motorcycle 50cc and under rider or passenger',
'Motorcycle 125cc and under rider or passenger',
'Motorcycle over 125cc and up to 500cc rider or  passenger',
'Motorcycle over 500cc rider or passenger',
'Taxi/Private hire car occupant',
'Car occupant',
'Minibus (8 - 16 passenger seats) occupant',
'Bus or coach occupant (17 or more pass seats)',
'Horse rider',
'Agricultural vehicle occupant',
'Tram occupant',
'Van / Goods vehicle (3.5 tonnes mgw or under) occupant',
'Goods vehicle (over 3.5t. and under 7.5t.) occupant',
'Goods vehicle (7.5 tonnes mgw and over) occupant',
'Mobility scooter rider',
'Electric motorcycle rider or passenger',
'Other vehicle occupant',
'Motorcycle - unknown cc rider or passenger',
'Goods vehicle (unknown weight) occupant'];

var labelsUserTypes = ['Pedestrian', 
'Cyclist',
'Motorcycle 50cc and under rider or passenger',
'Motorcycle 125cc and under rider or passenger',
'Motorcycle over 125cc and up to 500cc rider or  passenger',
'Motorcycle over 500cc rider or passenger',
'Taxi/Private hire car occupant',
'Car occupant',
'Minibus (8 - 16 passenger seats) occupant',
'Bus or coach occupant (17 or more pass seats)',
'Horse rider',
'Agricultural vehicle occupant',
'Tram occupant',
'Van / Goods vehicle (3.5 tonnes mgw or under) occupant',
'Goods vehicle (over 3.5t. and under 7.5t.) occupant',
'Goods vehicle (7.5 tonnes mgw and over) occupant',
'Mobility scooter rider',
'Electric motorcycle rider or passenger',
'Other vehicle occupant',
'Motorcycle - unknown cc rider or passenger',
'Goods vehicle (unknown weight) occupant'];

var labelsWeatherType = ['Fine no high winds', 'Raining no high winds', 'Snowing no high winds', 'Fine + high winds', 'Raining + high winds', 'Snowing + high winds', 'Fog or mist', 'Other', 'Unknown'];
var labelsConditions = ['Auto traffic signal - out', 'Auto signal part defective', 'Road sign or marking defective or obscured', 'Roadworks', 'Road surface defective', 'Oil or diesel', 'Mud', 'Data missing or out of range', 'unknown (self reported)'];
var labelsAgeChart = ["0 - 5", "6 - 10", "11 - 15", "16 - 20", "21 - 25", "26 - 35", "36 - 45", "46 - 55", "56 - 65", "66 - 75", "Over 75"];
var labelsTimeChart = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'];
var labelIdList = [0,1,2,3,4,5,8,9,10,11,16,17,18,19,20,21,22,23,90,97,98];

//Colorlists
var regList = ['rgba(102,144,252,1)', 'rgba(120,96,237,1)', 'rgba(218,36,127,1)', 'rgba(252,95,27,1)', 'rgba(253,175,37,1)', 'rgba(189,234,179,1)'];
var proList = ['rgba(96,144,252,1)','rgba(19,115,234,1)','rgba(102,116,165,1)','rgba(165,146,36,1)','rgba(214,189,41,1)','rgba(235,220,172,1)'];
var deuList = ['rgba(235,220,172,1)','rgba(18,122,204,1)','rgba(131,113,113,1)','rgba(186,138,25,1)','rgba(242,179,36,1)','rgba(254,213,186,1)'];
var triList = ['rgba(55,161,173,1)','rgba(81,125,134,1)','rgba(213,60,68,1)','rgba(253,91,100,1)','rgba(254,165,177,1)','rgba(200,224,241,1)'];
var colorList = [regList, proList, deuList, triList];

//initial activation function call
init();

async function init() {
    await getData(); // get data from csv
    await calcData(); // process data
    // make charts
    setChart('chartLeftTop');
    setChart('chartLeftBottom');
    setChart('chartCenterTop');
    setChart('chartCenterBottom');
    setChart('chartRightTop');
    setChart('chartRightBottom');
    
}
/* data functions */
async function getData(){ 
    const response = await fetch(csvUrl);
    const data = await response.text();
    const refinedData = data.trim();
    table = refinedData.split('\n').slice(1);
}

//Function that calculates all data on page load
function calcData() {
    setDataDefaultChart();
    setDataWeatherChart();
    setDataUserChart();
    setDataConditionChart();
    setDataAgeChart();
    setDataTimeChart();
}

//Calculate data for default chart
function setDataDefaultChart() {
    table.forEach( row => {
        let columns = row.split(','); 
        const road_class        = columns[14];
        dataDefaultChart[parseInt(road_class) - 1]++;
    });
}

//Calculate data for weather chart
function setDataWeatherChart(roadclass) {
    if (roadclass !== undefined) { //if function is called with parameter
        table.forEach( row => {
            let columns = row.split(','); 
            if (columns[14] == roadclass) {
                const weather_type = columns[25];
                dataWeatherChart[parseInt(weather_type) - 1]++;
            }
        });
    } else {
        table.forEach( row => {
            let columns = row.split(','); 
            const weather_type = columns[25];
            dataWeatherChart[parseInt(weather_type) - 1]++;
        });
    }
}

//Calculate data for user chart
function setDataUserChart(roadclass) {
    if (roadclass !== undefined) { //if function is called with parameter
        table.forEach( row => {
            let columns = row.split(','); 
            if (columns[14] == roadclass) {
                const casualty_type = columns[44];
                dataUserChart[labelIdList.indexOf(parseInt(casualty_type))]++;
            }
        });
    } else {
        table.forEach( row => {
            let columns = row.split(','); 
            const casualty_type = columns[44];
            dataUserChart[labelIdList.indexOf(parseInt(casualty_type))]++;
        });
    }
    //remove user types (and according labels) with accidents <1% rounded
    var sum = 0;
    dataUserChart.forEach( elem => {
        sum+=elem;
    });
    deleteIndexes = [];
    dataUserChart.forEach( (elem, index) => {
        let p = parseInt(elem/sum*100);
        if (p == 0) {
            deleteIndexes.push(index); 
            filteredItems+=elem;
        }
    });
    //remove data and labels
    for (let i = deleteIndexes.length-1; i != -1; i--) {
        dataUserChart.splice(deleteIndexes[i], 1);
        labelsUserTypes.splice(deleteIndexes[i], 1);
    }
}

//Calculate data for condition chart
function setDataConditionChart(roadclass) {
    if (roadclass !== undefined) { //if function is called with parameter
        table.forEach( row => {
            let columns = row.split(','); 
            if (columns[14] == roadclass) {
                var Condition_at_site = columns[27];
                if ((Condition_at_site > -2 && Condition_at_site < 10)) { // filter out missing data
                    if (Condition_at_site == -1) { // -1 is not a valid index and 8 is not used, so replace -1 by 8
                        Condition_at_site = 8;
                    }
                    if (Condition_at_site == 0) {
                        noneConditions++;
                    } else {
                        dataConditionChart[parseInt(Condition_at_site)-1]++;
                    }
                }
            }
        });
    } else {
        table.forEach( row => {
            let columns = row.split(','); 
            var Condition_at_site = columns[27];
            if ((Condition_at_site > -2 && Condition_at_site < 10)) { //filter out missing data
                if (Condition_at_site == -1) { // -1 is not a valid index and 8 is not used, so replace -1 by 8
                    Condition_at_site = 8;
                }
                if (Condition_at_site == 0) {
                    noneConditions++;
                } else {
                    dataConditionChart[parseInt(Condition_at_site)-1]++;
                }
            }
        });
    }
}

//Calculate data for age chart
function setDataAgeChart(roadclass) {
    if (roadclass !== undefined) { //if function is called with parameter
        table.forEach( row => {
            let columns = row.split(','); 
            if (columns[14] == roadclass) {
                const casualty_type = columns[44];
                dataUserChart[labelIdList.indexOf(parseInt(casualty_type))]++;
            }
        });
    } else {
        table.forEach( row => {
            let columns = row.split(','); 
            const age_band_of_casualty = columns[37];
            if (age_band_of_casualty > 0 && age_band_of_casualty < 12) { // filter out missing data
                const road_class = parseInt(columns[14]);
                // BST for roadclasses to find correct data array
                if (road_class < 4) {
                    if (road_class < 2) {
                        if (road_class == 1) {
                            dataAgeChart1[parseInt(age_band_of_casualty)-1]++;
                        } else {
                            dataAgeChart2[parseInt(age_band_of_casualty)-1]++;
                        }
                    } else {
                        dataAgeChart3[parseInt(age_band_of_casualty)-1]++;
                    }
                } else {
                    if (road_class < 6) {
                        if (road_class < 5) {
                            dataAgeChart4[parseInt(age_band_of_casualty)-1]++;
                        } else {
                            dataAgeChart5[parseInt(age_band_of_casualty)-1]++;
                        }
                    } else {
                        dataAgeChart6[parseInt(age_band_of_casualty)-1]++;
                    }
                }
            }
        });
    }
}
//Calculate data for time chart
function setDataTimeChart() {
    table.forEach(row => {
        let columns = row.split(','); 
        const time = parseInt(columns[11].substring(0,2));
        if (time > -1 && time < 25) { // filter out missing data
            const road_class = parseInt(columns[14]);
            // BST for roadclasses to find correct data array
            if (road_class < 4) {
                if (road_class < 2) {
                    if (road_class == 1) {
                        dataTimeChart1[parseInt(time)]++;
                    } else {
                        dataTimeChart2[parseInt(time)]++;
                    }
                } else {
                    dataTimeChart3[parseInt(time)]++;
                }
            } else {
                if (road_class < 6) {
                    if (road_class < 5) {
                        dataTimeChart4[parseInt(time)]++;
                    } else {
                        dataTimeChart5[parseInt(time)]++;
                    }
                } else {
                    dataTimeChart6[parseInt(time)]++;
                }
            }
        }
    });
}
/* end of data function */

/**
 * universal function to make all charts
 * jquery is used to be able to recreate charts
 */
function setChart(canvas) {
    var ctx = document.getElementById(canvas).getContext("2d");
    var temp;
    if (canvas == 'chartLeftTop') {
        if (leftTopChart) {
            leftTopChart.destroy();
        }
        temp = jQuery.extend(true, {}, defaultChart);
        leftTopChart = new Chart(ctx, temp);
    } else if (canvas == 'chartLeftBottom') {
        if (leftBottomChart) {
            leftBottomChart.destroy();
        }
        temp = jQuery.extend(true, {}, userChart);
        leftBottomChart = new Chart(ctx, temp);
        document.getElementById("filtedUsers").innerHTML = "Number of accidents filtered: " + filteredItems;
    } else if (canvas == 'chartCenterTop') {
        if (centerTopChart) {
            centerTopChart.destroy();
        }
        temp = jQuery.extend(true, {}, timeChart);
        centerTopChart = new Chart(ctx, temp);
    } else if (canvas == 'chartCenterBottom') {
        if (centerBottomChart) {
            centerBottomChart.destroy();
        }
        temp = jQuery.extend(true, {}, ageChart);
        centerBottomChart = new Chart(ctx, temp);
    } else if (canvas == 'chartRightTop') {
        if (rightTopChart) {
            rightTopChart.destroy();
        }
        temp = jQuery.extend(true, {}, weatherChart);
        rightTopChart = new Chart(ctx, temp);
    } else {
        if (rightBottomChart) {
            rightBottomChart.destroy();
        }
        temp = jQuery.extend(true, {}, conditionChart);
        rightBottomChart = new Chart(ctx, temp);
        document.getElementById("normalConditionInfo").innerHTML = "Number of accidents with no special condition: " + noneConditions;
    } 
}

// Change chart type from pie to bar or vice versa
function updateLeftBottomChartType() {
    var ctx = document.getElementById('chartLeftBottom').getContext("2d");
    if (leftBottomChart) {
        leftBottomChart.destroy();
    }
    var type;
    if (document.getElementById('leftBottomPie').checked) {
        type = 'pie';
    } else {
        type = 'bar';
    }
    temp = jQuery.extend(true, {}, userChart);
    temp.type = type;
    temp.data.datasets[0].data = dataUserChart;
    leftBottomChart = new Chart(ctx, temp);
    updateColors();
}

// Change chart type from pie to bar or vice versa
function updateRightTopChartType() {
    var ctx = document.getElementById('chartRightTop').getContext("2d");
    if (rightTopChart) {
        rightTopChart.destroy();
    }
    var type;
    if (document.getElementById('rightTopPie').checked) {
        type = 'pie';
    } else {
        type = 'bar';
    }
    temp = jQuery.extend(true, {}, weatherChart);
    temp.type = type;
    temp.data.datasets[0].data = dataWeatherChart;
    rightTopChart = new Chart(ctx, temp);
    updateColors();
}

// Change chart type from pie to bar or vice versa
function updateRightBottomChartType() {
    var ctx = document.getElementById('chartRightBottom').getContext("2d");
    if (rightBottomChart) {
        rightBottomChart.destroy();
    }
    var type;
    if (document.getElementById('rightBottomPie').checked) {
        type = 'pie';
    } else {
        type = 'bar';
    }
    temp = jQuery.extend(true, {}, conditionChart);
    temp.type = type;
    temp.data.datasets[0].data = dataConditionChart;
    rightBottomChart = new Chart(ctx, temp);
    updateColors();
}

// --------- Start of chart variables ---------
defaultChart = {
    type: 'pie',
    data: {
        labels: labelsRoadClasses,
        datasets: [{
            data: dataDefaultChart,
            fill: true,
            backgroundColor: regList,
            borderColor: 'rgba(0, 0, 0, 0.4)',
            borderWidth: 1
        }]
    },
    options: {
        onClick: clickHandler,
        maintainAspectRatio: false,
        scales: {
            y: {
                display: false
            }
        },
        elements: {
            line: {
                tension: 0.4
            }
        },
        plugins: {
            tooltip: {
                callbacks: {
                    label: function(context) {
                        let label = context.label || '';
                        if (label) {
                            label += ': ';
                        }
                        if (context.formattedValue !== null) {
                            label += context.formattedValue + ' accidents'; 
                        }
                        return label;
                    }
                }
            }
        }
    }
}

weatherChart = {
    type: 'pie',
    data: {
        labels: labelsWeatherType,
        datasets: [{
            data: dataWeatherChart,
            fill: true,
            backgroundColor: regList,
            borderColor: 'rgba(0, 0, 0, 0.4)',
            borderWidth: 1,
            label: "Number of accidents",
        }]
    },
    options:{
        maintainAspectRatio: false,
        legend: { display: false },
        scales: {
            y: {
                display: false
            }
        },
        elements: {
            line: {
                tension: 0.4
            }
        },
        plugins: {
            tooltip: {
                callbacks: {
                    label: function(context) {
                        let label = context.label || '';
                        if (label) {
                            label += ': ';
                        }
                        if (context.formattedValue !== null) {
                            label += context.formattedValue + ' accidents'; 
                        }
                        return label;
                    }
                }
            }
        }
    }
}

userChart = {
    type: 'bar',
    data: {
        labels: labelsUserTypes,
        datasets: [
            {
            backgroundColor: regList,
            data: dataUserChart,
            }
        ]
    },
    options: {
        maintainAspectRatio: false,
        plugins: {
            tooltip: {
                callbacks: {
                    label: function(context) {
                        let label = context.label || '';
                        if (label) {
                            label += ': ';
                        }
                        if (context.formattedValue !== null) {
                            label += context.formattedValue + ' accidents'; 
                        }
                        return label;
                    }
                }
            }
        }
    },
}

conditionChart = {
    type: 'pie',
    data: {
        labels: labelsConditions,
        datasets: [{
            data: dataConditionChart,
            fill: true,
            backgroundColor: regList,
            borderColor: 'rgba(0, 0, 0, 0.4)',
            borderWidth: 1,
            label: "Number of accidents",
        }]
    },
    options:{
        maintainAspectRatio: false,
        legend: { display: false },
        scales: {
            y: {
                display: false
            }
        },
        elements: {
            line: {
                tension: 0.4
            }
        },
        plugins: {
            tooltip: {
                callbacks: {
                    label: function(context) {
                        let label = context.label || '';
                        if (label) {
                            label += ': ';
                        }
                        if (context.formattedValue !== null) {
                            label += context.formattedValue + ' accidents'; 
                        }
                        return label;
                    }
                }
            }
        }
    }
}

ageChart = {
    type: 'line',
    data: {
      labels: labelsAgeChart,
      datasets: [{ 
            data: dataAgeChart1,
            label: "Motorway",
            borderColor: regList[0],
            fill: false
        }, { 
            data: dataAgeChart2,
            label: "A(M)",
            borderColor: regList[1],
            fill: false
        }, { 
            data: dataAgeChart3,
            label: "A",
            borderColor: regList[2],
            fill: false
        }, { 
            data: dataAgeChart4,
            label: "B",
            borderColor: regList[3],
            fill: false
        }, { 
            data: dataAgeChart5,
            label: "C",
            borderColor: regList[4],
            fill: false
        }, { 
            data: dataAgeChart6,
            label: "Unclassified",
            borderColor: regList[5],
            fill: false
        }
      ]
    },
    options: {
        maintainAspectRatio: false,
        scales: {
            x: {
            title: {
                display: true,
                text: 'Age'
            }
            },
            y: {
                stacked: true,
                title: {
                    display: true,
                    text: 'Number of accidents'
                }
            }
        },
        plugins: {
            tooltip: {
                callbacks: {
                    afterTitle: function() {
                        return 'number of accidents:';
                    }
                }
            }
        }
    }
}

timeChart = {
    type: 'line',
    data: {
        labels: labelsTimeChart,
        datasets: [{ 
              data: dataTimeChart1,
              label: "Motorway",
              borderColor: regList[0],
              backgroundColor: regList[0],
              fill: true
          }, { 
              data: dataTimeChart2,
              label: "A(M)",
              borderColor: regList[1],
              backgroundColor: regList[1],
              fill: true
          }, { 
              data: dataTimeChart3,
              label: "A",
              borderColor: regList[2],
              backgroundColor: regList[2],
              fill: true
          }, { 
              data: dataTimeChart4,
              label: "B",
              borderColor: regList[3],
              backgroundColor: regList[3],
              fill: true
          }, { 
              data: dataTimeChart5,
              label: "C",
              borderColor: regList[4],
              backgroundColor: regList[4],
              fill: true
          }, { 
              data: dataTimeChart6,
              label: "Unclassified",
              borderColor: regList[5],
              backgroundColor: regList[5],
              fill: true
          }
        ]
    },
    options: {
        maintainAspectRatio: false,
        responsive: true,
        plugins: {
            tooltip: {
                mode: 'index',
                callbacks: {
                    title: function(context) { 
                        let label = context[0].label || '';
                        label+= ":00h"
                        return label;
                    }, 
                    afterTitle: function() {
                        return 'number of accidents:';
                    }
                }
            },
        },
        interaction: {
            mode: 'nearest',
            axis: 'x',
            intersect: false
        },
        scales: {
            x: {
            title: {
                display: true,
                text: 'Time of day (hours)'
            }
        },
        y: {
            stacked: true,
            title: {
                display: true,
                text: 'Number of accidents'
            }
        }
      }
    }
};
// --------- End of chart variables ---------

// Update data after clicking on road type in default chart
function updateUserChart(typeChosen) {
    dataUserChart = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    labelsUserTypes = [...labelsUserTypesDefault];
    filteredItems = 0;
    if (typeChosen !== undefined) {
        setDataUserChart(labelsRoadClasses.indexOf(typeChosen)+1);
    } else {
        setDataUserChart();
    }
    leftBottomChart.data.datasets[0].data = dataUserChart;
    leftBottomChart.data.labels = labelsUserTypes;
    leftBottomChart.update();
    updateColors();
    document.getElementById("filtedUsers").innerHTML = "Number of accidents filtered: " + filteredItems;
}

// Update data after clicking on road type in default chart
function updateWeatherChart(typeChosen) {
    dataWeatherChart = [0,0,0,0,0,0,0,0,0];
    if (typeChosen !== undefined) {
        setDataWeatherChart(labelsRoadClasses.indexOf(typeChosen)+1);
    } else {
        setDataWeatherChart();
    }
    rightTopChart.data.datasets[0].data = dataWeatherChart;
    rightTopChart.update();
    updateColors();
}

// Update data after clicking on road type in default chart
function updateConditionChart(typeChosen) {
    dataConditionChart = [0,0,0,0,0,0,0,0,0,0];
    noneConditions = 0;
    if (typeChosen !== undefined) {
        setDataConditionChart(labelsRoadClasses.indexOf(typeChosen)+1);
    } else {
        setDataConditionChart();
    }
    rightBottomChart.data.datasets[0].data = dataConditionChart;
    rightBottomChart.update();
    updateColors();
    document.getElementById("normalConditionInfo").innerHTML = "Number of accidents with no special condition: " + noneConditions;
}

// Load charts using all road types
function resetCharts() {
    updateWeatherChart();
    updateUserChart();
    updateConditionChart();
}

// Update colors of all charts after changing color selector
function updateColors() {
    //get new color set
    let selectColor  = document.getElementById('selectColor');
    let colorChosen = selectColor.selectedIndex;
    let newColors = colorList[colorChosen];
    //Set new colors for side charts
    leftTopChart.data.datasets[0].backgroundColor = newColors;
    leftBottomChart.data.datasets[0].backgroundColor = newColors;
    rightTopChart.data.datasets[0].backgroundColor = newColors;
    rightBottomChart.data.datasets[0].backgroundColor = newColors;
    //Set new colors for center charts
    for (let i = 0; i != newColors.length; i++) {
        centerTopChart.data.datasets[i].borderColor = newColors[i];
        centerTopChart.data.datasets[i].backgroundColor = newColors[i];
        centerBottomChart.data.datasets[i].borderColor = newColors[i];
        centerBottomChart.data.datasets[i].backgroundColor = newColors[i];
    }
    //Update all charts
    leftTopChart.update();
    leftBottomChart.update();
    centerTopChart.update();
    centerBottomChart.update();
    rightTopChart.update();
    rightBottomChart.update();
}

// actionHandler for clicking default chart
function clickHandler(evt) {
    const points = leftTopChart.getElementsAtEventForMode(evt, 'nearest', { intersect: true }, true);
    if (points.length) {
        const firstPoint = points[0];
        const label = leftTopChart.data.labels[firstPoint.index];
        updateWeatherChart(label);
        updateUserChart(label);
        updateConditionChart(label);
    }
}
