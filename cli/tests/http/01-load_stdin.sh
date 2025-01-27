#!/bin/bash

cat <<SQL | ${BIGSQL}
DROP TABLE IF EXISTS http_books_01;
SQL

cat <<SQL | ${BIGSQL}
CREATE TABLE http_books_01 (title VARCHAR NULL, author VARCHAR NULL, date VARCHAR NULL, publish_time TIMESTAMP NULL);
SQL

${BIGSQL} --query='INSERT INTO http_books_01 VALUES;' --format=csv --data=@- <cli/tests/data/books.csv

${BIGSQL} --query='SELECT * FROM http_books_01 LIMIT 10;' --output=tsv

cat <<SQL | ${BIGSQL}
DROP TABLE http_books_01;
SQL
