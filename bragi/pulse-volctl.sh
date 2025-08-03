#!/bin/bash

#
# Simple PulseAudio volume controller using pactl.
#
# stdin is re-written to stdout for extending the pipeline.
#

SINK=0 # PulseAudio sink to control

while read -r prediction
do
  volint=$(echo "$prediction * 100" | bc)
  vol=${volint%.*}
  [ -z $vol ] && vol=0
  #echo "$prediction -> $vol%"
  pactl set-sink-volume $SINK $vol%
  echo $prediction
done
