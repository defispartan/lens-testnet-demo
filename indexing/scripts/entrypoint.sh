#!/usr/bin/env bash

set -e

echo "Running $(/root/.rindexer/bin/rindexer --version)"

rindexer start --path ./example all
