// --- Day 16: Proboscidea Volcanium ---
// The sensors have led you to the origin of the distress signal: yet another handheld device, just like the one the Elves gave you. However, you don't see any Elves around; instead, the device is surrounded by elephants! They must have gotten lost in these tunnels, and one of the elephants apparently figured out how to turn on the distress signal.

// The ground rumbles again, much stronger this time. What kind of cave is this, exactly? You scan the cave with your handheld device; it reports mostly igneous rock, some ash, pockets of pressurized gas, magma... this isn't just a cave, it's a volcano!

// You need to get the elephants out of here, quickly. Your device estimates that you have 30 minutes before the volcano erupts, so you don't have time to go back out the way you came in.

// You scan the cave for other options and discover a network of pipes and pressure-release valves. You aren't sure how such a system got into a volcano, but you don't have time to complain; your device produces a report (your puzzle input) of each valve's flow rate if it were opened (in pressure per minute) and the tunnels you could use to move between the valves.

// There's even a valve in the room you and the elephants are currently standing in labeled AA. You estimate it will take you one minute to open a single valve and one minute to follow any tunnel from one valve to another. What is the most pressure you could release?

// For example, suppose you had the following scan output:

// Valve AA has flow rate=0; tunnels lead to valves DD, II, BB
// Valve BB has flow rate=13; tunnels lead to valves CC, AA
// Valve CC has flow rate=2; tunnels lead to valves DD, BB
// Valve DD has flow rate=20; tunnels lead to valves CC, AA, EE
// Valve EE has flow rate=3; tunnels lead to valves FF, DD
// Valve FF has flow rate=0; tunnels lead to valves EE, GG
// Valve GG has flow rate=0; tunnels lead to valves FF, HH
// Valve HH has flow rate=22; tunnel leads to valve GG
// Valve II has flow rate=0; tunnels lead to valves AA, JJ
// Valve JJ has flow rate=21; tunnel leads to valve II
// All of the valves begin closed. You start at valve AA, but it must be damaged or jammed or something: its flow rate is 0, so there's no point in opening it. However, you could spend one minute moving to valve BB and another minute opening it; doing so would release pressure during the remaining 28 minutes at a flow rate of 13, a total eventual pressure release of 28 * 13 = 364. Then, you could spend your third minute moving to valve CC and your fourth minute opening it, providing an additional 26 minutes of eventual pressure release at a flow rate of 2, or 52 total pressure released by valve CC.

// Making your way through the tunnels like this, you could probably open many or all of the valves by the time 30 minutes have elapsed. However, you need to release as much pressure as possible, so you'll need to be methodical. Instead, consider this approach:

// == Minute 1 ==
// No valves are open.
// You move to valve DD.

// == Minute 2 ==
// No valves are open.
// You open valve DD.

// == Minute 3 ==
// Valve DD is open, releasing 20 pressure.
// You move to valve CC.

// == Minute 4 ==
// Valve DD is open, releasing 20 pressure.
// You move to valve BB.

// == Minute 5 ==
// Valve DD is open, releasing 20 pressure.
// You open valve BB.

// == Minute 6 ==
// Valves BB and DD are open, releasing 33 pressure.
// You move to valve AA.

// == Minute 7 ==
// Valves BB and DD are open, releasing 33 pressure.
// You move to valve II.

// == Minute 8 ==
// Valves BB and DD are open, releasing 33 pressure.
// You move to valve JJ.

// == Minute 9 ==
// Valves BB and DD are open, releasing 33 pressure.
// You open valve JJ.

// == Minute 10 ==
// Valves BB, DD, and JJ are open, releasing 54 pressure.
// You move to valve II.

// == Minute 11 ==
// Valves BB, DD, and JJ are open, releasing 54 pressure.
// You move to valve AA.

// == Minute 12 ==
// Valves BB, DD, and JJ are open, releasing 54 pressure.
// You move to valve DD.

// == Minute 13 ==
// Valves BB, DD, and JJ are open, releasing 54 pressure.
// You move to valve EE.

// == Minute 14 ==
// Valves BB, DD, and JJ are open, releasing 54 pressure.
// You move to valve FF.

