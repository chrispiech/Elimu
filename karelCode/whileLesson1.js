//This program will make 
//karel pick up a pile of
//beepers no matter how big
//the pile is
move();
while(beepersPresent()) {
pickBeeper();
}
move();