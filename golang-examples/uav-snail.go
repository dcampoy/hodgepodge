/**
 * Source: http://uva.onlinejudge.org/external/5/573.html
 *
 * A snail is at the bottom of a 6-foot well and wants to climb to the top. The snail can climb 3 feet while the sun
 * is up, but slides down 1 foot at night while sleeping. The snail has a fatigue factor of 10%, which means that on
 * each successive day the snail climbs 10% * 3 = 0.3 feet less than it did the previous day. (The distance
 * lost to fatigue is always 10% of the first day's climbing distance.) On what day does the snail leave the well,
 * i.e., what is the first day during which the snail's height exceeds 6 feet? (A day consists of a period of sunlight
 * followed by a period of darkness.) As you can see from the following table, the snail leaves the well during the
 * third day.
 *
 * Day Initial Height  Distance Climbed    Height After Climbing   Height After Sliding
 *   1             0'                3'                       3'                     2'
 *   2             2'              2.7'                     4.7'                   3.7'
 *   3           3.7'              2.4'                     6.1'                      -
 *
 * Your job is to solve this problem in general. Depending on the parameters of the problem, the snail will eventually
 * either leave the well or slide back to the bottom of the well. (In other words, the snail's height will exceed the
 * height of the well or become negative.) You must find out which happens first and on what day.
 * 
 * Input 
 * 
 * The input file contains one or more test cases, each on a line by itself. Each line contains four integers:
 * H, U, D, and F, separated by a single space. If H = 0 it signals the end of the input; otherwise, all four numbers
 * will be between 1 and 100, inclusive. H is the height of the well in feet, U is the distance in feet that the snail
 * can climb during the day, D is the distance in feet that the snail slides down during the night, and F is the
 * fatigue factor expressed as a percentage. The snail never climbs a negative distance. If the fatigue factor drop 
 * the snail's climbing distance below zero, the snail does not climb at all that day. Regardless of how far the snail
 * climbed, it always slides D feet at night.
 * Output 
 * 
 * 
 * For each test case, output a line indicating whether the snail succeeded (left the well) or failed (slid back to the
 * bottom) and on what day. Format the output exactly as shown in the example.
 * 
 * Sample Input 
 *  6 3 1 10
 *  10 2 1 50
 *  50 5 3 14 
 *  50 6 4 1
 *  50 6 3 1
 *  1 1 1 1
 *  0 0 0 0
 *
 * Sample Output 
 *  success on day 3
 *  failure on day 4
 *  failure on day 7
 *  failure on day 68
 *  success on day 20
 *  failure on day 2
 * 
 * Solution:
 *
 * Assuming:
 *    t: current day (t for time)
 *    x: heigh after climbing. Thus, x - D heigh after sliding.
 *
 * Let's also forget about what happens when fatigue factor drop below zero for now. Then:
 *
 *      x(t) = last day climbing + today climbing
 *      x(t) = x(t-1) - D        + U - (t-1)UF/100
 *
 * As a recurrency:
 *
 *      x(1) = U
 *      x(2) = U - D + U - UF/100 = 2U - D - UF/100
 *      x(3) = 2U - D - UF/100 - D + U - 2UF/100 = 3U - 2D - 3UF/100
 *      x(4) = 3U - 2D - 3UF/100 - D + U - 3UF/100 = 4U - 3D - 6UF/100
 *      x(5) = 4U - 3D - 6UF/100 - D + U - 4UF/100 = 5U - 4D - 10UF/100
 *      ...
 *      x(t) = tU - (t-1)D - t*(t-1)/2 * UF/100
 *
 * First at all, the author mention that when fatigue factor drop below zero, the snail won't climb at all. Is this
 * scenario possible before reach the bottom of hole?
 *
 * Fatigue factor is: tUF/100, so it will occurs when:
 *    tUF/100 > U; tF/100 > 1; t > floor(100/F)
 *
 * Validate for fourth example U:6 D:4 F:1
 *
 *      x(67) = 5.34
 *      x(68) = 3.32
 *      x(69) = 1.24
 *      x(70) = -0.9 <- Fail al 70. It should be at 68 :-/
 */

package main

import (
    "fmt"
)

func main() {

    var H int;
    var U int;
    var D int;
    var F int;

    for true {
        fmt.Scanf("%d %d %d %d", &H, &U, &D, &F);
        fmt.Println(H, U, D, F);
        if H == 0 {
            break;
        }

        var last float64;
        var i int;

        last = float64(0);
        for i=1; i<=100; i=i+1 {
            climbed := float64(U) - float64(i-1)*float64(U)*float64(F)/100.0;
            if (climbed < 0) {
                climbed = 0;
            }

            heightAfterClimb := climbed + last;

            last = heightAfterClimb - float64(D);

            oneStep := float64(i) * float64(U) - float64(i-1)*float64(D) - float64(i*(i-1))*float64(U) * float64(F) /200.0;
fmt.Println(" day:",i,"acum:", heightAfterClimb, "onestep:", oneStep);
            if (oneStep > float64(H)) {
                fmt.Println("success on day ", i);
                break;
            } else if oneStep - float64(D) < float64(0) {
                fmt.Println("failure on day ", i);
                break;
            }
        }
    }
}
