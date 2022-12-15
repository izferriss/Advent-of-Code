// --- Day 15: Beacon Exclusion Zone ---
// You feel the ground rumble again as the distress signal leads you to a large network of subterranean tunnels. You don't have time to search them all, but you don't need to: your pack contains a set of deployable sensors that you imagine were originally built to locate lost Elves.

// The sensors aren't very powerful, but that's okay; your handheld device indicates that you're close enough to the source of the distress signal to use them. You pull the emergency sensor system out of your pack, hit the big button on top, and the sensors zoom off down the tunnels.

// Once a sensor finds a spot it thinks will give it a good reading, it attaches itself to a hard surface and begins monitoring for the nearest signal source beacon. Sensors and beacons always exist at integer coordinates. Each sensor knows its own position and can determine the position of a beacon precisely; however, sensors can only lock on to the one beacon closest to the sensor as measured by the Manhattan distance. (There is never a tie where two beacons are the same distance to a sensor.)

// It doesn't take long for the sensors to report back their positions and closest beacons (your puzzle input). For example:

// Sensor at x=2, y=18: closest beacon is at x=-2, y=15
// Sensor at x=9, y=16: closest beacon is at x=10, y=16
// Sensor at x=13, y=2: closest beacon is at x=15, y=3
// Sensor at x=12, y=14: closest beacon is at x=10, y=16
// Sensor at x=10, y=20: closest beacon is at x=10, y=16
// Sensor at x=14, y=17: closest beacon is at x=10, y=16
// Sensor at x=8, y=7: closest beacon is at x=2, y=10
// Sensor at x=2, y=0: closest beacon is at x=2, y=10
// Sensor at x=0, y=11: closest beacon is at x=2, y=10
// Sensor at x=20, y=14: closest beacon is at x=25, y=17
// Sensor at x=17, y=20: closest beacon is at x=21, y=22
// Sensor at x=16, y=7: closest beacon is at x=15, y=3
// Sensor at x=14, y=3: closest beacon is at x=15, y=3
// Sensor at x=20, y=1: closest beacon is at x=15, y=3
// So, consider the sensor at 2,18; the closest beacon to it is at -2,15. For the sensor at 9,16, the closest beacon to it is at 10,16.

// Drawing sensors as S and beacons as B, the above arrangement of sensors and beacons looks like this:

//                1    1    2    2
//      0    5    0    5    0    5
//  0 ....S.......................
//  1 ......................S.....
//  2 ...............S............
//  3 ................SB..........
//  4 ............................
//  5 ............................
//  6 ............................
//  7 ..........S.......S.........
//  8 ............................
//  9 ............................
// 10 ....B.......................
// 11 ..S.........................
// 12 ............................
// 13 ............................
// 14 ..............S.......S.....
// 15 B...........................
// 16 ...........SB...............
// 17 ................S..........B
// 18 ....S.......................
// 19 ............................
// 20 ............S......S........
// 21 ............................
// 22 .......................B....
// This isn't necessarily a comprehensive map of all beacons in the area, though. Because each sensor only identifies its closest beacon, if a sensor detects a beacon, you know there are no other beacons that close or closer to that sensor. There could still be beacons that just happen to not be the closest beacon to any sensor. Consider the sensor at 8,7:

//                1    1    2    2
//      0    5    0    5    0    5
// -2 ..........#.................
// -1 .........###................
//  0 ....S...#####...............
//  1 .......#######........S.....
//  2 ......#########S............
//  3 .....###########SB..........
//  4 ....#############...........
//  5 ...###############..........
//  6 ..#################.........
//  7 .#########S#######S#........
//  8 ..#################.........
//  9 ...###############..........
// 10 ....B############...........
// 11 ..S..###########............
// 12 ......#########.............
// 13 .......#######..............
// 14 ........#####.S.......S.....
// 15 B........###................
// 16 ..........#SB...............
// 17 ................S..........B
// 18 ....S.......................
// 19 ............................
// 20 ............S......S........
// 21 ............................
// 22 .......................B....
// This sensor's closest beacon is at 2,10, and so you know there are no beacons that close or closer (in any positions marked #).

// None of the detected beacons seem to be producing the distress signal, so you'll need to work out where the distress beacon is by working out where it isn't. For now, keep things simple by counting the positions where a beacon cannot possibly be along just a single row.

// So, suppose you have an arrangement of beacons and sensors like in the example above and, just in the row where y=10, you'd like to count the number of positions a beacon cannot possibly exist. The coverage from all sensors near that row looks like this:

