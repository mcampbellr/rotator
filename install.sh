#!/bin/bash

# Fail fast with a concise message when not using bash
# Single brackets are needed here for POSIX compatibility
# shellcheck disable=SC2292
if [ -z "${BASH_VERSION:-}" ]
then
  abort "Bash is required to interpret this script."
fi

location=$HOME/.local/share/rotator

if [ -d "$location" ]; then
  echo since the folder ${location} exists we create a backup directory in ${location}-bkp
  mv ${location} ${location}-bkp
fi

mkdir ${location};
cd ${location};
echo {\"envs\":[\"Initial\"],\"currentEnv\": \"Initial\", \"Initial\": {}} > .rotator.json;

