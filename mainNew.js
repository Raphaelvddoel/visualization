//Main variables
var table = [];
var csvUrl = "https://raphaelvddoel.github.io/visualization/dataset.csv";

//variables for charts
var result1 = [0,0,0,0,0,0];
var result2 = [0,0,0,0,0,0];
var result3 = [0,0,0,0,0,0];
var defaultChart;
var weatherChart;
var userChart;
var conditionChart;

//Variables for chart editor
var selectedChartLeft = 'pieChart1';
var selectedChartRight = 'barChart1';

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

//REMOVE THIS FOR FINAL VERSION
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
    showCharts();
    
}
/* data functions */
async function getData(){ 
    const response = await fetch(csvUrl);
    const data = await response.text();
    const refinedData = data.trim();
    table = refinedData.split('\n').slice(1);
}
function calcData() {
    setDatadefaultPieChart();
    setDataWeatherType();
    setDataUserType();
    setDataConditionsOnSite();
}

function showCharts() {
    setDefaultChart();
    //updateWeatherChartType();
    //setStreamChart();
    //setLineChart();
    setWeatherChart();
    setUserChart();
    setConditionChart();
    //updateUserChartType();
    //updateConditionChartType();
}

var accidentsRoadClass = [0,0,0,0,0,0];
var labelsRoadClass = ["Motorway", "A(M)", "A", "B", "C", "Unclassified"];
function setDatadefaultPieChart() {
    table.forEach( row => {
        let columns = row.split(','); 
        const road_class = columns[14];
        accidentsRoadClass[parseInt(road_class) - 1]++;
    });
}

var accidentsWeatherType = [0,0,0,0,0,0,0,0,0];
var labelsWeatherType = ['Fine no high winds', 'Raining no high winds', 'Snowing no high winds', 'Fine + high winds', 'Raining + high winds', 'Snowing + high winds', 'Fog or mist', 'Other', 'Unknown'];

function setDataWeatherType(roadclass) {
    accidentsWeatherType = [0,0,0,0,0,0,0,0,0];
    if (roadclass !== undefined) {
        table.forEach( row => {
            let columns = row.split(','); 
            if (columns[14] == roadclass) {
                const weather_type = columns[25];
                accidentsWeatherType[parseInt(weather_type) - 1]++;
            }
        });
    } else {
        table.forEach( row => {
            let columns = row.split(','); 
            const weather_type = columns[25];
            accidentsWeatherType[parseInt(weather_type) - 1]++;
        });
    }
    console.log(accidentsWeatherType);    
}

