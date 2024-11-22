-- Create all needed sequences
CREATE SEQUENCE gamestore.account_id_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 2147483647
	START 1
	CACHE 1
	NO CYCLE;

CREATE SEQUENCE gamestore.account_id_seq1
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 2147483647
	START 1
	CACHE 1
	NO CYCLE;

CREATE SEQUENCE gamestore.developer_id_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 2147483647
	START 1
	CACHE 1
	NO CYCLE;

CREATE SEQUENCE gamestore.developer_id_seq1
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 2147483647
	START 1
	CACHE 1
	NO CYCLE;

CREATE SEQUENCE gamestore.feature_account_id_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 2147483647
	START 1
	CACHE 1
	NO CYCLE;

CREATE SEQUENCE gamestore.feature_account_id_seq1
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 2147483647
	START 1
	CACHE 1
	NO CYCLE;

CREATE SEQUENCE gamestore.feature_pack_id_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 2147483647
	START 1
	CACHE 1
	NO CYCLE;

CREATE SEQUENCE gamestore.feature_pack_id_seq1
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 2147483647
	START 1
	CACHE 1
	NO CYCLE;

CREATE SEQUENCE gamestore.game_id_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 2147483647
	START 1
	CACHE 1
	NO CYCLE;

CREATE SEQUENCE gamestore.game_id_seq1
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 2147483647
	START 1
	CACHE 1
	NO CYCLE;

CREATE SEQUENCE gamestore.game_in_feature_pack_id_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 2147483647
	START 1
	CACHE 1
	NO CYCLE;

CREATE SEQUENCE gamestore.game_in_feature_pack_id_seq1
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 2147483647
	START 1
	CACHE 1
	NO CYCLE;

CREATE SEQUENCE gamestore.game_usage_id_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 2147483647
	START 1
	CACHE 1
	NO CYCLE;

CREATE SEQUENCE gamestore.game_usage_id_seq1
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 2147483647
	START 1
	CACHE 1
	NO CYCLE;

CREATE SEQUENCE gamestore.login_history_id_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 2147483647
	START 1
	CACHE 1
	NO CYCLE;

CREATE SEQUENCE gamestore.login_history_id_seq1
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 2147483647
	START 1
	CACHE 1
	NO CYCLE;

CREATE SEQUENCE gamestore.payment_features_id_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 2147483647
	START 1
	CACHE 1
	NO CYCLE;

CREATE SEQUENCE gamestore.payment_features_id_seq1
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 2147483647
	START 1
	CACHE 1
	NO CYCLE;

CREATE SEQUENCE gamestore.payment_subscriptions_id_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 2147483647
	START 1
	CACHE 1
	NO CYCLE;

CREATE SEQUENCE gamestore.payment_subscriptions_id_seq1
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 2147483647
	START 1
	CACHE 1
	NO CYCLE;

CREATE SEQUENCE gamestore.shared_feature_pack_revenue_id_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 2147483647
	START 1
	CACHE 1
	NO CYCLE;
    
CREATE SEQUENCE gamestore.shared_feature_pack_revenue_id_seq1
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 2147483647
	START 1
	CACHE 1
	NO CYCLE;

CREATE SEQUENCE gamestore.shared_subscription_revenue_id_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 2147483647
	START 1
	CACHE 1
	NO CYCLE;

CREATE SEQUENCE gamestore.shared_subscription_revenue_id_seq1
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 2147483647
	START 1
	CACHE 1
	NO CYCLE;

CREATE SEQUENCE gamestore.subscription_id_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 2147483647
	START 1
	CACHE 1
	NO CYCLE;

CREATE SEQUENCE gamestore.subscription_id_seq1
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 2147483647
	START 1
	CACHE 1
	NO CYCLE;-- gamestore.developer definition

