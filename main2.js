//Main variables
var table = [];
var csvUrl = "https://raphaelvddoel.github.io/visualization/dataset.csv";

//variables for charts
var result1 = [0,0,0,0,0,0];
var result2 = [0,0,0,0,0,0];
var result3 = [0,0,0,0,0,0];
var pieChart;
var pieChart2;
var barChart1;
var leftChart;
var rightChart;

//Variables for chart editor
var selectedChartLeft = 'pieChart1';
var selectedChartRight = 'barChart1';

//Colorlists
var regList = ['rgba(102,144,252,255)', 'rgba(120,96,237,255)', 'rgba(218,36,127,255)', 'rgba(252,95,27,255)', 'rgba(253,175,37,255)', 'rgba(189,234,179,255)'];
var proList = ['rgba(96,144,252,255)','rgba(19,115,234,255)','rgba(102,116,165,255)','rgba(165,146,36,255)','rgba(214,189,41,255)','rgba(235,220,172,255)'];
var deuList = ['rgba(235,220,172,255)','rgba(18,122,204,255)','rgba(131,113,113,255)','rgba(186,138,25,255)','rgba(242,179,36,255)','rgba(254,213,186,255)'];
var triList = ['rgba(55,161,173,255)','rgba(81,125,134,255)','rgba(213,60,68,255)','rgba(253,91,100,255)','rgba(254,165,177,255)','rgba(200,224,241,255)'];
var colorList = [regList, proList, deuList,triList];
var i = 2;
var colorSet;

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
'Goods vehicle (unknown weight) occupant',
'Unknown vehicle type (self rep only)',
'Motorcycle - Scooter (1979-1998)',
'Motorcycle (1979-1998)',
'Motorcycle - Combination (1979-1998)',
'Motorcycle over 125cc (1999-2004)',
'Taxi (excluding private hire cars) (1979-2004)',
'Car (including private hire cars) (1979-2004)',
'Minibus/Motor caravan (1979-1998)',
'Goods over 3.5 tonnes (1979-1998)'];

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
    //selected colorlist
    colorSet = colorList[i]; 
    //await updateColors();
    await getData();
    await calcData();
    updateChart('chartLeft', 'pieChart1');
    updateChart('chartRight', 'barChart1');
    showSelectorLeft('pieChart1');
    showSelectorRight('barChart1');
}
/* data functions */
async function getData(){ 
    const response = await fetch(csvUrl);
    const data = await response.text();
    const refinedData = data.trim();
    table = refinedData.split('\n').slice(1);
}

function calcData() {
    setDataAccidentRoadClass();
    setDataAccidentRoadClassPerWeather();
    setDataAccidentRoadClassPerUser();
}

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
        const weather_type = columns[25]; //Change this to index to increase speed
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
}
/* end of data function */

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
            backgroundColor: colorSet,
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
            backgroundColor: colorSet,
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
        }
    }
}

barChart1 = {
    type: 'bar',
    data: {
        labels: labels1,
        datasets: [
            {
            label: "Amount of accidents",
            backgroundColor: colorSet,
            data: result3,
            }
        ]
    },
    options: {
        maintainAspectRatio: false,
        plugins: {
            title: {
                display: true,
                text: 'bar chart'
            },
        }
    }
}

function updateLeftGraph() {
    let select  = document.getElementById('selectLeftGraph')
    let typeChosen = select.options[select.selectedIndex].value;
    selectedChartLeft = typeChosen;
    updateChart('chartLeft', typeChosen);
    showSelectorLeft(typeChosen);
}

function updateRightGraph() {
    let select  = document.getElementById('selectRightGraph')
    let typeChosen = select.options[select.selectedIndex].value;
    selectedChartRight = typeChosen;
    updateChart('chartRight', typeChosen);
    showSelectorRight(typeChosen);
}

function showSelectorRight(typeChosen) {
    if (typeChosen == 'pieChart1') {
        var1 = document.getElementById("selectorpieChart2Right").style.display = 'none';
        var2 = document.getElementById("selectorBarChart1Right").style.display = 'none';
    } else if (typeChosen == 'pieChart2') {
        var1 = document.getElementById("selectorpieChart2Right").style.display = 'inline';
        var2 = document.getElementById("selectorBarChart1Right").style.display = 'none';
    } else if (typeChosen == 'barChart1') {
        var1 = document.getElementById("selectorpieChart2Right").style.display = 'none';
        var2 = document.getElementById("selectorBarChart1Right").style.display = 'inline';
    } else {
        alert('selected type is not an option');
    }
    var options = document.getElementById("selectLeftGraph").getElementsByTagName("option");
    for (var i = 0; i < options.length; i++) {
         if (options[i].value == typeChosen) {
            options[i].disabled = true;
         } else {
            options[i].disabled = false;
         }
    }
}

function showSelectorLeft(typeChosen) {
    if (typeChosen == 'pieChart1') {
        var1 = document.getElementById("selectorpieChart2Left").style.display = 'none';
        var2 = document.getElementById("selectorBarChart1Left").style.display = 'none';
    } else if (typeChosen == 'pieChart2') {
        var1 = document.getElementById("selectorpieChart2Left").style.display = 'inline';
        var2 = document.getElementById("selectorBarChart1Left").style.display = 'none';
    } else if (typeChosen == 'barChart1') {
        var1 = document.getElementById("selectorpieChart2Left").style.display = 'none';
        var2 = document.getElementById("selectorBarChart1Left").style.display = 'inline';
    } else {
        alert('selected type is not an option');
    }
    var options = document.getElementById("selectRightGraph").getElementsByTagName("option");
    for (var i = 0; i < options.length; i++) {
         if (options[i].value == typeChosen) {
            options[i].disabled = true;
         } else {
            options[i].disabled = false;
         }
    }
}

function updatePieChart2() {
    result2 = [0,0,0,0,0,0];
    typeChosen = document.getElementById("sliderWeather").value;
    setDataAccidentRoadClassPerWeather(typeChosen);
    if (selectedChartLeft == 'pieChart2') {
        leftChart.data.datasets[0].data = result2;
        leftChart.update();
    } else {
        rightChart.data.datasets[0].data = result2;
        rightChart.update();
    }
    
    document.getElementById('selectedWeather').innerHTML = typeChosen;
}

function updateBarChart1() {
    result3 = [0,0,0,0,0,0];
    let select = document.getElementById("selectUser");
    let typeChosen = select.options[select.selectedIndex].value;
    setDataAccidentRoadClassPerUser(typeChosen);
    if (selectedChartLeft == 'barChart1') {
        leftChart.data.datasets[0].data = result3;
        leftChart.update();
    } else {
        rightChart.data.datasets[0].data = result3;
        rightChart.update();
    }
    document.getElementById('selectedUser').innerHTML = typeChosen;
}

function updateColors() {
    let selectColor  = document.getElementById('selectColor')
    let colorChosen = selectColor.selectedIndex;
    console.log(colorChosen);
    i = colorChosen;
    init();
}
