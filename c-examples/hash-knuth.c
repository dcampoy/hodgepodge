#include <stdio.h>

int main(int argc, char** argv) {

    unsigned int i, h;
    for (i=0; i<10; i++) {
        h = i * 2654435761;
        printf("%d %u\n", i, h);
    }
    return 0;
}