var labelIdList = [0,1,2,3,4,5,8,9,10,11,16,17,18,19,20,21,22,23,90,97,98];
var accidentsUserType = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
var labelsUserType = ['Pedestrian', 
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
function setDataUserType(roadclass) {
    accidentsUserType = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    if (roadclass !== undefined) {
        table.forEach( row => {
            let columns = row.split(','); 
            if (columns[14] == roadclass) {
                const casualty_type = columns[44];
                accidentsUserType[labelIdList.indexOf(parseInt(casualty_type))]++;
            }
        });
    } else {
        table.forEach( row => {
            let columns = row.split(','); 
            const casualty_type = columns[44];
            accidentsUserType[labelIdList.indexOf(parseInt(casualty_type))]++;
        });
    }
}

var accidentsConditions = [];
var labelsConditions = ['None',
    'Auto traffic signal - out',
    'Auto signal part defective',
    'Road sign or marking defective or obscured',
    'Roadworks',
    'Road surface defective',
    'Oil or diesel',
    'Mud',
    'Data missing or out of range',
    'unknown (self reported)']
function setDataConditionsOnSite(roadclass) {
    accidentsConditions = [0,0,0,0,0,0,0,0,0,0];
    if (roadclass !== undefined) {
        table.forEach( row => {
            let columns = row.split(','); 
            if (columns[14] == roadclass) {
                var Condition_at_site = columns[27];
                if (Condition_at_site == -1) {
                    Condition_at_site = 8;
                }
                if (!(Condition_at_site > -1 && Condition_at_site < 10)) {
                    console.log(Condition_at_site);
                }
                /*
                if (typeof(Condition_at_site) != "number") {
                    console.log(Condition_at_site);
                }*/
                if (Condition_at_site == null || Condition_at_site == undefined) {
                    console.log("found");
                }
                accidentsConditions[parseInt(Condition_at_site)]++;
            }
        });
    } else {
        table.forEach( row => {
            let columns = row.split(','); 
            var Condition_at_site = columns[27];
            if (Condition_at_site == -1) {
                Condition_at_site = 8;
            }
            if (!(Condition_at_site > -2 && Condition_at_site < 10)) {
                console.log(Condition_at_site);
            }/*
            if (typeof(Condition_at_site) != "number") {
                console.log(Condition_at_site);
            }*/
            if (Condition_at_site == null || Condition_at_site == undefined) {
                console.log("found");
            }
            accidentsConditions[parseInt(Condition_at_site)]++;
        });
    }
}

function setDataStreamChart(roadclass) {

}

function setDataLineChart(roadclass) {
    
}

/* Chart js functions */
var chartLeftTop;
function setDefaultChart() {
    
    var ctx = document.getElementById('chartLeftTop').getContext('2d');
    if (chartLeftTop) {
        chartLeftTop.destroy();
    }
    temp = jQuery.extend(true, {}, defaultChart);
    //temp.type = type; // The new chart type
    chartLeftTop = new Chart(ctx, temp);
    /*
    var ctx = document.getElementById('chartLeftTop').getContext('2d');
    chartLeftTop = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: labelsRoadClass,
            datasets: [{
                data: accidentsRoadClass,
                fill: true,
                backgroundColor: regList,
                borderColor: 'rgba(0, 0, 0, 0.4)',
                borderWidth: 1
            }]
        },
        options:{
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
    }); */
}
var chartLeftBottom;

function setWeatherChart() {
    
    var ctx = document.getElementById('chartLeftBottom').getContext('2d');
    if (chartLeftBottom) {
        chartLeftBottom.destroy();
    }
    temp2 = jQuery.extend(true, {}, weatherChart);
    //temp.type = type; // The new chart type
    chartLeftBottom = new Chart(ctx, temp2);
    /*
    var ctx = document.getElementById('chartLeftBottom').getContext('2d');
    chartLeftBottom = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: labelsWeatherType,
            datasets: [{
                data: accidentsWeatherType,
                fill: true,
                backgroundColor: regList,
                borderColor: 'rgba(0, 0, 0, 0.4)',
                borderWidth: 1
            }]
        },
        options:{
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
    }); */
}

var chartCenterTop;
/*
function setStreamChart () {
    var ctx = document.getElementById('chartCenterTop').getContext('2d');
    chartCenterTop = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: labels1,
            datasets: [{
                data: result1,
                fill: true,
                backgroundColor: regList,
                borderColor: 'rgba(0, 0, 0, 0.4)',
                borderWidth: 1
            }]
        },
        options:{
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
    });
}*/

var chartCenterBottom;
/*
function setLineChart () {
    var ctx = document.getElementById('chartCenterBottom').getContext('2d');
    chartCenterBottom = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: labels1,
            datasets: [{
                data: result1,
                fill: true,
                backgroundColor: regList,
                borderColor: 'rgba(0, 0, 0, 0.4)',
                borderWidth: 1
            }]
        },
        options:{
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
    });
}
*/
var chartRightTop;

function setUserChart () {
    
    var ctx = document.getElementById('chartRightTop').getContext('2d');
    if (chartRightTop) {
        chartRightTop.destroy();
    }
    temp2 = jQuery.extend(true, {}, userChart);
    //temp.type = type; // The new chart type
    chartRightTop = new Chart(ctx, temp2);
    /*
    var ctx = document.getElementById('chartRightTop').getContext('2d');
    chartRightTop = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: labelsUserType,
            datasets: [{
                data: accidentsUserType,
                fill: true,
                backgroundColor: regList,
                borderColor: 'rgba(0, 0, 0, 0.4)',
                borderWidth: 1
            }]
        },
        options:{
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
    });*/
}


var chartRightBottom;

function setConditionChart() {
    
    var ctx = document.getElementById('chartRightBottom').getContext('2d');
    chartRightBottom = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: labelsConditions,
            datasets: [{
                data: accidentsConditions,
                fill: true,
                backgroundColor: regList,
                borderColor: 'rgba(0, 0, 0, 0.4)',
                borderWidth: 1
            }]
        },
        options: {
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
    });
}



