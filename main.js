//Main variables
var table = [];
var csvUrl = "https://raphaelvddoel.github.io/visualization/dataset.csv";

//variables for Accidents per road type
var labels1 = ["Motorway", "A(M)", "A", "B", "C", "Unclassified"]; // in dataset 1,2,3,4,5,6
var result1 = [0,0,0,0,0,0];
var result2 = [0,0,0,0,0,0];
var pieChart;
var pieChart2;

//Variables for chart editor
var selectedChartLeft = 'pieChart1';
var selectedChartRight = 'barChart1';

//variables for barchart 1
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

var result3 = [0,0,0,0,0,0];
var barChart1;
//initial activation function call
init();

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

async function init() {
    await getData();
    pieChart1('chartLeft');
    //pieChart2();
    barChart1('chartRight');
}
async function getData(){ 
    const response = await fetch(csvUrl);
    const data = await response.text();
    const refinedData = data.trim();
    table = refinedData.split('\n').slice(1);
}

/* --------- start pie chart function --------*/
function setDataAccidentRoadClass() {
    table.forEach( row => {
        let columns = row.split(','); 
        const road_class        = columns[14];
        result1[parseInt(road_class) - 1]++;
    });

    /*let firstRow = table[0];
    elem = firstRow.split(',')
    console.log(elem[getIndex('Accident_Index')], elem[getIndex("Weather_Conditions")]);
    console.log(parseInt(elem[14])); */
}

