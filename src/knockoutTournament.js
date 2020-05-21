function matches(nTeams) {
  const matchArray = [];
  while (nTeams > 1) {
    nTeams = (nTeams + 1) >> 1;
    const matches = [];
    for (var i = 0; i < nTeams; ++i) {
      matches.push([]);
    }
    matchArray.push(matches);
  }
  return matchArray;
} 

const matchArray = [];
function matches(nTeams, structrue=[], level=0) {
  nTeams = Math.floor((nTeams + 1)/2);
  console.log(nTeams)
  if(matchArray.length < level+1) matchArray.push([]);
  for (var i = 0; i < nTeams; ++i) {
    matchArray[level].push([]);
  }
  if(nTeams <= 1) return;
  matches(nTeams, structrue, level+1);
  return matchArray;
}