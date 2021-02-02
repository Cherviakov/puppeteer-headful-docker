#!/bin/bash

if [[ -e /tmp/.X99-lock ]];then
  rm /tmp/.X99-lock
fi
Xvfb :99 -screen 0 1024x768x24 -nolisten tcp &
npm start
