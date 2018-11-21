#!/usr/bin/env bash
source "$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )/preflight"

cd $CI_PROJECT_DIR/api

(pkill node || true)
(pkill npm || true)
npm run-script start:dev
