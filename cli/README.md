# BigSQL

Bigbytes Native Command Line Tool

[![crates.io](https://img.shields.io/crates/v/bigsql.svg)](https://crates.io/crates/bigsql)
![License](https://img.shields.io/crates/l/bigsql.svg)

## Install

```sh
cargo install bigsql
```

## Usage

```
❯ bigsql --help
Bigbytes Native Command Line Tool

Usage: bigsql [OPTIONS]

Options:
      --help                 Print help information
      --flight               Using flight sql protocol
      --tls                  Enable TLS
  -h, --host <HOST>          Databend Server host, Default: 127.0.0.1
  -P, --port <PORT>          Databend Server port, Default: 8000
  -u, --user <USER>          Default: root
  -p, --password <PASSWORD>  [env: BIGSQL_PASSWORD=]
  -D, --database <DATABASE>  Database name
      --set <SET>            Settings
      --dsn <DSN>            Data source name [env: BIGSQL_DSN=]
  -n, --non-interactive      Force non-interactive mode
  -q, --query <QUERY>        Query to execute
  -d, --data <DATA>          Data to load, @file or @- for stdin
  -f, --format <FORMAT>      Data format to load [default: csv]
  -o, --output <OUTPUT>      Output format [default: table]
      --progress             Show progress for data loading in stderr
  -V, --version              Print version
```

### REPL
```sql
❯ bigsql
Welcome to BigSQL.
Connecting to localhost:8000 as user root.

bigsql> select avg(number) from numbers(10);

SELECT
  avg(number)
FROM
  numbers(10);

┌───────────────────┐
│    avg(number)    │
│ Nullable(Float64) │
├───────────────────┤
│ 4.5               │
└───────────────────┘

1 row in 0.259 sec. Processed 10 rows, 10B (38.59 rows/s, 308B/s)

bigsql> show tables like 'd%';

SHOW TABLES LIKE 'd%';

┌───────────────────┐
│ tables_in_default │
│       String      │
├───────────────────┤
│ data              │
│ data2             │
│ data3             │
│ data4             │
└───────────────────┘

4 rows in 0.106 sec. Processed 0 rows, 0B (0 rows/s, 0B/s)

bigsql> exit
Bye
```

### StdIn Pipe

```bash
❯ echo "select number from numbers(3)" | bigsql -h localhost --port 8900 --flight
0
1
2
```

### Put local files into stage

```
create stage s_temp;
put fs:///tmp/a*.txt @s_temp/abc;
```

## Features

- basic keywords highlight
- basic auto-completion
- select query support
- TBD
