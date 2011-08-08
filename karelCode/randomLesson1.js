function main() {
while(noBeepersPresent()) {
if(random()) {
turnLeft();
} else {
safeMove();
}
}
}

function safeMove() {
if(frontIsClear()){
move();
}
}

main();