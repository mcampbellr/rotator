#!/usr/bin/env bash
env=`cat ~/.local/share/rotator/.rotator.json | jq -r .currentEnv`
use_tmux=false

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
    -t | --tmux)
      use_tmux=true
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

env=`cat ~/.local/share/rotator/.rotator.json | jq -r .currentEnv`
selected=`cat ~/.local/share/rotator/.rotator.json | jq -r '.'$env' | keys[] as $k | $k' | fzf --header=$env --height=40% --reverse`


if [[ -z $selected ]]; then
  echo 'No directory selected'
  return 0
fi

selected_name=$(basename "$selected" | tr . _)
tmux_running=$(pgrep tmux)
dir=`cat ~/.local/share/rotator/.rotator.json | jq -r .$env.$selected`

if [ "$use_tmux" = true ]; then
  if [[ -z $TMUX ]] && [[ -z $tmux_running ]]; then
    tmux new-session -s $selected_name -c $dir
    exit 0
  fi

  if ! tmux has-session -t $selected_name 2> /dev/null; then
    tmux new-session -ds $selected_name -c $dir
  fi

  tmux switch-client -t $selected_name
else
  cd $dir
fi


