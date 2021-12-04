#!/usr/bin/env bash
env=`cat ~/Development/dotfiles/.rotator.json | jq -r .currentEnv`

while :; do
  case $1 in
    -m | --mark)
      rotator --mark
      return 1
      ;;
    -u | --unmark)
      rotator --unmark
      return 1
      ;;
    -s | --switch)
      rotator --switch
      return 1
      ;;
    -e | --env)
      echo "You are in $env"
      return 1
      ;;
    -n | --new)
      rotator --new
      return 1
      ;;
    -c | --clean)
      rotator --clean
      return 1
      ;;
    -?*)
      echo "Invalid argument"
      return 1
      ;;
    ?*)
      cd $1
      return 1
      ;;
    *)
      break
  esac
  shift
done

env=`cat ~/Development/dotfiles/.rotator.json | jq -r .currentEnv`
selected=`cat ~/Development/dotfiles/.rotator.json | jq -r '.'$env' | keys[] as $k | $k' | fzf --header=$env --height=40% --reverse`

if [[ -z $selected ]]; then
  echo 'No dir selected'
  return 0
fi

dir=`cat ~/Development/dotfiles/.rotator.json | jq -r .$env.$selected`

cd $dir

