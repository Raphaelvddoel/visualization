//Main variables
var table = [];
var csvUrl = "https://raphaelvddoel.github.io/visualization/dataset.csv";

//variables for charts
var dataDefaultChart = [0,0,0,0,0,0]; 
var dataWeatherChart = [0,0,0,0,0,0,0,0,0];
var dataUserChart = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
var dataConditionChart = [0,0,0,0,0,0,0,0,0,0];

//config variable declaration
var defaultChart;
var weatherChart;
var userChart;
var conditionChart;

//Chart objects
var leftTopChart;
var leftBottomChart;
var centerTopChart;
var centerBottomChart;
var rightTopChart;
var rightBottomChart;

var labelsWeatherType = ['Fine no high winds', 'Raining no high winds', 'Snowing no high winds', 'Fine + high winds', 'Raining + high winds', 'Snowing + high winds', 'Fog or mist', 'Other', 'Unknown'];
var labelsConditions = ['None', 'Auto traffic signal - out', 'Auto signal part defective', 'Road sign or marking defective or obscured', 'Roadworks', 'Road surface defective', 'Oil or diesel', 'Mud', 'Data missing or out of range', 'unknown (self reported)'];
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
    updateChart('chartLeftTop');
    updateChart('chartLeftBottom');
    updateChart('chartRightTop');
    updateChart('chartRightBottom');
    
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
                    dataConditionChart[parseInt(Condition_at_site)]++;
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
                dataConditionChart[parseInt(Condition_at_site)]++;
            }
        });
    }
}
/* end of data function */

function updateChart(canvas) {
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
    } else if (canvas == 'chartCenterTop') {
        if (rightTopChart) {
            rightTopChart.destroy();
        }
        temp = jQuery.extend(true, {}, weatherChart);
        rightTopChart = new Chart(ctx, temp);
    } else if (canvas == 'chartCenterBottom') {
        if (rightTopChart) {
            rightTopChart.destroy();
        }
        temp = jQuery.extend(true, {}, weatherChart);
        rightTopChart = new Chart(ctx, temp);
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
    } 
}

function updateLeftBottomChartType() {
    var ctx = document.getElementById('chartLeftBottom').getContext("2d");
    if (leftBottomChart) {
        leftBottomChart.destroy();
    }
    var type;
    if (document.getElementById('rightPie').checked) {
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
    if (document.getElementById('centerPie').checked) {
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
    if (rightTopChart) {
        rightTopChart.destroy();
    }
    var type;
    if (document.getElementById('centerPie').checked) {
        type = 'pie';
    } else {
        type = 'bar';
    }
    temp = jQuery.extend(true, {}, weatherChart);
    temp.type = type;
    rightTopChart = new Chart(ctx, temp);
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

function updateUserChart(typeChosen) {
    dataUserChart = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    if (typeChosen !== undefined) {
        setDataUserChart(labels1.indexOf(typeChosen)+1);
    } else {
        setDataUserChart();
    }
    leftBottomChart.data.datasets[0].data = dataUserChart;
    leftBottomChart.update();
    updateColors();
}

function resetCharts() {
    updateWeatherChart();
    updateUserChart();
}

function updateColors() {
    let selectColor  = document.getElementById('selectColor');
    let colorChosen = selectColor.selectedIndex;
    leftTopChart.data.datasets[0].backgroundColor = colorList[colorChosen];
    leftBottomChart.data.datasets[0].backgroundColor = colorList[colorChosen];
    leftTopChart.update();
    leftBottomChart.update();
}

function clickHandler(evt) {
    const points = leftTopChart.getElementsAtEventForMode(evt, 'nearest', { intersect: true }, true);

    if (points.length) {
        const firstPoint = points[0];
        const label = leftTopChart.data.labels[firstPoint.index];
        //const value = leftTopChart.data.datasets[firstPoint.datasetIndex].data[firstPoint.index];
        updateWeatherChart(label);
        updateUserChart(label);
    }
}