// == Minute 15 ==
// Valves BB, DD, and JJ are open, releasing 54 pressure.
// You move to valve GG.

// == Minute 16 ==
// Valves BB, DD, and JJ are open, releasing 54 pressure.
// You move to valve HH.

// == Minute 17 ==
// Valves BB, DD, and JJ are open, releasing 54 pressure.
// You open valve HH.

// == Minute 18 ==
// Valves BB, DD, HH, and JJ are open, releasing 76 pressure.
// You move to valve GG.

// == Minute 19 ==
// Valves BB, DD, HH, and JJ are open, releasing 76 pressure.
// You move to valve FF.

// == Minute 20 ==
// Valves BB, DD, HH, and JJ are open, releasing 76 pressure.
// You move to valve EE.

// == Minute 21 ==
// Valves BB, DD, HH, and JJ are open, releasing 76 pressure.
// You open valve EE.

// == Minute 22 ==
// Valves BB, DD, EE, HH, and JJ are open, releasing 79 pressure.
// You move to valve DD.

// == Minute 23 ==
// Valves BB, DD, EE, HH, and JJ are open, releasing 79 pressure.
// You move to valve CC.

// == Minute 24 ==
// Valves BB, DD, EE, HH, and JJ are open, releasing 79 pressure.
// You open valve CC.

// == Minute 25 ==
// Valves BB, CC, DD, EE, HH, and JJ are open, releasing 81 pressure.

// == Minute 26 ==
// Valves BB, CC, DD, EE, HH, and JJ are open, releasing 81 pressure.

// == Minute 27 ==
// Valves BB, CC, DD, EE, HH, and JJ are open, releasing 81 pressure.

// == Minute 28 ==
// Valves BB, CC, DD, EE, HH, and JJ are open, releasing 81 pressure.

// == Minute 29 ==
// Valves BB, CC, DD, EE, HH, and JJ are open, releasing 81 pressure.

// == Minute 30 ==
// Valves BB, CC, DD, EE, HH, and JJ are open, releasing 81 pressure.
// This approach lets you release the most pressure possible in 30 minutes with this valve layout, 1651.

// Work out the steps to release the most pressure in 30 minutes. What is the most pressure you can release?


//TO DO

// PROCESS INPUT SO THAT VALVES HAVE ADJ LISTS
// CONVERT ALL OF THAT INTO A GRAPH
// IMPLEMENT A DFS ALGO TO COUNT ALL PATHS FOR ALL VALVES
// LOOP THROUGH ALL PATHS ACCOUNTING FOR CONSTRAINTS OF PROBLEM (MINUTES/MOVEMENT)
// RETURN BEST ONE

