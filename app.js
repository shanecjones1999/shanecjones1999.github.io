let seen = false;

onClick = () => {
    const num = 1 + Math.floor(Math.random() * 100);
    console.log(num);
    document.getElementById("random").textContent = num;
    if (num >= 80 && !seen) {
        seen = true;
        const tmp = document.createElement("p");
        tmp.textContent = "You got over 80!";
        const elem = document.getElementById("tmp");
        elem.appendChild(tmp);
    }
}