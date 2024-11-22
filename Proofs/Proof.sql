-- Proof: User can have only 1 subscription but multiple featurepacks
SELECT
    *
FROM
    account_subscription_details asd
WHERE
    asd.account_id = 1;

SELECT
    *
FROM
    account_feature_packs afp
WHERE
    afp.account_id = 1;

-- Proof: History of prior subscriptions for a user needs to be easily produced
SELECT
    *
FROM
    payment_history ph
WHERE
    ph.user_name = 'Chana Cordova';

-- Proof: Every time a user logs on to our service, 
-- we validate their account, 
-- validate concurrent login limits
-- log the attempt (success or failure)
SELECT
    *
FROM
    login_activity la
WHERE
    la.user_name = 'Raven Ellis';

-- Proof: Every time the user plays a game we track it
SELECT
    *
FROM
    game_usage_stats gus
WHERE
    gus.game_name = 'Stealth Fishing';

-- Proof: We can produce reports on which games get the most usage
SELECT
    game_name,
    SUM(play_duration_minutes) AS total_play_duration_minutes
FROM
    gamestore.game_usage_stats
GROUP BY
    game_name
ORDER BY
    total_play_duration_minutes DESC;

-- Proof: Revenue sharing: provide a nice report that shows the calculations for each developer
SELECT
    *
FROM
    payment_history ph