async function pieChart1(canvas){
    await setDataAccidentRoadClass();
    
    const ctx = document.getElementById(canvas).getContext('2d');
    
    pieChart1 = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: labels1,
            datasets: [{
                data: result1,
                fill: true,
                backgroundColor: [
                    'rgba(0, 37, 255, 0.6)',        //1
                    'rgba(0, 231, 226, 0.5)',       //2
                    'rgba(116, 255, 147, 1)',       //3
                    'rgba(245, 40, 145, 0.8)',      //4
                    'rgba(157, 146, 152, 0.8)',     //5
                    'rgba(110, 44, 20, 0.8)',       //6
                ],
                borderColor: 'rgba(0, 0, 0, 0.4)',
                borderWidth: 1
            }]
        },
        // options: {
        //     title: {
        //       display: true,
        //       text: 'Predicted world population (millions) in 2050'
        //     }
        //   }
        options:{
            maintainAspectRatio: false,
            //responsive: true,
            
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

/* ---------- end piechart function ---------- */
function updateSecondPieChart() {
    result2 = [0,0,0,0,0,0];
    typeChosen = document.getElementById("sliderWeather").value;
    setDataAccidentRoadClassPerWeather(typeChosen);
    pieChart2.data.datasets[0].data = result2;
    pieChart2.update();
    document.getElementById('selectedWeather').innerHTML = typeChosen;
}

/* --------- start pie chart function --------*/
function setDataAccidentRoadClassPerWeather(selectedType = 5) {
    let firstRow = table[0];
    table.forEach( row => {
        let columns = row.split(','); 
        const road_class = columns[14];
        const weather_type = columns[getIndex("Weather_Conditions")];
        if (weather_type == selectedType) {
            result2[parseInt(road_class) - 1]++;
        }
    });
}

async function pieChart2(canvas){
    await setDataAccidentRoadClassPerWeather();
    
    const ctx = document.getElementById(canvas).getContext('2d');
    
    pieChart2 = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: labels1,
            datasets: [{
                data: result2,
                fill: true,
                backgroundColor: [
                    'rgba(0, 37, 255, 0.6)',        //1
                    'rgba(0, 231, 226, 0.5)',       //2
                    'rgba(116, 255, 147, 1)',       //3
                    'rgba(245, 40, 145, 0.8)',      //4
                    'rgba(157, 146, 152, 0.8)',     //5
                    'rgba(110, 44, 20, 0.8)',       //6
                ],
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
        
    });
}


/* ---------- end piechart function ---------- */
/* ---------- Start bar chart function ---------- */

function setDataAccidentRoadClassPerUser(selectedType = 5) {

    table.forEach( row => {
        let columns = row.split(','); 
        const road_class = columns[14];
        const casualty_type = columns[getIndex("Casualty_Type")];
        if (casualty_type == selectedType) {
            result3[parseInt(road_class) - 1]++;
        }
    });
}

function updateBarChart() {
    result3 = [0,0,0,0,0,0];
    let select = document.getElementById("selectUser");
    let typeChosen = select.options[select.selectedIndex].value;
    console.log(typeChosen);
    setDataAccidentRoadClassPerUser(typeChosen);
    barChart1.data.datasets[0].data = result3;
    barChart1.update();
    document.getElementById('selectedUser').innerHTML = typeChosen;
    console.log(result3);
}

async function barChart1(canvas){
    await setDataAccidentRoadClassPerUser();
    
    const ctx = document.getElementById(canvas).getContext('2d');
    
    barChart1 = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels1,
            datasets: [
              {
                label: "Amount of accidents",
                backgroundColor: [
                    'rgba(0, 37, 255, 0.6)',        //1
                    'rgba(0, 231, 226, 0.5)',       //2
                    'rgba(116, 255, 147, 1)',       //3
                    'rgba(245, 40, 145, 0.8)',      //4
                    'rgba(157, 146, 152, 0.8)',     //5
                    'rgba(110, 44, 20, 0.8)',       //6
                ],
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
        
    });
}

/* ---------- End bar chart function ---------- */

/* ---------- Start of update graph functions ---------- */
function updateLeftGraph() {
    let select  = document.getElementById('selectLeftGraph')
    let typeChosen = select.options[select.selectedIndex].value;
    if (typeChosen == selectedChartRight) {
        alert("can't select two of same graphs");
    } else {
        if (selectedChartLeft == 'pieChart1') {
            pieChart1.destroy();
        } else if (selectedChartLeft == 'pieChart2') {
            pieChart2.destroy();
        } else if (selectedChartLeft == 'barChart1') {
            barChart1.destroy();
        } else {
            alert('selected type is not an option');
        }
        if (typeChosen == 'pieChart1') {
            var1 = document.getElementById("selectorpieChart2Left").style.display = 'none';
            var2 = document.getElementById("selectorBarChart1Left").style.display = 'none';
            pieChart1('chartLeft');
        } else if (typeChosen == 'pieChart2') {
            var1 = document.getElementById("selectorpieChart2Left").style.display = 'inline';
            var2 = document.getElementById("selectorBarChart1Left").style.display = 'none';
            pieChart2('chartLeft');
        } else if (typeChosen == 'barChart1') {
            var1 = document.getElementById("selectorpieChart2Left").style.display = 'none';
            var2 = document.getElementById("selectorBarChart1Left").style.display = 'inline';
            barChart1('chartLeft');
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
        
        selectedChartLeft = typeChosen;
    }
    
}

function updateRightGraph() {
    let select  = document.getElementById('selectRightGraph')
    let typeChosen = select.options[select.selectedIndex].value;
    if (selectedChartRight == 'pieChart1') {
        pieChart1.destroy();
    } else if (selectedChartRight == 'pieChart2') {
        pieChart2.destroy();
    } else if (selectedChartRight == 'barChart1') {
        barChart1.destroy();
    } else {
        alert('selected type is not an option');
    }
    if (typeChosen == 'pieChart1') {
        var1 = document.getElementById("selectorpieChart2Right").style.display = 'none';
        var2 = document.getElementById("selectorBarChart1Right").style.display = 'none';
        pieChart1('chartRight');
    } else if (typeChosen == 'pieChart2') {
        var1 = document.getElementById("selectorpieChart2Right").style.display = 'inline';
        var2 = document.getElementById("selectorBarChart1Right").style.display = 'none';
        pieChart2('chartRight');
    } else if (typeChosen == 'barChart1') {
        var1 = document.getElementById("selectorpieChart2Right").style.display = 'none';
        var2 = document.getElementById("selectorBarChart1Right").style.display = 'inline';
        barChart1('chartRight');
    } else {
        alert('selected type is not an option');
    }
    var options = document.getElementById("selectLeftGraph").getElementsByTagName("option");
    console.log(options);
    for (var i = 0; i < options.length; i++) {
         if (options[i].value == typeChosen) {
            options[i].disabled = true;
         } else {
            options[i].disabled = false;
         }
    }
    selectedChartRight = typeChosen;

}
/* ---------- End of update graph functions ---------- */