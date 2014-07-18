/**
 * It count how many times a word appears in a text document.
 *
 * This code is just an excuse to play with a kind of map/reduce approach.
 */
package main

import (
    "os"
    "fmt"
    "bufio"
    "strings"
)

type LabeledList struct {
    label string
    values []int
}



func mapper (q chan LabeledList, scanner *bufio.Scanner) {
    for scanner.Scan() {
        line := scanner.Text();
        words := strings.Split(line, " ");
        for _,word := range words {
            word = strings.TrimSpace(word);
            if len(word) > 0 {
                q <- LabeledList {word , []int {1} }
            }
        }
    }
    close(q)
}


func consumer(q chan LabeledList) {

    for {
        elem,ok := <-q;
        if ok {
            fmt.Println(elem.label);
        } else {
            return;
        }
    }
}

func main() {

    q := make(chan LabeledList);
    file, _ := os.Open("golang-examples/word-count.go");
    scanner := bufio.NewScanner(file);
    go mapper(q, scanner);
    consumer(q);

}
