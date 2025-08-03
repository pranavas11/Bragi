import h5py
import random
import os

import numpy as np

from sklearn.model_selection import train_test_split
from sklearn.preprocessing import scale
from sklearn.neighbors import KNeighborsClassifier as KNN

from scipy.signal import decimate
from scipy.io import wavfile
from scipy.spatial.distance import euclidean 
from scipy import fftpack

from fastdtw import fastdtw 

from keras import backend as K
from keras.models import Sequential, load_model
from keras.layers import Conv1D, MaxPool1D, GlobalAvgPool1D, Dropout, BatchNormalization, Dense, LSTM, Flatten
from keras.optimizers import Adam
from keras.callbacks import ModelCheckpoint, LearningRateScheduler
from keras.utils import np_utils
from keras.regularizers import l2

def calcVolume(arr):
    return sum([i*i for i in arr])
def calcEnergyBalance(arr):
    f = fftpack.fft(arr)
    freqs = fftpack.fftfreq(len(arr))*44100.0
    totalf = 0.0
    abovecutoff = 0.0
    for freq, mag in zip(freqs, np.abs(f)):
        if freq < 0.0:
            continue
        if freq >= 8000:
            abovecutoff += mag
        totalf += mag
    if totalf:
        return abovecutoff / totalf
    return 0.0
def calcExtremeFrequencies(arr):
    f = fftpack.fft(arr)
    freqs = fftpack.fftfreq(len(arr))*44100.0
    sumfreq = 0.0
    for freq, mag in zip(freqs, np.abs(f)):
        sumfreq += freq*mag
    return 0.0
def split(arr, sublength):
    newarr = []
    for i in range(int(sublength), len(arr), int(sublength)):
        newarr.append(arr[i-int(sublength):i])
    return newarr
if __name__ == "__main__":
    X, y = [], []
    musicDir, adDir = 'music', 'ads'

    print("Reading data...")
    timespan = 0.4
    for filename in os.listdir(musicDir):
        if filename.endswith(".wav"):
            try:
                rate, readWav = wavfile.read(musicDir+'/'+filename)
                readWav = readWav[:,0]
                timeLength = int(rate * timespan) #200 milliseconds
                segmentedWaves = split(readWav, timeLength) #np.array_split(readWav, int(len(readWav) / timeLength))
                segmentedWaves = random.sample([segment for segment in segmentedWaves if len(segment) == timeLength], 68)
                X += segmentedWaves
                y += [[0.0] for i in range(len(segmentedWaves))]
            except Exception:
                print("Error on:", filename, '\n')
    xorig = len(X)
    print(len(X))
    for filename in os.listdir(adDir):
        if filename.endswith(".wav"):
            try:
                rate, readWav = wavfile.read(adDir+'/'+filename)
                readWav = readWav[:,0]
                timeLength = int(rate * timespan) #200 milliseconds
                segmentedWaves = split(readWav, timeLength)
                segmentedWaves = [segment for segment in segmentedWaves if len(segment) == timeLength]
                X += segmentedWaves
                y += [[1.0] for i in range(len(segmentedWaves))]
            except Exception:
                print("Error on:", filename, '\n')
    print(len(X) - xorig)
#0.0 - music
#1.0 - ad
    X = np.array(X)
    y = np.array(y)
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.25)
    #y_train, y_test = y_train.ravel(), y_test.ravel()
    X_train = X_train[:,:, np.newaxis]
    X_test = X_test[:,:, np.newaxis]
    print("Shape:", X_train.shape, y_train.shape)

    model = Sequential()
    model.add(Conv1D(filters=16, kernel_size=9, activation='elu',input_shape = X_train.shape[1:], padding='same'))
    model.add(MaxPool1D(strides=4, padding='same'))
    #model.add(BatchNormalization())
    model.add(Conv1D(filters=32, kernel_size=9, activation='elu', padding='same'))
    model.add(MaxPool1D(strides=4, padding='same'))
    #model.add(BatchNormalization())
    model.add(Conv1D(filters=64, kernel_size=4, activation='elu', padding='same'))
    model.add(MaxPool1D(strides=4, padding='same'))
    #model.add(BatchNormalization())
    model.add(Dropout(0.1))
    model.add(Conv1D(filters=128, kernel_size=4, activation='elu', kernel_regularizer = l2(0.02), padding='same'))
    model.add(MaxPool1D(strides=4, padding='same'))
    #model.add(BatchNormalization())
    model.add(Conv1D(filters=128, kernel_size=4, activation='elu', kernel_regularizer = l2(0.02), padding='same'))
    model.add(MaxPool1D(strides=4, padding='same'))
    #model.add(BatchNormalization())
    model.add(Conv1D(filters=128, kernel_size=4, activation='elu', kernel_regularizer = l2(0.02), padding='same'))
    model.add(MaxPool1D(strides=4, padding='same'))
    #model.add(BatchNormalization())
    model.add(Conv1D(filters=128, kernel_size=4, activation='elu', kernel_regularizer = l2(0.02), padding='same'))
    model.add(MaxPool1D(strides=4, padding='same'))
    #model.add(BatchNormalization())
    model.add(Dropout(0.1))
    model.add(Conv1D(filters=128, kernel_size=4, activation='elu', kernel_regularizer = l2(0.05), padding='same'))
    model.add(MaxPool1D(strides=4, padding='same'))
    model.add(Conv1D(filters=128, kernel_size=4, activation='elu', kernel_regularizer = l2(0.05), padding='same'))
    model.add(MaxPool1D(strides=4, padding='same'))
    #model.add(BatchNormalization())
    model.add(Conv1D(filters=128, kernel_size=4, activation='elu', kernel_regularizer = l2(0.05), padding='same'))
    model.add(MaxPool1D(strides=4, padding='same'))
    #model.add(BatchNormalization())
    model.add(Conv1D(filters=128, kernel_size=4, activation='elu', kernel_regularizer = l2(0.05), padding='same'))
    model.add(MaxPool1D(strides=4, padding='same'))
    #model.add(BatchNormalization())
    model.add(Flatten())
    model.add(Dropout(0.5))
    #model.add(LSTM(50, input_shape = X_train.shape[1:]))
    model.add(Dense(5))
    model.add(Dense(1, activation='sigmoid'))

    model.compile(optimizer='adam', loss='binary_crossentropy', metrics=['accuracy'])
                                                                                                        
    model.fit(x=X_train,y=y_train,batch_size=256,epochs=1000,verbose=2,validation_data=(X_test,y_test), callbacks=[ModelCheckpoint("bragi.h5", monitor='val_acc', verbose = 2, save_best_only=True)])   
#    hist = model.fit_generator(get_batch(X_train, y_train, 8),epochs=40, steps_per_epoch=1000,validation_data=(X_test, y_test), callbacks=[ModelCheckpoint("bragineur.hdf5", monitor="val_acc", save_best_only=True), LearningRateScheduler(lambda epoch: 1e-2 * 0.8**epoch)],verbose=2)
