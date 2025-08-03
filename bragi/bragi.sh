#!/bin/sh

set -e

readonly ALSA_CONFIG=~/.asoundrc
readonly ALSA_CONFIG_BAK="${ALSA_CONFIG}.bak"
readonly BRAGI_ALSA_CONFIG=config/.asoundrc
readonly BRAGI_PULSE_CONFIG=config/configure-pulse.sh

run() {
  arecord -D "hw:Loopback,1,0" -f cd 2>/dev/null \
    | python3.6 predictBytes.py 2>/dev/null \
    | sh pulse-volctl.sh
}

install() {
  [ -f "$ALSA_CONFIG" ] && mv "$ALSA_CONFIG" "$ALSA_CONFIG_BAK"
  cp "$BRAGI_ALSA_CONFIG" "$ALSA_CONFIG"
  sh "$BRAGI_PULSE_CONFIG"
}

uninstall() {
  mv "$ALSA_CONFIG_BAK" "$ALSA_CONFIG"

  # Reload ALSA
  # https://askubuntu.com/a/230893/355712
  pulseaudio -k && sudo alsa force-reload
  sudo modprobe -r snd-aloop
}

if [ ! $(which python3 2>/dev/null) ] ; then
  echo "You are missing python3! Please install and re-run."
  exit 1
fi

python3 -m pip install -r ml/requirements.txt --user

trap uninstall 2

install
run