function updateWeatherChartType() {
    setDataWeatherType();
    console.log(accidentsWeatherType);
    if (document.getElementById('weather_pie').checked) {
        type = 'pie';
    } else {
        type = 'bar';
    }
    var ctx = document.getElementById('chartLeftBottom').getContext('2d');
    if (chartLeftBottom) {
        chartLeftBottom.destroy();
    }
    temp = jQuery.extend(true, {}, weatherChart);
    //temp.type = type; // The new chart type
    chartLeftBottom = new Chart(ctx, temp);
}

function updateUserChartType() {
    setDataUserType();
    console.log(accidentsUserType);
    if (document.getElementById('weather_pie').checked) {
        type = 'pie';
    } else {
        type = 'bar';
    }
    if (chartRightTop) {
        chartRightTop.destroy();
    }
    var ctx = document.getElementById('chartRightTop').getContext('2d');
    temp = jQuery.extend(true, {}, userChart);
    //temp.type = type; // The new chart type
    chartRightTop = new Chart(ctx, temp);
}

function updateConditionChartType() {
    setDataConditionsOnSite();
    console.log(accidentsConditions);
    if (document.getElementById('condition_pie').checked) {
        type = 'pie';
    } else {
        type = 'bar';
    }
    if (chartRightBottom) {
        chartRightBottom.destroy();
    }
    var ctx = document.getElementById('chartRightBottom').getContext('2d');
    temp = jQuery.extend(true, {}, conditionChart);
    //temp.type = type; // The new chart type
    chartRightBottom = new Chart(ctx, temp);
}

