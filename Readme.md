# Online Gaming Service - Database Final

## Re-runnable creation script
- The DLL to re create the schema, with its tables, views, sequences, procedures and functions can be found in *Creation/DLL/gamestore.sql* 
- All the data that is currently in the database, can be imported with the sql statemets found in *Creation/DML* each different table has a file in it.

## Documentiation for data generation process

The repo for the entire website can be found here: [Link to GitHub Repo](https://github.com/Cody-Howell-Snow/data-sim-olg).
The website link with the production build is here: [Website Link](https://codydhowell.com/sims/olg/).
You can also view the 3 important pages here in /scripts.

### Script Initialization

When loading into the webpage, React makes a new instance of the simulator.
  - We initialized with a random list of 1000 first and last names, 200 game names from a Kaggle database, our 3 subscription tiers, and 4 feature pack names.
  - Developers are generated with the preset list of names.
```
private static randDeveloper(id: number): Developer {
  let name = this.randName();
  let contactEmail = name.replace(/ /g, "_") + "@example.com";
  return {
    id: id,
    developerName: name,
    contactEmail: contactEmail,
    revenueSharePercentage: this.normalDistribution(0.11) / 100,
  };
}
```
  - Game names are randomly selected to be within 0-4 of the preset feature packs and assigned a random developer.
```
public static randGames(
  devs: Array<Developer>,
  features: Array<FeaturePack>
): Array<Game> {
  let outGames: Array<Game> = [];
  for (let i = 0; i < games.length; i++) {
    let featureArray: Array<number> = [];
    for (let j = 0; j < features.length; j++) {
      if (0.7 < Math.random()) {
        featureArray.push(features[j].id);
      }
    }
    outGames.push({
      id: i,
      gameName: games[this.randNumberBetween(0, games.length)],
      developerId: devs[this.randNumberBetween(0, devs.length)].id,
      featureIds: featureArray,
    });
  }
  return outGames;
}
```

### Day Ticks

```
public runDate(expectedNumber: number): void {
  if (this.gamePlays.length > expectedNumber) {
    return;
  }

  this.generateNewPlayers();
  this.tickAllPlayers();

  this.currentDate.setDate(this.currentDate.getDate() + 1);
}
```

From there, we are now able to run a day on the sim. It starts on the 19th of November of this year, and increments to the next day automatically (assuming you aren't capping it). For each day, it performs the following steps: 
  - Generates new players
    - Generates 1-5 new players (a pseudo-normal distribution around 3) with a random name
    - Assigns them a subscription and their payment length
    - Adds those subscriptions to the new total
```
private generateNewPlayers() {
  // Generate 0 to 5 new players, pay a subscription for each
  let newPlayers = RandomGen.normalDistribution(0.03);
  for (let i = 0; i < newPlayers; i++) {
  // if (this.accounts.length < 1) { // Used to check 1 account
    let newAccount: Account = RandomGen.randAccount(this.currentDate, this.accounts.length);
    this.accounts.push(newAccount);

    let failedAttempts = RandomGen.normalDistribution(0.01) * (Math.random() < 0.8 ? 0 : 1); // Randomly quiets it to 0.
    for (let j = 0; j < failedAttempts; j++) {
      let newLoginTime = new Date(this.currentDate);
      newLoginTime.setHours(8);
      newLoginTime.setMinutes(10 + i);
      newLoginTime.setSeconds(0);

      this.loginHistory.push({
        accountId: newAccount.id, 
        loginTime: newLoginTime, 
        loginSuccess: false
      });
    }

    let finalLoginTime = new Date(this.currentDate);
    finalLoginTime.setHours(RandomGen.randNumberBetween(9, 12));
    finalLoginTime.setMinutes(RandomGen.randNumberBetween(0, 60));
    finalLoginTime.setSeconds(RandomGen.randNumberBetween(0, 60));

    this.loginHistory.push({
      accountId: newAccount.id,
      loginTime: finalLoginTime,
      loginSuccess: true,
    });

    let currentSubscription = subscriptions[newAccount.subscriptionId!];
    let currentCost = newAccount.yearlyPayment ? currentSubscription.costYear : currentSubscription.costMonth;

    this.subscriptionPayments.push({
      accountId: newAccount.id,
      paymentAmount: currentCost,
      paymentDate: new Date(this.currentDate),
      subscriptionId: newAccount.subscriptionId!,
    });
  }
}
```
  - Ticks all players
    - Checks if a subscription needs to be paid, and if so, pays it, considering to unsubscribe them as well
    - Checks if any feature packs need to be paid, pays them, and randomly decides to pay for new packs
    - Gets all possible games they can playy, decides how many games to play for that day, randomly gets 2x the number of random date-times and sorts them, the adds them to Games Played in that order.
    - Repeat for all players
```
private tickAllPlayers() {
  // Tick each player
  for (let i = 0; i < this.accounts.length; i++) {
    // Make payments if necessary (Or decide to unsubscribe)
    if (this.accounts[i].susbscriptionDate !== undefined) {
      this.makePaymentsOrUnsubscribe(i);
    } else {
      // Subscription date is undefined; don't play games
      continue; // Continues to next player
    }

    this.featurePaymentsOrUnsubscribe(i);

    // Assign number of games to play (inherent in person)
    let featureIds = this.accounts[i].featuresPurchased.map((value) => value.pack.id);
    let gameCount = RandomGen.normalDistribution(this.accounts[i].expectedGames / 100);
    let playedGames = RandomGen.randGamesWithReplacement(gameCount, this.games, featureIds);
    let gameTimes = RandomGen.randSortedArrayOfDates(this.currentDate, gameCount * 2);

    for (let j = 0; j < gameTimes.length; j += 2) {
      this.gamePlays.push({
        game_id: playedGames[j / 2],
        account_id: this.accounts[i].id,
        start_play_time: gameTimes[j],
        end_play_time: gameTimes[j + 1],
      });
    }
  }
}
```

- The csv file that contains all the data for game_usage can be found in ~Data/data.csv~
- After importing it, we used two queries to pass the data from the csv file to our table. 
  - The reason we used two different queries, was because there were some parsing problems with dates, so we were able to do the first half with one query and the other half with the other.
  - The Queries used can be found in *Data/insert_game_usage.sql* 

## Proofs
- The different sql queries for proofs can be found in /Proofs/Proof.sql
### Key application features
- Users have one active subscription type, but multiple feature packs
- A history of all prior subscriptions for a user needs to be easily produced
- Every time a user logs on to our service, 
    - we validate their account, 
    - validate concurrent login limits
    - log the attempt (success or failure)
- Every time the user plays a game we track it
- We can produce reports on which games get the most usage
- Revenue Sharing:  We need to share a % of all our revenue with the game developers
    - BaseSubscription Revenue Sharing
        - Calculate this based the formula
        ( DevelopersGamesPlayed/AllGamesPlayed ) * (10% of all BaseSubscription Revenue) => portion for that Developer
    - FeaturePack Revenue Sharing
        - Calculate this based the formula
        ( DevelopersGamesInThisFeaturePackNumberOfGamesPlayed/AllGamesPlayedInThisFeaturePack ) * (10% of all This FeaturePack Subscription Revenue) => portion for that Developer
        - Do that for each feature pack
    - provide a nice report that shows the calculations for each developer
- Renewals
    - Your data system has a way of enforcing renewals
    - Your system has a way of handling special renewal situations
        - example:  Purchase 11/30, renewed to 12/30, renewed to 1/30, but what happens in February?  What about March?
        - Hint: It will still need to end on 3/30
        - Consider 5/31 purchase and how it renews: 6/30, 7/31, 8/31, 9/30 ... etc