const input = 
[
    "Valve OK has flow rate=0; tunnels lead to valves RW, FX",
    "Valve JY has flow rate=13; tunnel leads to valve TT",
    "Valve FX has flow rate=16; tunnels lead to valves OK, LF, GO, IV",
    "Valve TD has flow rate=0; tunnels lead to valves XZ, ED",
    "Valve VF has flow rate=9; tunnels lead to valves DS, LU, TR, WO",
    "Valve TT has flow rate=0; tunnels lead to valves XZ, JY",
    "Valve KR has flow rate=8; tunnels lead to valves VL, CI, GO, JJ, TQ",
    "Valve HN has flow rate=0; tunnels lead to valves YG, AA",
    "Valve MC has flow rate=24; tunnels lead to valves MI, EE, TH, YG",
    "Valve XM has flow rate=0; tunnels lead to valves AF, JL",
    "Valve XE has flow rate=0; tunnels lead to valves XP, AF",
    "Valve ZF has flow rate=0; tunnels lead to valves EM, EI",
    "Valve DS has flow rate=0; tunnels lead to valves VF, LF",
    "Valve AF has flow rate=7; tunnels lead to valves AW, XE, CI, BJ, XM",
    "Valve NL has flow rate=0; tunnels lead to valves KF, EM",
    "Valve LF has flow rate=0; tunnels lead to valves FX, DS",
    "Valve XZ has flow rate=25; tunnels lead to valves TD, TT",
    "Valve TQ has flow rate=0; tunnels lead to valves AA, KR",
    "Valve WO has flow rate=0; tunnels lead to valves VF, NE",
    "Valve TH has flow rate=0; tunnels lead to valves LU, MC",
    "Valve AA has flow rate=0; tunnels lead to valves TQ, KF, HN, XP, TY",
    "Valve KB has flow rate=0; tunnels lead to valves WP, XL",
    "Valve IV has flow rate=0; tunnels lead to valves PK, FX",
    "Valve MI has flow rate=0; tunnels lead to valves JF, MC",
    "Valve EX has flow rate=22; tunnels lead to valves JL, ZZ, SL",
    "Valve ZZ has flow rate=0; tunnels lead to valves EX, JS",
    "Valve KF has flow rate=0; tunnels lead to valves NL, AA",
    "Valve PK has flow rate=11; tunnels lead to valves IV, HP",
    "Valve TR has flow rate=0; tunnels lead to valves DI, VF",
    "Valve YG has flow rate=0; tunnels lead to valves HN, MC",
    "Valve JL has flow rate=0; tunnels lead to valves EX, XM",
    "Valve VL has flow rate=0; tunnels lead to valves JS, KR",
    "Valve XP has flow rate=0; tunnels lead to valves AA, XE",
    "Valve TY has flow rate=0; tunnels lead to valves JS, AA",
    "Valve EM has flow rate=4; tunnels lead to valves JJ, NL, ZF, WP, AW",
    "Valve BJ has flow rate=0; tunnels lead to valves WK, AF",
    "Valve JJ has flow rate=0; tunnels lead to valves EM, KR",
    "Valve RW has flow rate=14; tunnels lead to valves NE, OK",
    "Valve EI has flow rate=0; tunnels lead to valves ZF, JS",
    "Valve SL has flow rate=0; tunnels lead to valves HP, EX",
    "Valve EE has flow rate=0; tunnels lead to valves MC, XL",
    "Valve WK has flow rate=0; tunnels lead to valves BJ, JS",
    "Valve AW has flow rate=0; tunnels lead to valves EM, AF",
    "Valve XL has flow rate=21; tunnels lead to valves EE, KB",
    "Valve JF has flow rate=0; tunnels lead to valves MI, ED",
    "Valve LU has flow rate=0; tunnels lead to valves TH, VF",
    "Valve CI has flow rate=0; tunnels lead to valves AF, KR",
    "Valve ED has flow rate=23; tunnels lead to valves JF, TD",
    "Valve JS has flow rate=3; tunnels lead to valves VL, ZZ, EI, TY, WK",
    "Valve NE has flow rate=0; tunnels lead to valves RW, WO",
    "Valve DI has flow rate=12; tunnel leads to valve TR",
    "Valve WP has flow rate=0; tunnels lead to valves KB, EM",
    "Valve GO has flow rate=0; tunnels lead to valves FX, KR",
    "Valve HP has flow rate=0; tunnels lead to valves SL, PK"
];

class Graph
{
    constructor(numVertices)
    {
        this.numVertices = numVertices;
        this.adjacencies = new Map();
    }

    addVertex(vertex)
    {
        this.adjacencies.set(vertex, []);
    }

    addEdge(vertexSrc, vertexDest)
    {
        this.adjacencies.get(vertexSrc).push(vertexDest);
    }

    print()
    {
        let keys = this.adjacencies.keys();

        for(var i of keys)
        {
            let values = this.adjacencies.get(i);
            let printStr = "";
            for(var j of values)
            {
                printStr += j + " ";
            }

            console.log(i + " -> " + printStr);
        }
    }
}

let valves = parseInput();
valves.print();



function parseInput()
{
    let graph = new Graph(input.length);
    for(var i = 0 ; i < input.length; i++)
    {
        let split = input[i].split(" ");
        let valveName = split[1];
        let flow = split[4].substring(split[4].indexOf("=") + 1, split[4].length - 1);
        let adjValves = [];
        for(var j = 9; j < split.length; j++)
        {
            adjValves.push(split[j]);
        }
        graph.addVertex(valveName);
        for(var j = 0; j < adjValves.length; j++)
        {
            graph.addEdge(valveName, adjValves[j]);
        }
    }
    
    return graph;
}