/*
function updateWeatherChartData() {
    chartLeftBottom.data.datasets[0].data = accidentsWeatherType;
}

function updateUserChartData() {
    chartRightTop.data.datasets[0].data = accidentsUserType;
}

function updateConditionChartData() {
    chartRightBottom.data.datasets[0].data = accidentsConditions;
}*/
defaultChart = {
    type: 'pie',
    data: {
        labels: labelsRoadClass,
        datasets: [{
            data: accidentsRoadClass,
            fill: true,
            backgroundColor: regList,
            borderColor: 'rgba(0, 0, 0, 0.4)',
            borderWidth: 1
        }]
    },
    options:{
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
            data: accidentsWeatherType,
            fill: true,
            backgroundColor: regList,
            borderColor: 'rgba(0, 0, 0, 0.4)',
            borderWidth: 1
        }]
    },
    options:{
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

userChart = {
    type: 'pie',
    data: {
        labels: labelsUserType,
        datasets: [{
            data: accidentsUserType,
            fill: true,
            backgroundColor: regList,
            borderColor: 'rgba(0, 0, 0, 0.4)',
            borderWidth: 1
        }]
    },
    options:{
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

conditionChart = {
    type: 'pie',
    data: {
        labels: labelsConditions,
        datasets: [{
            data: accidentsConditions,
            fill: true,
            backgroundColor: regList,
            borderColor: 'rgba(0, 0, 0, 0.4)',
            borderWidth: 1
        }]
    },
    options:{
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



/*
//pie chart 1
function setDataAccidentRoadClass() {
    table.forEach( row => {
        let columns = row.split(','); 
        const road_class        = columns[14];
        result1[parseInt(road_class) - 1]++;
    });
}

//pie chart 2
function setDataAccidentRoadClassPerWeather(selectedType = 5) {
    table.forEach( row => {
        let columns = row.split(','); 
        const road_class = columns[14];
        const weather_type = columns[25];
        if (weather_type == selectedType) {
            result2[parseInt(road_class) - 1]++;
        }
    });
}

//bar chart 1
function setDataAccidentRoadClassPerUser(selectedType = 5) {
    table.forEach( row => {
        let columns = row.split(','); 
        const road_class = columns[14];
        const casualty_type = columns[44]; //Change this to index to increase speed
        if (casualty_type == selectedType) {
            result3[parseInt(road_class) - 1]++;
        }
    });
}*/
/* end of data function */

/*
function updateChart(canvas, chart) {
    var ctx = document.getElementById(canvas).getContext("2d");
    var temp;
    if (canvas == 'chartLeft') {
        if (leftChart) {
            leftChart.destroy();
        }
        if (chart == 'pieChart1') {
            temp = jQuery.extend(true, {}, pieChart1);
        } else if (chart == 'pieChart2') {
            temp = jQuery.extend(true, {}, pieChart2);
        } else if (chart == 'barChart1') {
            temp = jQuery.extend(true, {}, barChart1);
        }
        leftChart = new Chart(ctx, temp);
    } else {
        if (rightChart) {
            rightChart.destroy();
        }
        if (chart == 'pieChart1') {
            temp = jQuery.extend(true, {}, pieChart1);
        } else if (chart == 'pieChart2') {
            temp = jQuery.extend(true, {}, pieChart2);
        } else if (chart == 'barChart1') {
            temp = jQuery.extend(true, {}, barChart1);
        }  
        rightChart = new Chart(ctx, temp);
    }
}


pieChart1 = {
    type: 'pie',
    data: {
        labels: labels1,
        datasets: [{
            data: result1,
            fill: true,
            backgroundColor: regList,
            borderColor: 'rgba(0, 0, 0, 0.4)',
            borderWidth: 1
        }]
    },
    options:{
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

pieChart2 = {
    type: 'pie',
    data: {
        labels: labels1,
        datasets: [{
            data: result2,
            fill: true,
            backgroundColor: regList,
            borderColor: 'rgba(0, 0, 0, 0.4)',
            borderWidth: 1
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

barChart1 = {
    type: 'bar',
    data: {
        labels: labels1,
        datasets: [
            {
            label: "Amount of accidents",
            backgroundColor: regList,
            data: result3,
            }
        ]
    },
    options: {
        maintainAspectRatio: false,
    }
}

function updateLeftGraph() {
    let select  = document.getElementById('selectLeftGraph')
    let typeChosen = select.options[select.selectedIndex].value;
    selectedChartLeft = typeChosen;
    updateChart('chartLeft', typeChosen);
    showSelectorLeft(typeChosen);
    updateColors();
}

function updateRightGraph() {
    let select  = document.getElementById('selectRightGraph')
    let typeChosen = select.options[select.selectedIndex].value;
    selectedChartRight = typeChosen;
    updateChart('chartRight', typeChosen);
    showSelectorRight(typeChosen);
    updateColors();
}

function showSelectorLeft(typeChosen) {
    if (typeChosen == 'pieChart1') {
        var1 = document.getElementById("selectorpieChart2Left").style.display = 'none';
        var2 = document.getElementById("selectorBarChart1Left").style.display = 'none';
        document.getElementById('visTitleLeft').innerHTML= "Accidents per road type";
    } else if (typeChosen == 'pieChart2') {
        var1 = document.getElementById("selectorpieChart2Left").style.display = 'inline';
        var2 = document.getElementById("selectorBarChart1Left").style.display = 'none';
        document.getElementById('visTitleLeft').innerHTML= "Accidents per road type during weather condition";
    } else if (typeChosen == 'barChart1') {
        var1 = document.getElementById("selectorpieChart2Left").style.display = 'none';
        var2 = document.getElementById("selectorBarChart1Left").style.display = 'inline';
        document.getElementById('visTitleLeft').innerHTML= "Accidents per road type per user type";
    } else {
        alert('selected type is not an option');
    }
}

function showSelectorRight(typeChosen) {
    if (typeChosen == 'pieChart1') {
        var1 = document.getElementById("selectorpieChart2Right").style.display = 'none';
        var2 = document.getElementById("selectorBarChart1Right").style.display = 'none';
        document.getElementById('visTitleRight').innerHTML= "Accidents per road type";
    } else if (typeChosen == 'pieChart2') {
        var1 = document.getElementById("selectorpieChart2Right").style.display = 'inline';
        var2 = document.getElementById("selectorBarChart1Right").style.display = 'none';
        document.getElementById('visTitleRight').innerHTML= "Accidents per road type during weather condition";
    } else if (typeChosen == 'barChart1') {
        var1 = document.getElementById("selectorpieChart2Right").style.display = 'none';
        var2 = document.getElementById("selectorBarChart1Right").style.display = 'inline';
        document.getElementById('visTitleRight').innerHTML= "Accidents per road type per user type";
    } else {
        alert('selected type is not an option');
    }
}

function updatePieChart2(left) {
    result2 = [0,0,0,0,0,0];
    if (left) {
        if (selectedChartLeft == 'pieChart2') {
            typeChosen = document.getElementById("sliderWeatherLeft").value;
            setDataAccidentRoadClassPerWeather(typeChosen);
            leftChart.data.datasets[0].data = result2;
            leftChart.update();
            document.getElementById('selectedWeatherLeft').innerHTML = weatherList[typeChosen];
        } 
    } else {
        if (selectedChartRight == 'pieChart2') {
            typeChosen = document.getElementById("sliderWeatherRight").value;
            setDataAccidentRoadClassPerWeather(typeChosen);
            rightChart.data.datasets[0].data = result2;
            rightChart.update();
            document.getElementById('selectedWeatherRight').innerHTML = weatherList[typeChosen];
        }
    }
    updateColors();
}

function updateBarChart1(left) {
    result3 = [0,0,0,0,0,0];
    if (left) {
        if (selectedChartLeft == 'barChart1') {
            let select = document.getElementById("selectUserLeft");
            let typeChosen = select.options[select.selectedIndex].value;
            setDataAccidentRoadClassPerUser(labelIdList[typeChosen]);
            console.log(labelIdList[typeChosen]);
            leftChart.data.datasets[0].data = result3;
            leftChart.update();
            document.getElementById('selectedUserLeft').innerHTML = labels2[typeChosen];
        }
    } else {
        if (selectedChartRight == 'barChart1') {
            let select = document.getElementById("selectUserRight");
            let typeChosen = select.options[select.selectedIndex].value;
            setDataAccidentRoadClassPerUser(labelIdList[typeChosen]);
            rightChart.data.datasets[0].data = result3;
            rightChart.update();
            document.getElementById('selectedUserRight').innerHTML = labels2[typeChosen];
        }
    }
    updateColors();
}

function updateColors() {
    let selectColor  = document.getElementById('selectColor');
    let colorChosen = selectColor.selectedIndex;
    leftChart.data.datasets[0].backgroundColor = colorList[colorChosen];
    rightChart.data.datasets[0].backgroundColor = colorList[colorChosen];
    leftChart.update();
    rightChart.update();
}

function updateSliderLabelLeft() {
    typeChosen = document.getElementById("sliderWeatherLeft").value;
    document.getElementById('sliderSelectedWeatherTypeLeft').innerHTML = weatherList[typeChosen];
} 
function updateSliderLabelRight() {
    typeChosen = document.getElementById("sliderWeatherRight").value;
    document.getElementById('sliderSelectedWeatherTypeRight').innerHTML = weatherList[typeChosen];
}

function clickHandler(evt) {
    const points = leftChart.getElementsAtEventForMode(evt, 'nearest', { intersect: true }, true);

    if (points.length) {
        const firstPoint = points[0];
        const label = leftChart.data.labels[firstPoint.index];
        const value = leftChart.data.datasets[firstPoint.datasetIndex].data[firstPoint.index];
        console.log(label);
        console.log(value);
    }
}*/