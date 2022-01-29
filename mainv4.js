//Main variables
var table = [];
var csvUrl = "https://raphaelvddoel.github.io/visualization/dataset.csv";

//variables for charts
var dataDefaultChart = [0,0,0,0,0,0]; 
var dataWeatherChart = [0,0,0,0,0,0,0,0,0];
var dataUserChart = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
var dataConditionChart = [0,0,0,0,0,0,0,0,0,0];
var noneConditions = 0;
var filteredItems = 0;

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

var labelsWeatherType = ['Fine no high winds', 'Raining no high winds', 'Snowing no high winds', 'Fine + high winds', 'Raining + high winds', 'Snowing + high winds', 'Fog or mist', 'Other', 'Unknown'];
var labelsConditions = ['Auto traffic signal - out', 'Auto signal part defective', 'Road sign or marking defective or obscured', 'Roadworks', 'Road surface defective', 'Oil or diesel', 'Mud', 'Data missing or out of range', 'unknown (self reported)'];
//selectorlists 
var labelIdList = [0,1,2,3,4,5,8,9,10,11,16,17,18,19,20,21,22,23,90,97,98];
//Colorlists
var regList = ['rgba(102,144,252,1)', 'rgba(120,96,237,1)', 'rgba(218,36,127,1)', 'rgba(252,95,27,1)', 'rgba(253,175,37,1)', 'rgba(189,234,179,1)'];
var proList = ['rgba(96,144,252,1)','rgba(19,115,234,1)','rgba(102,116,165,1)','rgba(165,146,36,1)','rgba(214,189,41,1)','rgba(235,220,172,1)'];
var deuList = ['rgba(235,220,172,1)','rgba(18,122,204,1)','rgba(131,113,113,1)','rgba(186,138,25,1)','rgba(242,179,36,1)','rgba(254,213,186,1)'];
var triList = ['rgba(55,161,173,1)','rgba(81,125,134,1)','rgba(213,60,68,1)','rgba(253,91,100,1)','rgba(254,165,177,1)','rgba(200,224,241,1)'];
var colorList = [regList, proList, deuList, triList];

