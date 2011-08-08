function main() {
while(leftIsClear()) {
colorRow();
}
colorRow();
}

function colorRow() {
while(frontIsClear()) {
colorSquare();
}
colorSquare();
}

function colorSquare(){
paintCorner('blue');
if(random(0.3)){
paintCorner('green');
}
}

main();