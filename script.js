let ans = "";

let n = 52;

while (n > 0) {
    let rem = (n - 1) % 26;
    ans = String.fromCharCode(rem + 65) + ans;
    n = Math.floor((n - 1) / 26);
}

console.log(ans);