//                  1    1    2    2
//        0    5    0    5    0    5
//  9 ...#########################...
// 10 ..####B######################..
// 11 .###S#############.###########.
// In this example, in the row where y=10, there are 26 positions where a beacon cannot be present.

// Consult the report from the sensors you just deployed. In the row where y=2000000, how many positions cannot contain a beacon?

// --- Part Two ---
// Your handheld device indicates that the distress signal is coming from a beacon nearby. The distress beacon is not detected by any sensor, but the distress beacon must have x and y coordinates each no lower than 0 and no larger than 4000000.

// To isolate the distress beacon's signal, you need to determine its tuning frequency, which can be found by multiplying its x coordinate by 4000000 and then adding its y coordinate.

// In the example above, the search space is smaller: instead, the x and y coordinates can each be at most 20. With this reduced search area, there is only a single position that could have a beacon: x=14, y=11. The tuning frequency for this distress beacon is 56000011.

// Find the only possible position for the distress beacon. What is its tuning frequency?

let input =
[
    // SAMPLE
    // "Sensor at x=2, y=18: closest beacon is at x=-2, y=15",
    // "Sensor at x=9, y=16: closest beacon is at x=10, y=16",
    // "Sensor at x=13, y=2: closest beacon is at x=15, y=3",
    // "Sensor at x=12, y=14: closest beacon is at x=10, y=16",
    // "Sensor at x=10, y=20: closest beacon is at x=10, y=16",
    // "Sensor at x=14, y=17: closest beacon is at x=10, y=16",
    // "Sensor at x=8, y=7: closest beacon is at x=2, y=10",
    // "Sensor at x=2, y=0: closest beacon is at x=2, y=10",
    // "Sensor at x=0, y=11: closest beacon is at x=2, y=10",
    // "Sensor at x=20, y=14: closest beacon is at x=25, y=17",
    // "Sensor at x=17, y=20: closest beacon is at x=21, y=22",
    // "Sensor at x=16, y=7: closest beacon is at x=15, y=3",
    // "Sensor at x=14, y=3: closest beacon is at x=15, y=3",
    // "Sensor at x=20, y=1: closest beacon is at x=15, y=3"
    // INPUT
    "Sensor at x=2557568, y=3759110: closest beacon is at x=2594124, y=3746832",
    "Sensor at x=2684200, y=1861612: closest beacon is at x=2816974, y=2000000",
    "Sensor at x=1003362, y=1946094: closest beacon is at x=1972523, y=2563441",
    "Sensor at x=2142655, y=1481541: closest beacon is at x=1932524, y=967542",
    "Sensor at x=2796219, y=1955744: closest beacon is at x=2816974, y=2000000",
    "Sensor at x=3890832, y=1818644: closest beacon is at x=3454717, y=2547103",
    "Sensor at x=2828842, y=1921726: closest beacon is at x=2816974, y=2000000",
    "Sensor at x=2065227, y=583957: closest beacon is at x=1932524, y=967542",
    "Sensor at x=2725784, y=2088998: closest beacon is at x=2816974, y=2000000",
    "Sensor at x=3574347, y=927734: closest beacon is at x=1932524, y=967542",
    "Sensor at x=2939312, y=2652370: closest beacon is at x=3454717, y=2547103",
    "Sensor at x=2495187, y=3681541: closest beacon is at x=2431306, y=3703654",
    "Sensor at x=2878002, y=2054681: closest beacon is at x=2816974, y=2000000",
    "Sensor at x=1539310, y=3235516: closest beacon is at x=1972523, y=2563441",
    "Sensor at x=545413, y=533006: closest beacon is at x=-538654, y=69689",
    "Sensor at x=1828899, y=3980292: closest beacon is at x=2431306, y=3703654",
    "Sensor at x=3275729, y=2937931: closest beacon is at x=3454717, y=2547103",
    "Sensor at x=600131, y=3861189: closest beacon is at x=2431306, y=3703654",
    "Sensor at x=2089895, y=28975: closest beacon is at x=1932524, y=967542",
    "Sensor at x=2960402, y=3942666: closest beacon is at x=2594124, y=3746832",
    "Sensor at x=3785083, y=3905392: closest beacon is at x=2594124, y=3746832",
    "Sensor at x=1721938, y=1077173: closest beacon is at x=1932524, y=967542",
    "Sensor at x=2515156, y=3751221: closest beacon is at x=2594124, y=3746832",
    "Sensor at x=2469423, y=2109095: closest beacon is at x=2816974, y=2000000",
    "Sensor at x=1776986, y=904092: closest beacon is at x=1932524, y=967542",
    "Sensor at x=2789294, y=3316115: closest beacon is at x=2594124, y=3746832",
    "Sensor at x=3538757, y=2695066: closest beacon is at x=3454717, y=2547103",
    "Sensor at x=2299738, y=2708004: closest beacon is at x=1972523, y=2563441",
    "Sensor at x=2388366, y=3234346: closest beacon is at x=2431306, y=3703654"
];