-- Create all Tables
CREATE TABLE gamestore.developer (
	id int4 GENERATED ALWAYS AS IDENTITY( INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START 1 CACHE 1 NO CYCLE) NOT NULL,
	developer_name varchar(80) NOT NULL,
	contact_email varchar(255) NULL,
	revenue_share_percentage numeric(5, 2) DEFAULT 10.00 NULL,
	CONSTRAINT developer_pkey PRIMARY KEY (id)
);

CREATE TABLE gamestore.feature_pack (
	id int4 GENERATED ALWAYS AS IDENTITY( INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START 1 CACHE 1 NO CYCLE) NOT NULL,
	feature_name varchar(80) NOT NULL,
	cost_auto_renewal_month money NULL,
	cost_auto_renewal_year money NULL,
	cost_not_auto_renewal_month money NULL,
	cost_not_auto_renewal_year money NULL,
	CONSTRAINT feature_pack_pkey PRIMARY KEY (id)
);

CREATE TABLE gamestore."subscription" (
	id int4 GENERATED ALWAYS AS IDENTITY( INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START 1 CACHE 1 NO CYCLE) NOT NULL,
	subc_name varchar(80) NOT NULL,
	cost_month money NOT NULL,
	cost_year money NOT NULL,
	concurrent_logins int4 NOT NULL,
	CONSTRAINT subscription_pkey PRIMARY KEY (id)
);

CREATE TABLE gamestore.account (
	id int4 GENERATED ALWAYS AS IDENTITY( INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START 1 CACHE 1 NO CYCLE) NOT NULL,
	user_name varchar(80) NOT NULL,
	subscription_id int4 NULL,
	subscription_start_date date NOT NULL,
	actual_cost money NOT NULL,
	yearly_payment bool NOT NULL,
	end_date date NOT NULL,
	CONSTRAINT account_pkey PRIMARY KEY (id),
	CONSTRAINT account_subscription_id_fkey FOREIGN KEY (subscription_id) REFERENCES gamestore."subscription"(id)
);

CREATE TABLE gamestore.feature_account (
	id int4 GENERATED ALWAYS AS IDENTITY( INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START 1 CACHE 1 NO CYCLE) NOT NULL,
	account_id int4 NULL,
	feature_id int4 NULL,
	first_payment_date date NOT NULL,
	auto_renew bool NOT NULL,
	actual_cost money NOT NULL,
	yearly_payment bool NOT NULL,
	end_date date NOT NULL,
	CONSTRAINT feature_account_pkey PRIMARY KEY (id),
	CONSTRAINT feature_account_account_id_fkey FOREIGN KEY (account_id) REFERENCES gamestore.account(id),
	CONSTRAINT feature_account_feature_id_fkey FOREIGN KEY (feature_id) REFERENCES gamestore.feature_pack(id)
);

CREATE TABLE gamestore.game (
	id int4 GENERATED ALWAYS AS IDENTITY( INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START 1 CACHE 1 NO CYCLE) NOT NULL,
	game_name varchar(80) NOT NULL,
	developer_id int4 NOT NULL,
	CONSTRAINT game_pkey PRIMARY KEY (id),
	CONSTRAINT game_developer_id_fkey FOREIGN KEY (developer_id) REFERENCES gamestore.developer(id)
);

CREATE TABLE gamestore.game_in_feature_pack (
	id int4 GENERATED ALWAYS AS IDENTITY( INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START 1 CACHE 1 NO CYCLE) NOT NULL,
	game_id int4 NOT NULL,
	feature_pack_id int4 NULL,
	CONSTRAINT game_in_feature_pack_pkey PRIMARY KEY (id),
	CONSTRAINT game_in_feature_pack_feature_pack_id_fkey FOREIGN KEY (feature_pack_id) REFERENCES gamestore.feature_pack(id),
	CONSTRAINT game_in_feature_pack_game_id_fkey FOREIGN KEY (game_id) REFERENCES gamestore.game(id)
);