//labels for charts
var labels1 = ["Motorway", "A(M)", "A", "B", "C", "Unclassified"]; // in dataset 1,2,3,4,5,6
var labels2Default = ['Pedestrian', 
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

var labels2 = ['Pedestrian', 
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

var labelsAgeChart = ["0 - 5",
"6 - 10",
"11 - 15",
"16 - 20",
"21 - 25",
"26 - 35",
"36 - 45",
"46 - 55",
"56 - 65",
"66 - 75",
"Over 75"]

var labelsTimeChart = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24'];

function getIndex(item){
    const items = ["Accident_Index","Location_Easting_OSGR","Location_Northing_OSGR","Longitude","Latitude",
    "Police_Force","Accident_Severity","Number_of_Vehicles","Number_of_Casualties","Date","Day_of_Week","Time",
    "Local_Authority_(District)","Local_Authority_(Highway)","1st_Road_Class","1st_Road_Number","Road_Type","Speed_limit",
    "Junction_Detail","Junction_Control","2nd_Road_Class","2nd_Road_Number","Pedestrian_Crossing-Human_Control",
    "Pedestrian_Crossing-Physical_Facilities","Light_Conditions","Weather_Conditions","Road_Surface_Conditions","Special_Conditions_at_Site",
    "Carriageway_Hazards","Urban_or_Rural_Area","Did_Police_Officer_Attend_Scene_of_Accident","LSOA_of_Accident_Location","Vehicle_Reference_df_res",
    "Casualty_Reference","Casualty_Class","Sex_of_Casualty","Age_of_Casualty","Age_Band_of_Casualty","Casualty_Severity","Pedestrian_Location","Pedestrian_Movement",
    "Car_Passenger","Bus_or_Coach_Passenger","Pedestrian_Road_Maintenance_Worker","Casualty_Type","Casualty_Home_Area_Type","Casualty_IMD_Decile","Vehicle_Reference_df",
    "Vehicle_Type","Towing_and_Articulation","Vehicle_Manoeuvre","Vehicle_Location-Restricted_Lane","Junction_Location","Skidding_and_Overturning","Hit_Object_in_Carriageway",
    "Vehicle_Leaving_Carriageway","Hit_Object_off_Carriageway","1st_Point_of_Impact","Was_Vehicle_Left_Hand_Drive?","Journey_Purpose_of_Driver","Sex_of_Driver","Age_of_Driver",
    "Age_Band_of_Driver","Engine_Capacity_(CC)","Propulsion_Code","Age_of_Vehicle","Driver_Home_Area_Type"];

    return items.indexOf(item);
}

//initial activation function call
init();

async function init() {
    await getData();
    await calcData();
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

function calcData() {
    setDataDefaultChart();
    setDataWeatherChart();
    setDataUserChart();
    setDataConditionChart();
    setDataAgeChart();
    setDataTimeChart();
}

function setDataDefaultChart() {
    table.forEach( row => {
        let columns = row.split(','); 
        const road_class        = columns[14];
        dataDefaultChart[parseInt(road_class) - 1]++;
    });
}

function setDataWeatherChart(roadclass) {
    if (roadclass !== undefined) {
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

function setDataUserChart(roadclass) {
    if (roadclass !== undefined) {
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
    for (let i = deleteIndexes.length-1; i != -1; i--) {
        dataUserChart.splice(deleteIndexes[i], 1);
        labels2.splice(deleteIndexes[i], 1);
    }
}

function setDataConditionChart(roadclass) {
    if (roadclass !== undefined) {
        table.forEach( row => {
            let columns = row.split(','); 
            if (columns[14] == roadclass) {
                var Condition_at_site = columns[27];
                if ((Condition_at_site > -2 && Condition_at_site < 10)) {
                    if (Condition_at_site == -1) {
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
            if ((Condition_at_site > -2 && Condition_at_site < 10)) {
                if (Condition_at_site == -1) {
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

function setDataAgeChart(roadclass) {
    if (roadclass !== undefined) {
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
            if (age_band_of_casualty > 0 && age_band_of_casualty < 12) {
                const road_class = parseInt(columns[14]);
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

function testing() {
    var y = 0;
    var n = 0;
    table.forEach( row => {
        let columns = row.split(','); 
        const temp = columns[62];
        if (temp > 0 && temp < 12) {
            y++;
        } else {
            n++;
        }
    });
    console.log("nope: " + n);
}
/* end of data function */
function setDataTimeChart() {
    table.forEach(row => {
        let columns = row.split(','); 
        const time = parseInt(columns[11].substring(0,2));
        if (time > -1 && time < 25) {
            const road_class = parseInt(columns[14]);
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
    leftBottomChart = new Chart(ctx, temp);
}

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
    rightTopChart = new Chart(ctx, temp);
}

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
    rightBottomChart = new Chart(ctx, temp);
}


defaultChart = {
    type: 'pie',
    data: {
        labels: labels1,
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
    }
}

userChart = {
    type: 'bar',
    data: {
        labels: labels2,
        datasets: [
            {
            label: "Number of accidents",
            backgroundColor: regList,
            data: dataUserChart,
            }
        ]
    },
    options: {
        maintainAspectRatio: false,
    }
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
      responsive: true,
      plugins: {
        tooltip: {
          mode: 'index'
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
            text: 'Time'
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

function updateUserChart(typeChosen) {
    dataUserChart = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    labels2 = [...labels2Default];
    filteredItems = 0;
    if (typeChosen !== undefined) {
        setDataUserChart(labels1.indexOf(typeChosen)+1);
    } else {
        setDataUserChart();
    }
    leftBottomChart.data.datasets[0].data = dataUserChart;
    leftBottomChart.data.labels = labels2;
    leftBottomChart.update();
    updateColors();
    document.getElementById("filtedUsers").innerHTML = "Number of accidents filtered: " + filteredItems;
}

function updateWeatherChart(typeChosen) {
    dataWeatherChart = [0,0,0,0,0,0,0,0,0];
    if (typeChosen !== undefined) {
        setDataWeatherChart(labels1.indexOf(typeChosen)+1);
    } else {
        setDataWeatherChart();
    }
    rightTopChart.data.datasets[0].data = dataWeatherChart;
    rightTopChart.update();
    updateColors();
}

function updateConditionChart(typeChosen) {
    dataConditionChart = [0,0,0,0,0,0,0,0,0,0];
    noneConditions = 0;
    if (typeChosen !== undefined) {
        setDataConditionChart(labels1.indexOf(typeChosen)+1);
    } else {
        setDataConditionChart();
    }
    rightBottomChart.data.datasets[0].data = dataConditionChart;
    rightBottomChart.update();
    updateColors();
    document.getElementById("normalConditionInfo").innerHTML = "Number of accidents with no special condition: " + noneConditions;
}

function resetCharts() {
    updateWeatherChart();
    updateUserChart();
    updateConditionChart();
}

function updateColors() {
    let selectColor  = document.getElementById('selectColor');
    let colorChosen = selectColor.selectedIndex;
    let newColors = colorList[colorChosen];
    leftTopChart.data.datasets[0].backgroundColor = newColors;
    leftBottomChart.data.datasets[0].backgroundColor = newColors;
    rightTopChart.data.datasets[0].backgroundColor = newColors;
    rightBottomChart.data.datasets[0].backgroundColor = newColors;
    for (let i = 0; i != newColors.length; i++) {
        centerTopChart.data.datasets[i].borderColor = newColors[i];
        centerTopChart.data.datasets[i].backgroundColor = newColors[i];
        centerBottomChart.data.datasets[i].borderColor = newColors[i];
        centerBottomChart.data.datasets[i].backgroundColor = newColors[i];
    }
    leftTopChart.update();
    leftBottomChart.update();
    centerTopChart.update();
    centerBottomChart.update();
    rightTopChart.update();
    rightBottomChart.update();
}

function clickHandler(evt) {
    const points = leftTopChart.getElementsAtEventForMode(evt, 'nearest', { intersect: true }, true);

    if (points.length) {
        const firstPoint = points[0];
        const label = leftTopChart.data.labels[firstPoint.index];
        //const value = leftTopChart.data.datasets[firstPoint.datasetIndex].data[firstPoint.index];
        updateWeatherChart(label);
        updateUserChart(label);
        updateConditionChart(label);
    }
}