const sensors = [];
const beacons = [];

let bounds =
{
    minX: 0,
    maxX: 0,
    minY: 0,
    maxY: 0
};

for(var i = 0; i < input.length; i++)
{
    parseInput(input[i]);
}

part1();

/////////////////////////////////////////////////////////////////////////////////////////////////////////

function parseInput(line)
{
    //split string into sections
    let split = line.split(" ");

    //assign sensor x value 
    let sensor_x = parseInt(split[2].substring(split[2].indexOf("=") + 1, split[2].length - 1));

    //assign sensor y value
    let sensor_y = parseInt(split[3].substring(split[3].indexOf("=") + 1, split[3].length - 1));

    //assign beacon x value
    let beacon_x = parseInt(split[8].substring(split[8].indexOf("=") + 1, split[8].length - 1));


    //assign beacon y value
    let beacon_y = parseInt(split[9].substring(split[9].indexOf("=") + 1));

    //create beacon object
    let beacon =
    {
        x: beacon_x,
        y: beacon_y
    };

    //create sensor object
    let sensor = 
    {
        x: sensor_x,
        y: sensor_y,
        nearestBeacon: beacon,
        beaconDistance: Math.abs(sensor_x - beacon_x) + Math.abs(sensor_y - beacon_y)
    };

     //check to see if bounds grew
     if(sensor_x > bounds.maxX){bounds.maxX = sensor_x;}
     if(sensor_x < bounds.minX){bounds.minX = sensor_x;}

     if(sensor_y > bounds.maxY){bounds.maxY = sensor_y;}
     if(sensor_y < bounds.minY){bounds.minY = sensor_y;}

     if(beacon_x > bounds.maxX){bounds.maxX = beacon_x;}
     if(beacon_x < bounds.minX){bounds.minX = beacon_x;}

     if(beacon_y > bounds.maxY){bounds.maxY = beacon_y;}
     if(beacon_y < bounds.minY){bounds.minY = beacon_y;}

    //push objects to respective arrays
    beacons.push(beacon);
    sensors.push(sensor);
}

function adjustForMin()
{
    let adjustX = 0;
    let adjustY = 0;

    //adjust values to a minimum of one
    if(bounds.minX < 0){adjustX = Math.abs(bounds.minX);}
    if(bounds.minY < 0){adjustY = Math.abs(bounds.minY);}
    console.log(adjustX);
    console.log(adjustY);

    if(adjustX != 0 || adjustY != 0)
    {
        for(var i = 0; i < sensors.length; i++)
        {
            sensors[i].x += adjustX + 1;
            sensors[i].y += adjustY + 1;

            sensors[i].nearestBeacon.x += adjustX + 1;
            sensors[i].nearestBeacon.y += adjustY + 1;
        }
    }
}

function part1()
{
    let noBeacons = new Set();
    let beaconsOnLine = new Set();

    // SAMPLE
    // let checkY = 10;

    // PART 1
    let checkY = 2000000;

    for(var i = 0; i < sensors.length; i++)
    {
        // Add any beacons that share a Y value with the sensor to beaconsOnLine set
        if(sensors[i].nearestBeacon.y === checkY)
        {
            beaconsOnLine.add(sensors[i].nearestBeacon.x);
        }

        // Manhattan distance between line checkY and (sensor.x, sensor.y)
        let minDistance = Math.abs(sensors[i].x - sensors[i].x) + Math.abs(sensors[i].y - checkY);
        if(minDistance <= sensors[i].beaconDistance)
        {
            let radialDistSensorX = sensors[i].beaconDistance - minDistance;

            //for every x value within radius on line checkY, add to noBeacons set
            for(var j = sensors[i].x - radialDistSensorX; j <= sensors[i].x + radialDistSensorX; j++)
            {
                noBeacons.add(j);
            }
        }
    }

    //log of the difference between set sizes which denotes how many positions on line checkY that cannot contain a beacon
    console.log(noBeacons.size - beaconsOnLine.size);
}