CREATE TABLE gamestore.game_usage (
	id int4 GENERATED ALWAYS AS IDENTITY( INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START 1 CACHE 1 NO CYCLE) NOT NULL,
	account_id int4 NOT NULL,
	game_id int4 NOT NULL,
	start_play_time timestamp NOT NULL,
	end_play_time timestamp NOT NULL,
	CONSTRAINT game_usage_pkey PRIMARY KEY (id),
	CONSTRAINT game_usage_account_id_fkey FOREIGN KEY (account_id) REFERENCES gamestore.account(id),
	CONSTRAINT game_usage_game_id_fkey FOREIGN KEY (game_id) REFERENCES gamestore.game(id)
);

CREATE TABLE gamestore.login_history (
	id int4 GENERATED ALWAYS AS IDENTITY( INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START 1 CACHE 1 NO CYCLE) NOT NULL,
	account_id int4 NOT NULL,
	login_time timestamp NOT NULL,
	login_success bool NOT NULL,
	CONSTRAINT login_history_pkey PRIMARY KEY (id),
	CONSTRAINT login_history_account_id_fkey FOREIGN KEY (account_id) REFERENCES gamestore.account(id)
);

CREATE TABLE gamestore.payment_features (
	id int4 GENERATED ALWAYS AS IDENTITY( INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START 1 CACHE 1 NO CYCLE) NOT NULL,
	account_id int4 NOT NULL,
	feature_id int4 NOT NULL,
	payment_amount money NOT NULL,
	payment_date timestamp NOT NULL,
	auto_renew bool DEFAULT true NULL,
	CONSTRAINT payment_features_pkey PRIMARY KEY (id),
	CONSTRAINT payment_features_account_id_fkey FOREIGN KEY (account_id) REFERENCES gamestore.account(id),
	CONSTRAINT payment_features_feature_id_fkey FOREIGN KEY (feature_id) REFERENCES gamestore.feature_pack(id)
);

CREATE TABLE gamestore.payment_subscriptions (
	id int4 GENERATED ALWAYS AS IDENTITY( INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START 1 CACHE 1 NO CYCLE) NOT NULL,
	account_id int4 NOT NULL,
	subscription_id int4 NOT NULL,
	payment_amount money NOT NULL,
	payment_date timestamp NOT NULL,
	CONSTRAINT payment_subscriptions_pkey PRIMARY KEY (id),
	CONSTRAINT payment_subscriptions_account_id_fkey FOREIGN KEY (account_id) REFERENCES gamestore.account(id),
	CONSTRAINT payment_subscriptions_subscription_id_fkey FOREIGN KEY (subscription_id) REFERENCES gamestore."subscription"(id)
);

CREATE TABLE gamestore.shared_feature_pack_revenue (
	id int4 GENERATED ALWAYS AS IDENTITY( INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START 1 CACHE 1 NO CYCLE) NOT NULL,
	developer_id int4 NOT NULL,
	feature_pack_id int4 NOT NULL,
	date_payed date NOT NULL,
	total_min_games_played int4 NOT NULL,
	total_count_games_in_feature_pack int4 NOT NULL,
	revenue_share money NULL,
	CONSTRAINT shared_feature_pack_revenue_pkey PRIMARY KEY (id),
	CONSTRAINT shared_feature_pack_revenue_developer_id_fkey FOREIGN KEY (developer_id) REFERENCES gamestore.developer(id),
	CONSTRAINT shared_feature_pack_revenue_feature_pack_id_fkey FOREIGN KEY (feature_pack_id) REFERENCES gamestore.feature_pack(id)
);

CREATE TABLE gamestore.shared_subscription_revenue (
	id int4 GENERATED ALWAYS AS IDENTITY( INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START 1 CACHE 1 NO CYCLE) NOT NULL,
	developer_id int4 NOT NULL,
	date_payed date NOT NULL,
	total_min_games_played int4 NOT NULL,
	total_times_games_played int4 NOT NULL,
	revenue_share money NULL,
	CONSTRAINT shared_subscription_revenue_pkey PRIMARY KEY (id),
	CONSTRAINT shared_subscription_revenue_developer_id_fkey FOREIGN KEY (developer_id) REFERENCES gamestore.developer(id)
);

