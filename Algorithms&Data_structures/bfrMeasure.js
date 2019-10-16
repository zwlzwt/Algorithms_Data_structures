import readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})
rl.setPrompt("What is your name:");
rl.prompt();
rl.on("line", function (line){
  rl.question("How much is your waistline: ", function (answer1){
    Number.parseFloat(answer1.trim())
    
    rl.question("How much is your weight: ", function (answer2) {
      Number.parseFloat(answer1.trim())
      console.log(`${line} Bfr is: `, toPercent(bfr(answer1, answer2)));
       rl.close();
    })
  })
})
rl.on('close', function(){
  console.log("Get stonger, Keep journey!")
  // process.exit()
})

function bfr(waistline, weight) { // waistline 单位cm weight 单位kg
  

  const weightLbs = weight*2.2;
  const waistlineInch = waistline/2.54;

  const bfrValue = (weightLbs - ((weightLbs*1.082 + 94.42) - waistlineInch*4.15))/weightLbs
  return bfrValue;
}

function toPercent(point){
  let str=Number.parseFloat(point*100).toFixed(2);
  str+="%";
  return str;
}

