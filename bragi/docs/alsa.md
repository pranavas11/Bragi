# ALSA

The easiest approach to recording all audio from Linux is to use ALSA Loopback
devices.

ALSA Loopback devices are created when you load the ALSA kernel module
`snd-aloop`:

    # modprobe snd-aloop

You will now see a new virtual card with two devices, each representing one end
of the loopback device:

```
$ aplay -l
**** List of PLAYBACK Hardware Devices ****
card 0: SB [HDA ATI SB], device 0: ALC892 Analog [ALC892 Analog]
  Subdevices: 1/1
  Subdevice #0: subdevice #0
card 0: SB [HDA ATI SB], device 1: ALC892 Digital [ALC892 Digital]
  Subdevices: 1/1
  Subdevice #0: subdevice #0
card 1: HDMI [HDA ATI HDMI], device 3: HDMI 0 [HDMI 0]
  Subdevices: 1/1
  Subdevice #0: subdevice #0
card 2: Loopback [Loopback], device 0: Loopback PCM [Loopback PCM]
  Subdevices: 8/8
  Subdevice #0: subdevice #0
  Subdevice #1: subdevice #1
  Subdevice #2: subdevice #2
  Subdevice #3: subdevice #3
  Subdevice #4: subdevice #4
  Subdevice #5: subdevice #5
  Subdevice #6: subdevice #6
  Subdevice #7: subdevice #7
card 2: Loopback [Loopback], device 1: Loopback PCM [Loopback PCM]
  Subdevices: 8/8
  Subdevice #0: subdevice #0
  Subdevice #1: subdevice #1
  Subdevice #2: subdevice #2
  Subdevice #3: subdevice #3
  Subdevice #4: subdevice #4
  Subdevice #5: subdevice #5
  Subdevice #6: subdevice #6
  Subdevice #7: subdevice #7
```

If you use Loopback device 0 subdevice 0 ("hw:2,0,0" in ALSA's device naming
scheme) for playback, then you can use Loopback device 1 subdevice 0
("hw:2,1,0") for capture.

For example, here's how you can hexdump audio being sent to your loopback
device:
    
    $ aplay -D hw:2,0,0 test.wav
    $ arecord -D hw:2,1,0 -f cd | hexdump

## Simultaneous playback to speakers and capture for analysis

I tried using `alsaloop` command to loop audio from Loopback to HDMI but there
are a bunch of underruns:

    alsaloop -C hw:Loopback,1,0 -P plughw:HDMI,3 --rate=44100

The best approach is to use the "multi" plugin in ~/.asound.rc:

```
pcm.splitter {
    type plug
    slave.pcm {
        type multi
        slaves {
            a { pcm "hw:HDMI,3" channels 2 }
            b { pcm "hw:Loopback,0,0" channels 2 }
        }
        bindings [
            { slave a channel 0 }
            { slave a channel 1 }
            { slave b channel 0 }
            { slave b channel 1 }
        ]
    }
    ttable [
        [ 1 0 1 0 ]
        [ 0 1 0 1 ]
    ]
}

pcm.!default {
    type plug
    slave.pcm "splitter"
}
```

## References

- [ALSA Official Docs](http://www.alsa-project.org/alsa-doc/alsa-lib/pcm.html)
- http://www.alsa-project.org/main/index.php/Matrix:Module-aloop
- https://github.com/opensrc/alsa/blob/master/lib/md/Jack_and_Loopback_device_as_Alsa-to-Jack_bridge.md
- http://soundfile.sapp.org/doc/WaveFormat/
- http://www.volkerschatz.com/noise/alsa.html
