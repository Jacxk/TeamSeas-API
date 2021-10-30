# TeamSeas-API

[![NPM](https://nodei.co/npm/teamseas-api.png)](https://www.npmjs.com/package/teamseas-api)

TeamTrees-API is the un-official API for [TeamSeas.org](https://teamseas.org/)\
With this package you can get information such as the amount of money donated, recent donations
and see who's #1.

If you haven't donated yet, please do, and share the website. We gotta hit the 30M by 2022.

## Usage
You can find the file test [here](https://github.com/Jacxk/TeamSeas-API/blob/master/test.js).\
This package comes with a rate limiter and a cache system so you dont break the website by making 1,000 requests.
You can disable it but I don't recommend it.

### Options:
```js
// they are all optional
{
  rateLimit: false // enable rate limiter
  cache: {
    enable: true, // enable the cache syste,
    duration: 5 // time to hold the data in minutes
  }
}
```

### Initialize:
```js
const {TeamSeas} = require('teamseas-api');
const eamSeas = new TeamSeas(/* options */);
```

### Methods:
```js
// Get all total donation amount
teamSeas.getTotalPounds(true).then(console.log); // 4,264,612
teamSeas.getTotalPounds(false).then(console.log); // 4264612

// Get the most recent donations
teamSeas.getMostRecent().then(console.log);

/* OutPut
[
  ...
  {
    ff: 0,
    name: 'Aleena The Awesome',
    team_name: "The Garcia's",
    message_public: 'We hope we can save the sea lions',
    flair: 'feed-icon-1.png',
    pounds: '1',
    pounds_color: 'FFB72B',
    created_at: 1635618670
  }
  ...
]
*/

// Get the top donations (That's how they named it... don't look at me)
teamSeas.getMostTrash().then(console.log);

/* OutPut
[
  ...
  {
    ff: 0,
    name: 'YouTube Originals',
    team_name: '',
    message_public: 'YouTube is so proud to be a part of this incredible project. And encourage everyone to join TeamSeas in this effort!',
    flair: 'feed-icon-6.png',
    pounds: '400,000',
    pounds_color: 'FFB72B',
    created_at: 1635559912
  },
  ...
]
*/

// Get the most donations by team
teamSeas.getTeamsMostDonations().then(console.log);
/* OutPut
[
  ...
  {
    team: 'MrBeast',
    total_donation: '555,821',
    total_members: '174',
    sort_donation: '555821'
  },
  ...
]

// I suck at naming btw
// Get the days left and trees left
teamSeas.getLeft().then(console.log)

/* OutPut
{
  "daysLeft": 60,
  "treesLeft": {
    "amount": {
      "fixed": '8,602,253',
      "value": 8602253
    },
    "percent": '56.99'
  }
*/
```