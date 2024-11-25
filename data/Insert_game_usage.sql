-- The way we are generating data allowed us just to copy from the website and paste into DBeaver, expect for game_usage table that has +1000000


-- Query #1
-- This query inserts valid records into the game_usage table where timestamps are already in the correct format. 
-- It filters out rows with NULL values, invalid 24-hour timestamps, specific account_ids, and game_id = 1. It ensures game_id exists in the game table.

INSERT INTO game_usage (account_id, game_id, start_play_time, end_play_time)
SELECT
    account_id,
    game_id,
    TO_TIMESTAMP(start_play_time, 'MM/DD/YYYY HH24:MI:SS'),
    TO_TIMESTAMP(end_play_time, 'MM/DD/YYYY HH24:MI:SS')
FROM data
WHERE
    account_id IS NOT NULL
    AND game_id IS NOT NULL
    AND start_play_time IS NOT NULL
    AND end_play_time IS NOT NULL
    AND NOT (start_play_time ~ ' 24:[0-5][0-9]:[0-5][0-9]'
             OR end_play_time ~ ' 24:[0-5][0-9]:[0-5][0-9]')
    AND game_id != 1
    AND account_id NOT IN (1067, 1068, 1069, 1070, 1071, 1072, 1073, 1074, 1075, 1076, 1077, 1078, 1079, 1080, 1081, 1082, 1083, 1083, 1084, 1085, 1086, 1087, 1088, 1089, 1090, 1091, 1092, 1093, 1094, 1095, 1096, 1097, 1098, 1099, 1100, 1101, 1102, 1103, 1104, 1105, 1106, 1107, 1108, 1109, 1110, 1111, 1112, 1113, 1114, 1115)
    AND game_id IN (SELECT id FROM game);
 

-- Query 2:
-- This query handles special cases where the start_play_time or end_play_time contains invalid 24-hour formats like 24:00:00.
-- It corrects these by replacing 24 with 00 and adding a day to the timestamp. It excludes additional game_id values (1, 2, 3) compared to Query 1.

INSERT INTO game_usage (account_id, game_id, start_play_time, end_play_time)
SELECT
    account_id,
    game_id,
    CASE
        WHEN start_play_time ~ ' 24:[0-5][0-9]:[0-5][0-9]'
        THEN TO_TIMESTAMP(
                REPLACE(start_play_time, ' 24:', ' 00:')::TEXT, 'MM/DD/YYYY HH24:MI:SS'
             ) + INTERVAL '1 day'
        ELSE TO_TIMESTAMP(start_play_time, 'MM/DD/YYYY HH24:MI:SS')
    END,
    CASE
        WHEN end_play_time ~ ' 24:[0-5][0-9]:[0-5][0-9]'
        THEN TO_TIMESTAMP(
                REPLACE(end_play_time, ' 24:', ' 00:')::TEXT, 'MM/DD/YYYY HH24:MI:SS'
             ) + INTERVAL '1 day'
        ELSE TO_TIMESTAMP(end_play_time, 'MM/DD/YYYY HH24:MI:SS')
    END
FROM data
WHERE
    account_id IS NOT NULL
    AND game_id IS NOT NULL
    AND start_play_time IS NOT NULL
    AND end_play_time IS NOT NULL
    AND game_id NOT IN (1, 2, 3)
    and account_id NOT IN (1067, 1068, 1069, 1070, 1071, 1072, 1073, 1074, 1075, 1076, 1077, 1078, 1079, 1080, 1081, 1082, 1083, 1083, 1084, 1085, 1086, 1087, 1088, 1089, 1090, 1091, 1092, 1093, 1094, 1095, 1096, 1097, 1098, 1099, 1100, 1101, 1102, 1103, 1104, 1105, 1106, 1107, 1108, 1109, 1110, 1111, 1112, 1113, 1114, 1115)

-- Why Two Queries Instead of One?
-- Separation of Responsibilities: Query 1 processes clean data directly, while Query 2 handles error-prone records needing corrections.
-- Performance: Splitting queries prevents unnecessary checks on clean data and simplifies debugging.
-- Data Integrity: Query 1 avoids potential risks of modifying clean records, while Query 2 safely fixes and inserts only the problematic ones.