let f: string[] = ["Apple", "Watermelon", "Blueberry", "Cherry"];
for (let fruit of f) {
    let output = `Fruits: ${f}`;
    document.getElementById("output")!.innerHTML = output;
}