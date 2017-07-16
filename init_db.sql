CREATE DATABASE IF NOT EXISTS bitflyer;

CREATE TABLE IF NOT EXISTS bitflyer.tickers (
  id                  INT UNSIGNED      NOT NULL AUTO_INCREMENT PRIMARY KEY,
  timestamp           DATETIME          NOT NULL,
  total_bid_depth     FLOAT UNSIGNED    NOT NULL,
  total_ask_depth     FLOAT UNSIGNED    NOT NULL,
  ltp                 FLOAT UNSIGNED    NOT NULL,
  volume_by_product   FLOAT UNSIGNED    NOT NULL,
  bids                VARCHAR(1024)     NOT NULL,
  asks                VARCHAR(1024)     NOT NULL
);
