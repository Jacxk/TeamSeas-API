const {TeamSeas} = require('./dist/');
const teamSeas = new TeamSeas();

// Get all total donation amount
teamSeas.getTotalPounds(true).then(console.log);

// Get the most recent donations
teamSeas.getMostRecent().then(console.log);

// Get the top donations
teamSeas.getMostTrash().then(console.log);

// Get the most donations by team
teamSeas.getTeamsMostDonations().then(console.log);

// No idea what it is, but it was on their "API"
teamSeas.getTeamsAlpha().then(console.log);

// Get days left and trees left... Awesome...
teamSeas.getLeft().then(console.log)