-- Create all Views
CREATE OR REPLACE VIEW gamestore.account_feature_packs
AS SELECT fa.account_id,
    a.user_name,
    fa.feature_id,
    fp.feature_name,
    fa.first_payment_date,
    fa.auto_renew,
    fa.actual_cost,
    fa.yearly_payment,
    fa.end_date
   FROM gamestore.feature_account fa
     INNER JOIN gamestore.account a ON (fa.account_id = a.id)
     INNER JOIN gamestore.feature_pack fp ON (fa.feature_id = fp.id);

CREATE OR REPLACE VIEW gamestore.account_subscription_details
AS SELECT a.id AS account_id,
    a.user_name,
    s.subc_name AS subscription_type,
    a.subscription_start_date,
    a.end_date,
    a.yearly_payment,
    a.actual_cost
   FROM gamestore.account a
     LEFT JOIN gamestore.subscription s ON (a.subscription_id = s.id);

CREATE OR REPLACE VIEW gamestore.developer_revenue_overview
AS SELECT d.id AS developer_id,
    d.developer_name,
    d.contact_email,
    COALESCE(sum(sr.revenue_share), 0::money) AS total_subscription_revenue,
    COALESCE(sum(fp.revenue_share), 0::money) AS total_feature_pack_revenue,
    COALESCE(sum(sr.revenue_share), 0::money) + COALESCE(sum(fp.revenue_share), 0::money) AS total_revenue
   FROM gamestore.developer d
     LEFT JOIN gamestore.shared_subscription_revenue sr ON (d.id = sr.developer_id)
     LEFT JOIN gamestore.shared_feature_pack_revenue fp ON (d.id = fp.developer_id)
  GROUP BY d.id, d.developer_name, d.contact_email;

CREATE OR REPLACE VIEW gamestore.feature_pack_games
AS SELECT fp.id AS feature_pack_id,
    fp.feature_name,
    g.id AS game_id,
    g.game_name
   FROM gamestore.feature_pack fp
     INNER JOIN gamestore.game_in_feature_pack gif ON (fp.id = gif.feature_pack_id)
     INNER JOIN gamestore.game g ON (gif.game_id = g.id);

CREATE OR REPLACE VIEW gamestore.game_catalog
AS SELECT g.id AS game_id,
    g.game_name,
    d.developer_name,
    d.contact_email
   FROM gamestore.game g
     INNER JOIN gamestore.developer d ON (g.developer_id = d.id);

CREATE OR REPLACE VIEW gamestore.game_usage_stats
AS SELECT gu.id AS usage_id,
    a.user_name,
    g.game_name,
    g.developer_id,
    gu.start_play_time,
    gu.end_play_time,
    EXTRACT(epoch FROM gu.end_play_time - gu.start_play_time) / 60::numeric AS play_duration_minutes
   FROM gamestore.game_usage gu
     INNER JOIN gamestore.account a ON (gu.account_id = a.id)
     INNER JOIN gamestore.game g ON (gu.game_id = g.id);


CREATE OR REPLACE VIEW gamestore.login_activity
AS SELECT lh.id AS login_id,
    a.user_name,
    lh.login_time,
    lh.login_success
   FROM gamestore.login_history lh
     INNER JOIN gamestore.account a ON (lh.account_id = a.id);


-- gamestore.payment_history source

CREATE OR REPLACE VIEW gamestore.payment_history
AS SELECT p.id AS payment_id,
    a.user_name,
    'Feature'::text AS payment_type,
    fp.feature_name AS item_name,
    p.payment_amount,
    p.payment_date,
    p.auto_renew
   FROM gamestore.payment_features p
     INNER JOIN gamestore.account a ON (p.account_id = a.id)
     INNER JOIN gamestore.feature_pack fp ON (p.feature_id = fp.id)
