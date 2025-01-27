#!/bin/bash

cat <<SQL | ${BIGSQL}
DROP TABLE IF EXISTS http_ontime_03;
SQL

${BIGSQL} <cli/tests/data/ontime.sql

${BIGSQL} \
    --query='INSERT INTO http_ontime_03 VALUES;' \
    --format=csv \
    --format-opt="compression=gzip" \
    --format-opt="skip_header=1" \
    --data=@cli/tests/data/ontime_200.csv.gz

echo "SELECT COUNT(*) FROM http_ontime_03;" | ${BIGSQL} --output=tsv
echo 'SELECT * FROM http_ontime_03 LIMIT 1;' | ${BIGSQL} --output=csv

cat <<SQL | ${BIGSQL}
DROP TABLE http_ontime_03;
SQL
