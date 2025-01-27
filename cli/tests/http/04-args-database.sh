#!/bin/bash

cat <<SQL | ${BIGSQL}
DROP DATABASE IF EXISTS books_04;
CREATE DATABASE IF NOT EXISTS books_04;
SQL

cat <<SQL | ${BIGSQL}
DROP TABLE IF EXISTS books_04_d;
CREATE TABLE books_04_d
(
    title VARCHAR,
    author VARCHAR,
    date VARCHAR
);
SQL

cat <<SQL | ${BIGSQL} -D books_04
DROP TABLE IF EXISTS books_04_t;
CREATE TABLE books_04_t
(
    title VARCHAR,
    author VARCHAR,
    date VARCHAR
);
SQL

echo "---- tables ----"
cat <<SQL | ${BIGSQL}
SHOW TABLES;
SQL

echo "---- databases ----"
cat <<SQL | ${BIGSQL}
SHOW DATABASES;
SQL

echo "---- tables in books_04 ----"
cat <<SQL | ${BIGSQL} -D books_04
SHOW TABLES;
SQL

cat <<SQL | ${BIGSQL}
DROP TABLE IF EXISTS books_04_d;
DROP DATABASE IF EXISTS books_04;
SQL