UNION ALL
 SELECT ps.id AS payment_id,
    a.user_name,
    'Subscription'::text AS payment_type,
    s.subc_name AS item_name,
    ps.payment_amount,
    ps.payment_date,
    NULL::boolean AS auto_renew
   FROM gamestore.payment_subscriptions ps
     INNER JOIN gamestore.account a ON (ps.account_id = a.id)
     INNER JOIN gamestore.subscription s ON (ps.subscription_id = s.id);

CREATE OR REPLACE PROCEDURE gamestore.calculate_feature_pack_revenue(IN p_date date)
 LANGUAGE plpgsql
AS $procedure$
	DECLARE
	    feature_pack_revenue_share MONEY;
	    local_developer_id INT;
	    local_feature_pack_id INT;
	    min_played_games_in_feature_pack NUMERIC;
	    all_minutes_played_in_feature_pack NUMERIC;
	    revenue_share MONEY;
	    last_payment_date DATE;
	BEGIN
	    -- Retrieve the date of the last feature pack revenue payment
	    last_payment_date := gamestore.get_last_feature_pack_payment_date();
	
	    -- Iterate over each feature pack
	    FOR local_feature_pack_id IN
	        SELECT id FROM gamestore.feature_pack
	    LOOP
	        -- Calculate the 10% revenue share for this feature pack
	        SELECT COALESCE(SUM(payment_amount) * 0.10, 0::money)
	        INTO feature_pack_revenue_share
	        FROM gamestore.payment_features
	        WHERE feature_id = local_feature_pack_id
	          AND payment_date > last_payment_date
	          AND payment_date <= p_date;
	
	        -- Calculate total minutes played for all games in this feature pack
	        SELECT COALESCE(SUM(EXTRACT(EPOCH FROM (game_usage.end_play_time - game_usage.start_play_time))::numeric) / 60, 0)
	        INTO all_minutes_played_in_feature_pack
	        FROM gamestore.game_usage
	        INNER JOIN gamestore.game_in_feature_pack ON (game_usage.game_id = game_in_feature_pack.game_id)
	        WHERE game_in_feature_pack.feature_pack_id = local_feature_pack_id
	          AND game_usage.end_play_time > last_payment_date
	          AND game_usage.end_play_time <= p_date;
	
	        -- Iterate over each developer in this feature pack
	        FOR local_developer_id IN 
	            SELECT DISTINCT game.developer_id
	            FROM gamestore.game
	            INNER JOIN gamestore.game_in_feature_pack ON (game.id = game_in_feature_pack.game_id)
	            WHERE game_in_feature_pack.feature_pack_id = local_feature_pack_id
	        LOOP
	            -- Calculate total minutes played for this developer's games in the feature pack
	            SELECT COALESCE(SUM(EXTRACT(EPOCH FROM (game_usage.end_play_time - game_usage.start_play_time))::numeric) / 60, 0)
	            INTO min_played_games_in_feature_pack
	            FROM gamestore.game_usage
	            INNER JOIN gamestore.game_in_feature_pack ON (game_usage.game_id = game_in_feature_pack.game_id)
	            INNER JOIN gamestore.game ON (game_in_feature_pack.game_id = game.id)
	            WHERE game_in_feature_pack.feature_pack_id = local_feature_pack_id
	              AND game.developer_id = local_developer_id
	              AND game_usage.end_play_time > last_payment_date
	              AND game_usage.end_play_time <= p_date;
	
	            -- Calculate the revenue share for the developer
	            IF all_minutes_played_in_feature_pack > 0 THEN
	                revenue_share := feature_pack_revenue_share * (min_played_games_in_feature_pack / all_minutes_played_in_feature_pack);
	            ELSE
	                revenue_share := 0::money;
	            END IF;
	
	            -- Insert the calculated revenue share into the shared_feature_pack_revenue table
	            INSERT INTO gamestore.shared_feature_pack_revenue (
	                developer_id, feature_pack_id, date_payed, total_min_games_played, total_count_games_in_feature_pack, revenue_share
	            ) VALUES (
	                local_developer_id, local_feature_pack_id, p_date, min_played_games_in_feature_pack, all_minutes_played_in_feature_pack, revenue_share
	            );
	        END LOOP;
	    END LOOP;
	END;
	$procedure$
