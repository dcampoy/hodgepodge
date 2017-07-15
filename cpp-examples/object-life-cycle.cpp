#include <string>
#include <iostream>
#include <unistd.h>

/*
g++ -std=c++11 object-life-cycle.cpp  && ./a.out
*/
class Ticket {
    public:
        Ticket(int number) {
            this->number = number;
            this->stone[20] = 1;
        }
        std::string getNumber() {
            return std::to_string(number);
        }
    
    private:
        int number;
        int stone[1024*1024];
};

class DispenserV1 {
    public:
        Ticket get() {
            Ticket ticket{current++};
            return ticket;
        }
    
    private:
        int current = 1;
};

class DispenserV2 {
    public:
        Ticket* get() {
            Ticket* ticket = new Ticket(current++);
            return ticket;
        }
    
    private:
        int current = 1;
};



int main(int argc, char *argv[]) {

    
    DispenserV1 dispenser;
    std::cout << "My PID: " << getpid() << std::endl;
    for (int i=0; i<20; i++) {
        std::cout << dispenser.get().getNumber() << std::endl;
        sleep(1);
    }
   

    /*
    DispenserV2 dispenser;
    std::cout << "My PID: " << getpid() << std::endl;
    for (int i=0; i<20; i++) {
        std::cout << dispenser.get()->getNumber() << std::endl;
        sleep(1);
    }
    */

    /*
    DispenserV2 dispenser;
    Ticket* t;
    std::cout << "My PID: " << getpid() << std::endl;
    for (int i=0; i<20; i++) {
        t = dispenser.get();
        std::cout << t->getNumber() << std::endl;
        delete t;
        sleep(1);
    }
    */
    
}
