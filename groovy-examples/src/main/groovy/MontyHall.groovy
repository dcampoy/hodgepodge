/**
 * Suppose you're on a game show, and you're given the choice of three doors: Behind
 * one door is a car; behind the others, goats. You pick a door, say No. 1, and the
 * host, who knows what's behind the doors, opens another door, say No. 3, which has
 * a goat. He then says to you, "Do you want to pick door No. 2?" Is it to your
 * advantage to switch your choice?
 *
 *                              -- https://en.wikipedia.org/wiki/Monty_Hall_problem
 */
class MontyHall {
    final static int REPETITIONS = 100_000;

    static void main(String[] args) {
        Random random = new Random()
        List<String> content = ["car", "goat", "goat"]

        Map stats = [
                switch: [win: 0, total: 0],
                stand : [win: 0, total: 0],
        ]

        for (int i = 0; i < REPETITIONS; i++) {
            Collections.shuffle(content);

            println "\nShow no. ${i + 1}\n-----------"

            int choice = random.nextInt(3)
            println "Contestant choose ${choice + 1}"
            int openDoor = (choice + 1) % 3;

            if (content[openDoor] == "goat") {
                println "Presenter opens ${openDoor + 1}"
            } else {
                openDoor = (choice + 2) % 3;
                println "Presenter opens ${openDoor + 1}"
            }

            String action = random.nextBoolean() ? "switch" : "stand"
            boolean wins = content[choice] == (action == "switch" ? "goat" : "car");
            println "Participant decides to $action and ${wins ? "wins" : "loses"}"
            if (wins) {
                stats[action].win++;
                stats[action].total++;
            } else {
                stats[action].total++;
            }
        }
        println "\nStats:\n-----"
        println stats
    }
}