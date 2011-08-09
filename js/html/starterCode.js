var STARTER_CODE = "/**\n\
 * Welcome to the Stanford Karel IDE.\n\
 * This is a free space for you to \n\
 * write any Karel program you want.\n\
 **/\n\
function main() {\n\
   test1();\n\
   test2();\n\
   test3();\n\
}\n\
\n\
//pick beeper not defined?\n\
function test1() {\n\
   putBeeper();\n\
   while(beepersPresent()){\n\
      pickBeeper();\n\
   }\n\
}\n\
\n\
//paintCorner compiler error\n\
function test2() {\n\
   paintCorner('red');\n\
}\n\
\n\
//random not defined\n\
function test3() {\n\
   if(random()){\n\
      move();\n\
   }\n\
}";

var WORLDS = [
   '15x15',
   '9x9',
   '8x8',
   '7x7',
   '5x5',
   '4x4',
   'turnArounds',
   '3x3',
   'pickBeeper',
   'pickBeepers',
   'fiftySoln',
   '7x7MidSoln',
   '5x5MidSoln',
   'column1',
   'column2'
]

var INITIAL_WORLD = '15x15'
