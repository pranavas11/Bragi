/*
import React, { useState, useEffect, useRef } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import './bragi.css';

// Register Chart.js components
Chart.register(...registerables);

const Bragi = () => {
    const [audioURL, setAudioURL] = useState(null);
    const [predictions, setPredictions] = useState([]);  // Store predictions
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [
            {
                label: 'Predictions',
                data: [],
                backgroundColor: 'rgba(75,192,192,0.4)',
                borderColor: 'rgba(75,192,192,1)',
                fill: false,
            },
        ],
    });
    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [model, setModel] = useState(null);
    const predictionIndexRef = useRef(0); // Keep track of the current prediction index
    const [isGraphVisible, setIsGraphVisible] = useState(false); // Control when to display the graph

    // Function to decode audio file and predict ads
    const decodeAudioFile = (buffer) => {
        const audio = new Float32Array(buffer.length * 2);
        let audioLeft = buffer.getChannelData(0);
        let audioRight = buffer.getChannelData(1);

        for (let i = 0; i < buffer.length; i++) {
            audio[i * 2] = audioLeft[i];
            audio[i * 2 + 1] = audioRight[i];
        }

        const intAudio = new Int16Array(audio.length);
        for (let i = 0; i < audio.length; i++) {
            const range = Math.max(-1, Math.min(1, audio[i]));
            intAudio[i] = Math.round(range < 0 ? range * 0x8000 : range * 0x7FFF);
        }

        const timeLength = 17640;
        let sample = new Int32Array(timeLength);
        let newPredictions = [];

        let i = 0;
        let j = 0;
        while (i < intAudio.length) {
            j = i;
            for (; i < j + timeLength && i < intAudio.length; i++) {
                sample[i - j] = intAudio[i];
            }

            newPredictions.push(1 - model.predict(tf.tensor(sample).reshape([1, timeLength, 1])).dataSync()[0]);
        }

        setPredictions(newPredictions);
    };

    const handleFileInput = (event) => {
        const file = event.target.files[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setAudioURL(url);
            const reader = new FileReader();
            const audioContext = new AudioContext();
            reader.onload = function (event) {
                const arrayBuffer = event.target.result;
                audioContext.decodeAudioData(arrayBuffer, decodeAudioFile);
            };
            reader.readAsArrayBuffer(file);
        }
    };

    // Real-time update of the chart while audio plays
    const updateChart = () => {
        const currentIndex = predictionIndexRef.current;
        const currentTime = audioRef.current.currentTime;

        // Map the current audio time to the prediction index
        const mappedIndex = Math.floor(currentTime * (predictions.length / audioRef.current.duration));

        if (mappedIndex < predictions.length) {
            const newLabels = Array.from({ length: mappedIndex + 1 }, (_, i) => (i * 200) / 1000 + 's');
            const newData = predictions.slice(0, mappedIndex + 1);

            setChartData({
                labels: newLabels,
                datasets: [
                    {
                        label: 'Predictions',
                        data: newData,
                        backgroundColor: 'rgba(75,192,192,0.4)',
                        borderColor: 'rgba(75,192,192,1)',
                        fill: false,
                    },
                ],
            });

            predictionIndexRef.current = mappedIndex; // Update the index for the next frame

            if (isPlaying) {
                requestAnimationFrame(updateChart); // Call update for the next frame if playing
            }
        }
    };

    // Start graph plotting when audio starts playing
    const handlePlay = () => {
        setIsPlaying(true);
        setIsGraphVisible(true);  // Show the graph when audio starts playing
        predictionIndexRef.current = 0; // Reset the index when playing starts
        requestAnimationFrame(updateChart); // Start updating the chart
    };

    // Pause graph plotting when audio is paused or stopped
    const handlePause = () => {
        setIsPlaying(false);
    };

    // Load the model when the component mounts
    useEffect(() => {
        const loadModel = async () => {
            const loadedModel = await tf.loadLayersModel('https://raw.githubusercontent.com/sysuresh/neuralnet/master/model.json');
            setModel(loadedModel);
        };
        loadModel();
    }, []);

    // Prevent rendering until the model is loaded
    if (!model) {
        return <div>Loading model...</div>;
    }

    return (
        <div className='bragi-container'>
            <h3 style={{ color: 'blue' }}>BRAGi</h3>
            <div className='bragi-content'>
                <div className='file-upload'>
                    <input type='file' accept='.mp3,.mp4,.wav,.avi,.mov,.m4a,.m4v,.mpg,.mpeg' onChange={handleFileInput} />
                    {audioURL && (
                        <div className='audio-player'>
                            <audio
                                ref={audioRef}
                                controls
                                src={audioURL}
                                onPlay={handlePlay}
                                onPause={handlePause}
                                onEnded={handlePause}  // Pause when the audio ends
                            />
                        </div>
                    )}
                </div>
                {isGraphVisible && (
                    <div className='chart-container'>
                        <Line
                            data={chartData}
                            options={{
                                responsive: true,
                                maintainAspectRatio: false,
                                scales: {
                                    x: {
                                        title: {
                                            display: true,
                                            text: 'Time (s)',
                                        },
                                    },
                                    y: {
                                        min: 0,
                                        max: 1,  // Set maximum value for y-axis
                                        title: {
                                            display: true,
                                            text: 'Predictions',
                                        },
                                    },
                                },
                                plugins: {
                                    title: {
                                        display: true,
                                        text: 'Time vs. Ad Predictions',
                                    },
                                    tooltip: {
                                        callbacks: {
                                            label: function (context) {
                                                return `Prediction: ${context.parsed.y.toFixed(5)}`;
                                            },
                                        },
                                    },
                                },
                            }}
                        />
                    </div>
                )}
            </div>
        </div>
    );
}

export default Bragi;
*/




