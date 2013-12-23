package main

import (
    "fmt"
    "strings"
    "bytes"
)

type Spellbook struct {
    spells [256][256]byte
    opposite [256][]byte
}

func chainHasAny(needles []byte, chain []byte) bool {
    for _,needle := range needles {
        for _,elem := range chain {
            if elem == needle {
                return true;
            }
        }
    }
    return false;
}

func invoke (book *Spellbook, chain []byte, elem byte) []byte {

    var last byte;

    if len(chain) > 0 {
        last = chain[len(chain)-1];
    } else {
        last = 0;
    }

    newElem := book.spells[last][elem];

    if newElem != 0 {
        //chain = append(chain[:len(chain)-1], newElem);
        chain = invoke(book, chain[:len(chain)-1], newElem);
    } else if chainHasAny(book.opposite[elem], chain) {
            chain = nil;
    } else {
            chain = append(chain, elem);
    }

    return chain;
}

func format (in []byte) string {
    var buffer bytes.Buffer;

    for _,b := range in {
        if buffer.Len() != 0 {
            buffer.Write([]byte(", "));
        }
        buffer.WriteByte(b);
    }
    return buffer.String();
}

func main() {
    var T,C,O,E int;

    fmt.Scanf("%d", &T);

    for t:=1; t<=T; t++ {
        book := Spellbook{};

        fmt.Print("Case #", t, ":");
        fmt.Scanf("%d",&C);
        for c:=0; c<C; c++ {
            var e1, e2, r byte;
            var tmp string;
            fmt.Scanf("%s", &tmp);
            fmt.Sscanf(tmp, "%c%c%c",&e1, &e2, &r);

            book.spells[e1][e2] = r;
            book.spells[e2][e1] = r;
        }

        fmt.Scanf("%d",&O)
        for o:=0; o<O; o++ {
            var o1, o2 byte;
            var tmp string;
            fmt.Scanf("%s", &tmp);
            fmt.Sscanf(tmp, "%c%c", &o1, &o2);
            book.opposite[o1] = append(book.opposite[o1], o2);
            book.opposite[o2] = append(book.opposite[o2], o1);
        }

        fmt.Scanf("%d", &E);

        var chain []byte;

        var tmp string;
        fmt.Scanf("%s", &tmp);
        r := strings.NewReader(tmp);
        for e:=0; e<E; e++ {
            b,err := r.ReadByte();
            if err != nil {
                panic(err);
            }
            chain = invoke(&book, chain, b);
        }

        fmt.Print(" [", format(chain), "]");
        fmt.Println();
    }
}
