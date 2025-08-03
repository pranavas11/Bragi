import React from 'react';
import './intro.css';

const Intro = () => {
    return (
        <div className='intro-container'>
            <h1 style={{color: '#00d1b2'}}>Welcome to BRAGi!</h1>
            <h2>Your real-time ad recognition solution for audio and video streams.</h2>

            <br></br>

            <h3>What is BRAGi?</h3>
            <p>
                Bragi is an innovative web application designed to detect advertisements within audio and video streams in real-time. Using advanced machine learning models, Bragi identifies ads with high accuracy by analyzing input files such as MP3 and MP4 audio or video streams. The app helps users distinguish between music and ads by plotting prediction versus time graphs for any uploaded file, offering seamless and automated ad recognition.
            </p>
            <p>
                Bragi also includes future enhancements like an extension that integrates with popular platforms such as Spotify and YouTube. This extension will automatically control volume levels: lowering the volume when an ad is detected and raising it again for music or other content, ensuring an uninterrupted and enjoyable listening experience.
            </p>

            <br></br>

            <h3>How does BRAGi work?</h3>
            <p>
                Bragi leverages a deep learning model trained using convolutional neural networks (CNNs) to classify audio segments. Each audio stream is broken down into segments of 200 milliseconds, which are analyzed to predict whether they contain music or advertisements. The system then generates a real-time graph to show these predictions over time.
            </p>

            <br></br>

            <h3>What are the key features of BRAGi?</h3>
            <p>
                Bragi’s core functionality lies in its real-time ad detection capabilities, but it also features volume control based on detection, graph-based visualizations for prediction accuracy, and support for a wide variety of audio and video formats. Users can upload files or capture live streams for analysis. The integration of ALSA loopback devices on Linux enables simultaneous audio playback and capture, providing a streamlined detection pipeline.
            </p>

            <br></br>

            <h3>Can BRAGi be integrated with other platforms?</h3>
            <p>
                Yes! One of Bragi’s future goals is to develop browser extensions for Spotify, YouTube, and other platforms. These extensions will allow for direct integration, automatically controlling the volume and detecting ads without user input. This feature ensures that users enjoy an uninterrupted experience without constantly adjusting the volume.
            </p>

            <br></br>

            <h3>What makes BRAGi unique?</h3>
            <p>
                Unlike traditional ad-blockers or content muting systems, Bragi focuses on real-time audio and video stream analysis using machine learning. Its accuracy is derived from the use of convolutional neural networks, and the system’s ability to analyze audio at 200ms intervals makes it both highly responsive and adaptable to different content types.
            </p>

            <br></br>

            <h3>Why should I use BRAGi?</h3>
            <p>
                If you’re tired of being interrupted by ads while listening to music or watching videos, Bragi is the perfect solution. By automatically detecting and muting ads, you can focus on the content you love without distractions. Plus, with plans to integrate this functionality into popular platforms, Bragi ensures that users have a hassle-free experience.
            </p>

            <br></br>

            <h3>How should I use BRAGi?</h3>
            <p>
                Simply drag and drop your audio file (.mp3) to see Bragi in action live!
            </p>
        </div>
    )
}

export default Intro;