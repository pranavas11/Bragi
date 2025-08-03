from keras.models import load_model
import sys
import numpy as np

model = load_model("bragi90.h5")

def split(arr, sublength):
    newarr = []
    for i in range(int(sublength), len(arr), int(sublength)):
        newarr.append(arr[i-int(sublength):i])
    return newarr

def predict(rate, readWav):
    #timespan = 0.4
    #timeLength = int(rate * timespan) #400 milliseconds
    #segmentedWaves = split(np.array(readWav), timeLength) #np.array_split(readWav, int(len(readWav) / timeLength))
    #segmentedWaves = np.array([segment for segment in segmentedWaves if len(segment) == timeLength])
    #print(segmentedWaves[:5])
    #segmentedWaves = segmentedWaves[:,:,np.newaxis]
    readWav = readWav.reshape(readWav.shape[0], readWav.shape[1], 1)
    #print(segmentedWaves.shape)
    #print(model.predict(np.array([segmentedWaves[4]])))
    for pred in model.predict(readWav):
        print(pred[0])

def getArray():
    arr = []
    while True:
        print(sys.stdin.buffer.read(2))
        quit()
        line = int.from_bytes(sys.stdin.buffer.read(2), byteorder='little', signed=True) 
        arr.append(int(line))
        if len(arr) >= int(0.4*44100):
            predict(44100, np.array([arr[:int(0.4*44100)]])) #for now, I'm expecting 44.1 kHz
            arr = arr[int(0.4*44100):]

getArray() 




