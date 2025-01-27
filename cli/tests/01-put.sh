#!/bin/bash

echo "DROP STAGE IF EXISTS ss_01" | ${BIGSQL}
echo "CREATE STAGE ss_01" | ${BIGSQL}

cat <<SQL | ${BIGSQL}
DROP TABLE IF EXISTS books_01;
CREATE TABLE books_01
(
    title VARCHAR,
    author VARCHAR,
    date VARCHAR
);
SQL

cat <<SQL | ${BIGSQL}
SELECT * FROM books_01;
SQL

mkdir -p /tmp/abc
cp "${PWD}/cli/tests/data/books.parquet" /tmp/abc/books.parquet

echo "---- put ----"
echo "put fs:///tmp/abc/b*.parquet @ss_01/abc/" | ${BIGSQL}
echo "---- get ----"
echo 'get @ss_01/abc fs:///tmp/edf' | ${BIGSQL}

echo "---- copy ----"
cat <<SQL | ${BIGSQL}
COPY INTO books_01 FROM @ss_01/abc/ files=('books.parquet') FILE_FORMAT = (TYPE = PARQUET);
SQL

echo "---- select ----"
cat <<SQL | ${BIGSQL}
SELECT * FROM books_01 LIMIT 2;
SQL

echo "DROP STAGE IF EXISTS ss_01" | ${BIGSQL}
echo "DROP TABLE IF EXISTS books_01" | ${BIGSQL}
