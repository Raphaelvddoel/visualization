//Main variables
var table = [];
var csvUrl = "https://raphaelvddoel.github.io/visualization/dataset.csv";

//variables for Accidents per road type
var labels1 = ["Motorway", "A(M)", "A", "B", "C", "Unclassified"]; // in dataset 1,2,3,4,5,6
var result1 = [0,0,0,0,0,0];
var result2 = [0,0,0,0,0,0];

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
    pieChart();
    pieChart2();
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

async function pieChart(){
    await setDataAccidentRoadClass();
    
    const ctx = document.getElementById('pieChart').getContext('2d');
    
    pieChart = new Chart(ctx, {
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

/* --------- start pie chart function --------*/
function setDataAccidentRoadClassPerWeather() {
    let firstRow = table[0];
    table.forEach( row => {
        let columns = row.split(','); 
        const road_class = columns[14];
        const weather_type = columns[getIndex("Weather_Conditions")];
        if (weather_type == "7") {
            result2[parseInt(road_class) - 1]++;
        }
    });
    /*let firstRow = table[0];
    elem = firstRow.split(',')
    console.log(elem[getIndex('Accident_Index')], elem[getIndex("Weather_Conditions")]);
    console.log(parseInt(elem[14])); */
}

async function pieChart2(){
    await setDataAccidentRoadClassPerWeather();
    
    const ctx = document.getElementById('pieChart2').getContext('2d');
    
    pieChart = new Chart(ctx, {
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