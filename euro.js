export {convert}

function simple(txt) {
    let mid = txt.replace(/ph/g, "f")
        .replace(/th/g, "z")
        .replace(/ou/g, "o")
        .replace(/ea/g, "e")
        .replace(/w/g, "v");
    if (mid.endsWith("ed")) {
        let o = mid.slice(0, mid.length - 2)
        return (o + "d");
    };
    return mid;
};

function shorten(txt) {
    if (txt.length < 3) {
        return txt;
    };
    if (txt.endsWith("e")) {
        return txt.slice(0, txt.length - 1);
    }
    return txt;
}

// remove double

const takeWhile =
    (fn, a) => a.length && fn(a[0]) ? [a[0], ...takeWhile(fn, a.slice(1))] : [];

function rmdouble(x) {
    if (x.length < 2)
        return x;
    let mid = takeWhile((y) => { return y == x[0] }, x);
    let rest = x.slice(mid.length, x.length);
    return (mid[0] + rmdouble(rest));
}

// remove c

function ctosk(txt) {
    if (txt.length < 2)
        return txt;
    var x = txt;
    for (var i = 0; i < txt.length - 1; i++) {
        if (x[i] == "c") {
            if ("eiy".includes(x[i + 1])) {
                x = x.substr(0, i - 1) + "s" + x.substr(i + 1, txt.length - 1);
            } else {
                x = x.substr(0, i - 1) + "k" + x.substr(i + 1, txt.length - 1);
            }
        }
    }
    return x;
}

export function euro(txt) {
    return rmdouble(
        shorten(
            ctosk(
                simple(
                    txt
                )
            )
        )
    )
}

function convert() {
    var text = document.getElementById("input-area").value.replace(/\n/g, '<br/>');
    document.getElementById("output").innerHTML = text;
}