import React, { useState, useEffect, useRef } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import './bragi.css';

// Register Chart.js components
Chart.register(...registerables);

const Bragi = () => {
    const [audioURL, setAudioURL] = useState(null);
    const [predictions, setPredictions] = useState([]);  // Store predictions
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [
            {
                label: 'Predictions',
                data: [],
                backgroundColor: 'rgba(75,192,192,0.4)',
                borderColor: 'rgba(75,192,192,1)',
                fill: false,
            },
        ],
    });
    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [model, setModel] = useState(null);
    const predictionIndexRef = useRef(0); // Keep track of the current prediction index
    const [isGraphVisible, setIsGraphVisible] = useState(false); // Control when to display the graph

    // Function to decode audio file and predict ads
    const decodeAudioFile = (buffer) => {
        const audio = new Float32Array(buffer.length * 2);
        let audioLeft = buffer.getChannelData(0);
        let audioRight = buffer.getChannelData(1);

        for (let i = 0; i < buffer.length; i++) {
            audio[i * 2] = audioLeft[i];
            audio[i * 2 + 1] = audioRight[i];
        }

        const intAudio = new Int16Array(audio.length);
        for (let i = 0; i < audio.length; i++) {
            const range = Math.max(-1, Math.min(1, audio[i]));
            intAudio[i] = Math.round(range < 0 ? range * 0x8000 : range * 0x7FFF);
        }

        const timeLength = 17640;
        let sample = new Int32Array(timeLength);
        let newPredictions = [];

        let i = 0;
        let j = 0;
        while (i < intAudio.length) {
            j = i;
            for (; i < j + timeLength && i < intAudio.length; i++) {
                sample[i - j] = intAudio[i];
            }

            newPredictions.push(1 - model.predict(tf.tensor(sample).reshape([1, timeLength, 1])).dataSync()[0]);
        }

        setPredictions(newPredictions);
    };

    const handleFileInput = (event) => {
        const file = event.target.files[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setAudioURL(url);
            const reader = new FileReader();
            const audioContext = new AudioContext();
            reader.onload = function (event) {
                const arrayBuffer = event.target.result;
                audioContext.decodeAudioData(arrayBuffer, decodeAudioFile);
            };
            reader.readAsArrayBuffer(file);
        }
    };

    // Real-time update of the chart while audio plays
    const updateChart = () => {
        const currentTime = audioRef.current.currentTime;

        // Map the current audio time to the prediction index
        const mappedIndex = Math.floor(currentTime * (predictions.length / audioRef.current.duration));

        if (mappedIndex < predictions.length) {
            const newLabels = Array.from({ length: mappedIndex + 1 }, (_, i) => (i * 200) / 1000 + 's');
            const newData = predictions.slice(0, mappedIndex + 1);

            setChartData({
                labels: newLabels,
                datasets: [
                    {
                        label: 'Predictions',
                        data: newData,
                        backgroundColor: 'rgba(75,192,192,0.4)',
                        borderColor: 'rgba(75,192,192,1)',
                        fill: false,
                    },
                ],
            });

            // Continue updating as the audio plays
            if (isPlaying) {
                requestAnimationFrame(updateChart); // Ensure chart keeps updating
            }
        }
    };

    // Start graph plotting when audio starts playing
    const handlePlay = () => {
        setIsPlaying(true);
        setIsGraphVisible(true);  // Show the graph when audio starts playing
        predictionIndexRef.current = 0; // Reset the index when playing starts
        requestAnimationFrame(updateChart); // Start updating the chart
    };

    // Pause graph plotting when audio is paused or stopped
    const handlePause = () => {
        setIsPlaying(false);
    };

    // Update the chart on each `timeupdate` event
    const handleTimeUpdate = () => {
        if (isPlaying) {
            updateChart(); // Sync chart update with media playback
        }
    };

    // Load the model when the component mounts
    useEffect(() => {
        const loadModel = async () => {
            const loadedModel = await tf.loadLayersModel('https://raw.githubusercontent.com/sysuresh/neuralnet/master/model.json');
            setModel(loadedModel);
        };
        loadModel();
    }, []);

    useEffect(() => {
        // Attach event listeners for audio time updates
        if (audioRef.current) {
            audioRef.current.addEventListener('timeupdate', handleTimeUpdate);
        }

        return () => {
            if (audioRef.current) {
                audioRef.current.removeEventListener('timeupdate', handleTimeUpdate);
            }
        };
    }, [isPlaying, predictions]);

    // Prevent rendering until the model is loaded
    if (!model) {
        return <div>Loading model...</div>;
    }

    return (
        <div className='bragi-container'>
            <h3 style={{ color: 'blue' }}>BRAGi</h3>
            <div className='bragi-content'>
                <div className='file-upload'>
                    <input type='file' accept='.mp3,.mp4,.wav,.avi,.mov,.m4a,.m4v,.mpg,.mpeg' onChange={handleFileInput} />
                    {audioURL && (
                        <div className='audio-player'>
                            <audio
                                ref={audioRef}
                                controls
                                src={audioURL}
                                onPlay={handlePlay}
                                onPause={handlePause}
                                onEnded={handlePause}  // Pause when the audio ends
                            />
                        </div>
                    )}
                </div>
                {isGraphVisible && (
                    <div className='chart-container'>
                        <Line
                            data={chartData}
                            options={{
                                responsive: true,
                                maintainAspectRatio: false,
                                scales: {
                                    x: {
                                        title: {
                                            display: true,
                                            text: 'Time (s)',
                                        },
                                    },
                                    y: {
                                        min: 0,
                                        max: 1,  // Set maximum value for y-axis
                                        title: {
                                            display: true,
                                            text: 'Predictions',
                                        },
                                    },
                                },
                                plugins: {
                                    title: {
                                        display: true,
                                        text: 'Time vs. Ad Predictions',
                                    },
                                    tooltip: {
                                        callbacks: {
                                            label: function (context) {
                                                return `Prediction: ${context.parsed.y.toFixed(5)}`;
                                            },
                                        },
                                    },
                                },
                            }}
                        />
                    </div>
                )}
            </div>
        </div>
    );
}

export default Bragi;