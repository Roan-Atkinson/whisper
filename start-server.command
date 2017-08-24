#!/bin/bash
cd ~/Desktop/projects/whisper/
localIP=$(/sbin/ifconfig en0 | grep -Eo 'inet (addr:)?([0-9]*\.){3}[0-9]*' | grep -Eo '([0-9]*\.){3}[0-9]*' | grep -v '127.0.0.1')
printf "\e[8;20;70t"
clear
php -S $localIP:8080
