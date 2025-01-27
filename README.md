# BigSQL

Bigbytes Native Client in Rust

## Components

- [**core**](core): Bigbytes RestAPI Rust Client

- [**driver**](driver): Bigbytes SQL Client for both RestAPI and FlightSQL in Rust

- [**cli**](cli): Bigbytes Native CLI

### Bindings

- [**python**](bindings/python): Bigbytes Python Client

- [**nodejs**](bindings/nodejs): Bigbytes Node.js Client

- [**java**](bindings/java): Bigbytes Java Client (upcoming)

## Installation for BigSQL

### Installation script

```bash
curl -fsSL https://repo.getbigbytes.com/install/bigsql.sh | bash
```

or

```bash
curl -fsSL https://repo.getbigbytes.com/install/bigsql.sh | bash -s -- -y --prefix /usr/local
```

### Cargo:

[cargo-binstall](https://github.com/cargo-bins/cargo-binstall) is recommended:

```bash
cargo binstall bigsql
```

Or alternatively build from source:

```bash
cargo install bigsql
```

### Homebrew:

```bash
brew install databendcloud/homebrew-tap/bigsql
```

### Apt:

- Using DEB822-STYLE format on Ubuntu-22.04/Debian-12 and later:

```bash
sudo curl -L -o /etc/apt/sources.list.d/databend.sources https://repo.databend.rs/deb/databend.sources
```

- Using old format on Ubuntu-20.04/Debian-11 and earlier:

```bash
sudo curl -L -o /usr/share/keyrings/databend-keyring.gpg https://repo.databend.rs/deb/databend.gpg
sudo curl -L -o /etc/apt/sources.list.d/databend.list https://repo.databend.rs/deb/databend.list
```

Then install bigsql:

```bash
sudo apt update

sudo apt install bigsql
```

### Manually:

Check for latest version on [GitHub Release](https://github.com/getbigbytes/bigsql/releases)

## Usage

```
❯ bigsql --help
Bigbytes Native Command Line Tool

Usage: bigsql [OPTIONS]

Options:
      --help                       Print help information
      --flight                     Using flight sql protocol, ignored when --dsn is set
      --tls                        Enable TLS, ignored when --dsn is set
  -h, --host <HOST>                Bigbytes Server host, Default: 127.0.0.1, ignored when --dsn is set
  -P, --port <PORT>                Bigbytes Server port, Default: 8000, ignored when --dsn is set
  -u, --user <USER>                Default: root, overrides username in DSN
  -p, --password <PASSWORD>        Password, overrides password in DSN [env: BIGSQL_PASSWORD]
  -r, --role <ROLE>                Downgrade role name, overrides role in DSN
  -D, --database <DATABASE>        Database name, overrides database in DSN
      --set <SET>                  Settings, overrides settings in DSN
      --dsn <DSN>                  Data source name [env: BIGSQL_DSN]
  -n, --non-interactive            Force non-interactive mode
  -A, --no-auto-complete           Disable loading tables and fields for auto-completion, which offers a quicker start
      --check                      Check for server status and exit
      --query=<QUERY>              Query to execute
  -d, --data <DATA>                Data to load, @file or @- for stdin
  -f, --format <FORMAT>            Data format to load [default: csv] [possible values: csv, tsv, ndjson, parquet, xml]
      --format-opt <FORMAT_OPT>    Data format options
  -o, --output <OUTPUT>            Output format [possible values: table, csv, tsv, null]
      --quote-style <QUOTE_STYLE>  Output quote style, applies to `csv` and `tsv` output formats [possible values: always, necessary, non-numeric, never]
      --progress                   Show progress for query execution in stderr, only works with output format `table` and `null`.
      --stats                      Show stats after query execution in stderr, only works with non-interactive mode.
      --time[=<TIME>]              Only show execution time without results, will implicitly set output format to `null`. [possible values: local, server]
  -l, --log-level <LOG_LEVEL>      [default: info]
  -V, --version                    Print version
```

## Custom configuration

By default bigsql will read configuration from `~/.bigsql/config.toml` and `~/.config/bigsql/config.toml`
sequentially if exists.

- Example file

```
❯ cat ~/.bigsql/config.toml
[connection]
host = "127.0.0.1"
tls = false

[connection.args]
connect_timeout = "30"

[settings]
display_pretty_sql = true
progress_color = "green"
no_auto_complete = true
prompt = ":) "
```

- Connection section

| Parameter  | Description                 |
| ---------- | --------------------------- |
| `host`     | Server host to connect.     |
| `port`     | Server port to connect.     |
| `user`     | User name.                  |
| `database` | Which database to connect.  |
| `args`     | Additional connection args. |

- Settings section

| Parameter            | Description                                                                         |
| -------------------- | ----------------------------------------------------------------------------------- |
| `display_pretty_sql` | Whether to display SQL queries in a formatted way.                                  |
| `prompt`             | The prompt to display before asking for input.                                      |
| `progress_color`     | The color to use for the progress bar.                                              |
| `show_progress`      | Whether to show a progress bar when executing queries.                              |
| `show_stats`         | Whether to show statistics after executing queries.                                 |
| `no_auto_complete`   | Whether to disable loading tables and fields for auto-completion on startup.        |
| `max_display_rows`   | The maximum number of rows to display in table output format.                       |
| `max_width`          | Limit display render box max width, 0 means default to the size of the terminal.    |
| `max_col_width`      | Limit display render each column max width, smaller than 3 means disable the limit. |
| `output_format`      | The output format to use.                                                           |
| `expand`             | Expand table format display, default auto, could be on/off/auto.                    |
| `time`               | Whether to show the time elapsed when executing queries.                            |
| `multi_line`         | Whether to allow multi-line input.                                                  |
| `replace_newline`    | whether replace '\n' with '\\\n'.                                                   |

## Commands in REPL

| Commands       | Description             |
| -------------- | ----------------------- |
| `!exit`        | Exit bigsql            |
| `!quit`        | Exit bigsql            |
| `!configs`     | Show current settings   |
| `!set`         | Set settings            |
| `!source file` | Source file and execute |

## Setting commands in REPL

We can use `!set CMD_NAME VAL` to update the `Settings` above in runtime, example:

```
❯ bigsql

:) !set display_pretty_sql false
:) !set max_display_rows 10
:) !set expand auto
```

## DSN

Format:

```
databend[+flight]://user:[password]@host[:port]/[database][?sslmode=disable][&arg1=value1]
```

Examples:

- `databend://root:@localhost:8000/?sslmode=disable&presign=detect`

- `databend://user1:password1@tnxxxx--default.gw.aws-us-east-2.default.getbigbytes.com:443/benchmark?enable_dphyp=1`

- `databend+flight://root:@localhost:8900/database1?connect_timeout=10`

### Available Args

#### Common

| Arg               | Description                          |
| ----------------- | ------------------------------------ |
| `tenant`          | Tenant ID, Bigbytes Cloud only.      |
| `warehouse`       | Warehouse name, Bigbytes Cloud only. |
| `sslmode`         | Set to `disable` if not using tls.   |
| `tls_ca_file`     | Custom root CA certificate path.     |
| `connect_timeout` | Connect timeout in seconds           |

#### RestAPI Client

| Arg                         | Description                                                                                                                                                      |
| --------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `wait_time_secs`            | Request wait time for page, default to `1`                                                                                                                       |
| `max_rows_in_buffer`        | Max rows for page buffer                                                                                                                                         |
| `max_rows_per_page`         | Max response rows for a single page                                                                                                                              |
| `page_request_timeout_secs` | Timeout for a single page request, default to `30`                                                                                                               |
| `presign`                   | Whether to enable presign for data loading, available arguments are `auto`/`detect`/`on`/`off`. Default to `auto` which only enable presign for `Bigbytes Cloud` |

#### FlightSQL Client

| Arg                         | Description                                                               |
| --------------------------- | ------------------------------------------------------------------------- |
| `query_timeout`             | Query timeout seconds                                                     |
| `tcp_nodelay`               | Default to `true`                                                         |
| `tcp_keepalive`             | Tcp keepalive seconds, default to `3600`, set to `0` to disable keepalive |
| `http2_keep_alive_interval` | Keep alive interval in seconds, default to `300`                          |
| `keep_alive_timeout`        | Keep alive timeout in seconds, default to `20`                            |
| `keep_alive_while_idle`     | Default to `true`                                                         |

#### Query Settings

see: [Bigbytes Query Settings](https://databend.rs/doc/sql-commands/show/show-settings)

## Development

### Cargo fmt, clippy, deny

```bash
make check
```

### Unit tests

```bash
make test
```

### integration tests

_Note: Docker and Docker Compose needed_

```bash
make integration
```
