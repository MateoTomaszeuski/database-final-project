-- Query #1
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
 
-- Query #2
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
