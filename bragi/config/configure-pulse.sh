#!/bin/bash

# load alsa loopback kernel module
sudo modprobe snd-aloop

# load default device from ~/.asoundrc
pacmd load-module module-alsa-sink device="default" tsched=1

# set default pulse sink to our virtual splitter device
pacmd set-default-sink alsa_output.default
