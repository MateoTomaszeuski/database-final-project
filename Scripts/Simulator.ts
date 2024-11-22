import { RandomGen } from "./RandomGen";
import { featurePacks } from "./_featurePacks";
import { subscriptions } from "./_subscriptions";

export class Simulator {
  currentDate: Date;
  accounts: Array<Account>;
  developers: Array<Developer>;
  games: Array<Game>;
  gamePlays: Array<GamePlay>;
  subscriptionPayments: Array<SubPayment>;
  featurePayments: Array<FeaturePayment>;
  loginHistory: Array<LoginHistory>; // TYPE NEEDS TO BE ADJUSTED

  constructor(startDate: Date) {
    this.currentDate = startDate;
    this.developers = RandomGen.randDeveloperArray(20);
    this.games = RandomGen.randGames(this.developers, featurePacks);
    this.accounts = [];
    this.gamePlays = [];
    this.subscriptionPayments = [];
    this.featurePayments = [];
    this.loginHistory = [];
  }

  public runDate(expectedNumber: number): void {
    if (this.gamePlays.length > expectedNumber) {
      return;
    }

    this.generateNewPlayers();
    this.tickAllPlayers();

    this.currentDate.setDate(this.currentDate.getDate() + 1);
  }

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

  private tickAllPlayers() {
    // Tick each player
    for (let i = 0; i < this.accounts.length; i++) {
      // Make payments if necessary (Or decide to unsubscribe)
      if (this.accounts[i].susbscriptionDate !== undefined) {
        this.makePaymentsOrUnsubscribe(i);
      } else {
        // Subscription date is undefined; don't play games
        continue;
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

  private featurePaymentsOrUnsubscribe(accountIndex: number) {
    // Make any feature payments
    for (let i = 0; i < this.accounts[accountIndex].featuresPurchased.length; i++) {
      let pack: FeaturePack = this.accounts[accountIndex].featuresPurchased[i].pack;
      let firstPurchase: FeaturePayment = this.accounts[accountIndex].featuresPurchased[i].firstPurchase;
      const subscriptionDate = firstPurchase.paymentDate!;
      let nextPaymentDate = new Date(subscriptionDate);

      if (firstPurchase.yearly) {
        do {
          nextPaymentDate.setFullYear(
            nextPaymentDate.getFullYear() + 1,
            nextPaymentDate.getMonth(),
            nextPaymentDate.getDate()
          );
        } while (nextPaymentDate < this.currentDate);
      } else {
        do {
          nextPaymentDate.setMonth(nextPaymentDate.getMonth() + 1);
        } while (nextPaymentDate < this.currentDate);
      }

      // Check if the resulting day matches or exceeds the subscription date
      if (nextPaymentDate.getDate() < subscriptionDate.getDate()) {
        // Adjust for the last day of the month
        nextPaymentDate.setDate(0);
      }
      
      while (nextPaymentDate.getDate() > subscriptionDate.getDate()) {
        nextPaymentDate.setDate(nextPaymentDate.getDate() - 1);
      }
      
      if (this.datesAreEqual(nextPaymentDate, this.currentDate)) {
        let cost = 0;

        if (firstPurchase.yearly) {
          if (firstPurchase.autoRenew) {
            cost = pack.costAutoYear;
          } else {
            cost = pack.costNonAutoYear;
          }
        } else {
          if (firstPurchase.autoRenew) {
            cost = pack.costAutoMonth;
          } else {
            cost = pack.costNonAutoMonth;
          }
        }

        let newPayment: FeaturePayment = {
          accountId: accountIndex,
          featureId: pack.id,
          paymentDate: new Date(this.currentDate),
          yearly: firstPurchase.yearly,
          paymentAmount: cost,
          autoRenew: firstPurchase.autoRenew,
          endDate: firstPurchase.endDate
        };
        this.featurePayments.push(newPayment);
      }
    }

    // Decide on a new feature
    if (this.accounts[accountIndex].featuresPurchased.length < featurePacks.length && 0.05 > Math.random()) {
      let boughtPacks = this.accounts[accountIndex].featuresPurchased.map((value) => value.pack);
      let availablePacks = featurePacks.filter((value) => !boughtPacks.includes(value));

      let newPack = availablePacks[RandomGen.randNumberBetween(0, availablePacks.length - 1)];
      let yearly = 0.5 < Math.random() ? true : false;
      let autoRenew = 0.5 < Math.random() ? true : false;
      let endDate: Date = new Date(this.currentDate);
      let cost = 0;

      if (yearly) {
        endDate.setFullYear(
            this.currentDate.getFullYear() + 1,
            this.currentDate.getMonth(),
            this.currentDate.getDate()
        );
        if (autoRenew) {
          cost = newPack.costAutoYear;
        } else {
          cost = newPack.costNonAutoYear;
        }
      } else {
        endDate.setFullYear(
            this.currentDate.getFullYear(),
            this.currentDate.getMonth() + 1,
            this.currentDate.getDate()
        );
        if (autoRenew) {
          cost = newPack.costAutoMonth;
        } else {
          cost = newPack.costNonAutoMonth;
        }
      }

      let newPayment: FeaturePayment = {
        accountId: accountIndex,
        featureId: newPack.id,
        paymentDate: new Date(this.currentDate),
        yearly: yearly,
        paymentAmount: cost,
        autoRenew: autoRenew,
        endDate: endDate
      };
      this.featurePayments.push(newPayment);

      this.accounts[accountIndex].featuresPurchased.push({ pack: newPack, firstPurchase: newPayment });
    }
  }

  private makePaymentsOrUnsubscribe(accountIndex: number) {
    if (this.datesAreEqual(this.accounts[accountIndex].endDate!, this.currentDate)) {
      // If today is the end date, randomly decide to unsubscribe.
      if (0.05 > Math.random()) {
        this.accounts[accountIndex].subscriptionId = undefined;
        this.accounts[accountIndex].actualCost = undefined;
        this.accounts[accountIndex].endDate = undefined;
        this.accounts[accountIndex].susbscriptionDate = undefined;
        this.accounts[accountIndex].yearlyPayment = undefined;
        return;
      }
    }
    const subscriptionDate = this.accounts[accountIndex].susbscriptionDate!;
    let nextPaymentDate = new Date(subscriptionDate);

      if (this.accounts[accountIndex].yearlyPayment) {
        do {
          nextPaymentDate.setFullYear(
            nextPaymentDate.getFullYear() + 1,
            nextPaymentDate.getMonth(),
            nextPaymentDate.getDate()
          );
        } while (nextPaymentDate < this.currentDate);
      } else {
        do {
          nextPaymentDate.setMonth(nextPaymentDate.getMonth() + 1);
        } while (nextPaymentDate < this.currentDate);
      }

    // Check if the resulting day matches or exceeds the subscription date
    if (nextPaymentDate.getDate() < subscriptionDate.getDate()) {
      // Adjust for the last day of the month
      nextPaymentDate.setDate(0);
    }

    while (nextPaymentDate.getDate() > subscriptionDate.getDate()) {
      // Adjust for the last day of the month
      nextPaymentDate.setDate(nextPaymentDate.getDate() - 1);
    }

    if (this.datesAreEqual(nextPaymentDate, this.currentDate)) {
      this.subscriptionPayments.push({
        accountId: this.accounts[accountIndex].id,
        paymentAmount: this.accounts[accountIndex].actualCost!,
        paymentDate: new Date(this.currentDate),
        subscriptionId: this.accounts[accountIndex].subscriptionId!,
      });
    }
  }

  private datesAreEqual(date1: Date, date2: Date): boolean {
    return date1.getMonth() === date2.getMonth() && date1.getDate() === date2.getDate() && date1.getFullYear() === date2.getFullYear();
  }
}
