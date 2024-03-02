let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');
let buffer = 100; // Adjust this value as needed

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if (top >= offset - buffer && top < offset + height - buffer) {
            navLinks.forEach(link => {
                link.classList.remove('active');
            });
            document.querySelector('header nav a[href="#' + id + '"]').classList.add('active');
        }
    });
};

function calculateSolarRooftop() {
    // Retrieve values from input fields
    // Retrieve values from input fields
const pow = parseFloat(document.getElementById("power").value);
const budget = parseFloat(document.getElementById("budget").value);
const dper = parseFloat(document.getElementById("dper").value);

// Ensure the retrieved values are valid numbers
if (isNaN(pow) || isNaN(budget) || isNaN(dper)) {
    alert("Please enter valid numbers in all fields.");
    return;
}

// element 0=mono, 1=poly, 2=thin (prefer mono)
let type = [0.1, 0, 0];
let typen = ["Monocrystalline", "Polycrystalline", "Thin Film"];
let price = [
    [400, 375, 325],
    [4250, 3750, 3400],
    [18750, 16500, 14400]
];

// element 0=500w, 1=100w, 2=10w (prefer 500w)
let size = [0, 0, 0.1];
let sizen = ["500Watt", "100Watt", "10Watt"];

// find house type
let house = "-"; // You can define the house variable here or get it from another source

house = house.toUpperCase();

if (house == "CONDO") {
    size[0]++;
    size[1]++;
}

let power = [
    [0.0, 0.12],
    [0.0, 1.2],
    [0.0, 6.0]
];

//find watt needed (unit per day)
let dailyPower = (pow / 30) * dper;

for (let i = 0; i < 3; ++i) {
    power[i][0] = dailyPower;
}

//find best size
function sizep(p){

    let x = [0,0,0];

    for(let i=0; i<3; ++i){
    x[i] = Math.abs(p[i][1]-p[i][0]);
    }

    return fmin(x);
}

function fmin(x){
    let min = Math.min(x[0],x[1],x[2]);
    min = x.indexOf(min);

    return min;
}

function fmax(x){
    let max = Math.max(x[0],x[1],x[2]);
    max = x.indexOf(max);

    return max;
}

let sip = sizep(power);
size[sip]++;

//find best type
for(let i=2; i>=0; --i){
for(let j=0; j<3; ++j){

    if(budget>=price[i][j]) {
    type[j]++; 
    size[i]++;
    }
}
}

//fix size (from 10w,100w,500w) to 500w,100w,10w (prefer 500w)
size = size.reverse()

let drt = ["25-40","25-35","10-25"];
let prices = [["17,500-20,000","3,500-5,000","300-500"],
              ["15,000-18,000","3,000-4,500","300-450"],
              ["12,800-16,000","2,800-4,000","250-450"]];
let web = ["Solartron : https://www.solartron.co.th/",
           "JA solar : https://www.jasolar.com/html/en/",
           "GKN solar : https://www.gknhydrogen.com/",
           "Longi : https://www.longi.com/en/"];
let rcm = ["Highly efficient but pricey","Moderate efficiency at such a great price","Least efficient but affordable"];

alert("Your ideal Solar Rooftop is:"+ sizen[fmax(size)]+" "+ typen[fmax(type)] + "\nIt has an approximate price of "+prices[fmax(type)][fmax(size)]+" Baht per panel\nIt has an approximate duration of " + drt[fmax(type)]+" years"+"\n"+rcm[fmax(type)]+"\nYou should consider buying: Monitor System, Safety devices, net metering"+"\nYou can buy these solar panel through: \n" + web[0] +"\n"+ web[1] +"\n"+ web[2] +"\n"+ web[3]+"\nThis is an approximation and information might be incorrect.");
}

function validateAndAlert() {
    const power = parseFloat(document.getElementById("power").value);
    const budget = parseFloat(document.getElementById("budget").value);
    const dper = parseFloat(document.getElementById("dper").value);

   
    if (isNaN(power) || isNaN(budget) || isNaN(dper)) {
        alert("Please enter valid numbers in all fields.");
        return; 
    }

    calculateSolarRooftop(); 
}