;

CREATE OR REPLACE PROCEDURE gamestore.calculate_revenue_distribution(IN p_date date)
 LANGUAGE plpgsql
AS $procedure$
	BEGIN
	    call gamestore.calculate_subscription_revenue(p_date);
	    call gamestore.calculate_feature_pack_revenue(p_date);
	END;
	$procedure$
;

CREATE OR REPLACE PROCEDURE gamestore.calculate_subscription_revenue(IN p_date date)
 LANGUAGE plpgsql
AS $procedure$
	DECLARE
	    subscription_revenue_share MONEY;
	    developer_games_played NUMERIC;
	    total_games_played NUMERIC;
	    revenue_share MONEY;
	    last_payment_date DATE;
	    local_developer_id INT;
	BEGIN
	    -- Retrieve the last payment date
	    last_payment_date := gamestore.get_last_subscription_payment_date();
	
	    -- Calculate the total subscription revenue share (10% of subscription revenue)
	    SELECT COALESCE(SUM(payment_amount) * 0.10, 0::money)
	    INTO subscription_revenue_share
	    FROM gamestore.payment_subscriptions
	    WHERE payment_date > last_payment_date AND payment_date <= p_date;
	
	    -- Loop through each developer
	    FOR local_developer_id IN 
	        SELECT id FROM gamestore.developer
	    LOOP
	        -- Total minutes of games played for the developer
	        SELECT COALESCE(SUM(EXTRACT(EPOCH FROM (game_usage.end_play_time - game_usage.start_play_time)) / 60), 0)
	        INTO developer_games_played
	        FROM gamestore.game_usage
	        INNER JOIN gamestore.game ON (game_usage.game_id = game.id)
	        WHERE game.developer_id = local_developer_id
	          AND game_usage.end_play_time > last_payment_date
	          AND game_usage.end_play_time <= p_date;
	
	        -- Total games played across all developers
	        SELECT COALESCE(SUM(EXTRACT(EPOCH FROM (game_usage.end_play_time - game_usage.start_play_time)) / 60), 0)
	        INTO total_games_played
	        FROM gamestore.game_usage
	        WHERE game_usage.end_play_time > last_payment_date
	          AND game_usage.end_play_time <= p_date;
	
	        -- Calculate the revenue share for the developer
	        IF total_games_played > 0 THEN
	            revenue_share := subscription_revenue_share * (developer_games_played / total_games_played);
	        ELSE
	            revenue_share := 0::money;
	        END IF;
	
	        -- Insert the revenue share for the developer
	        INSERT INTO gamestore.shared_subscription_revenue (
	            developer_id, date_payed, total_min_games_played, total_times_games_played, revenue_share
	        ) VALUES (
	            local_developer_id, p_date, developer_games_played, total_games_played, revenue_share
	        );
	    END LOOP;
	END;
	$procedure$
;

CREATE OR REPLACE FUNCTION gamestore.get_last_feature_pack_payment_date()
 RETURNS date
 LANGUAGE plpgsql
AS $function$
	DECLARE
	    last_payment_date DATE;
	BEGIN
	    SELECT MAX(date_payed)
	    INTO last_payment_date
	    FROM gamestore.shared_feature_pack_revenue;
	
	    RETURN COALESCE(last_payment_date, '1900-01-01');
	END;
	$function$
;

CREATE OR REPLACE FUNCTION gamestore.get_last_subscription_payment_date()
 RETURNS date
 LANGUAGE plpgsql
AS $function$
	DECLARE
	    last_payment_date DATE;
	BEGIN
	    SELECT MAX(date_payed)
	    INTO last_payment_date
	    FROM gamestore.shared_subscription_revenue;
	
	    RETURN COALESCE(last_payment_date, '1900-01-01'); -- Default if no payments exist
	END;
	$function$
;