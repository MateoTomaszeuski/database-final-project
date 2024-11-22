# Online Gaming Service - Database Final

## Re-runnable creation script
- The DLL to re create the schema, with its tables, views, sequences, procedures and functions can be found in *Creation/DLL/gamestore.sql* 
- All the data that is currently in the database, can be imported with the sql statemets found in *Creation/DML* each different table has a file in it.

## Documentiation for data generation process

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