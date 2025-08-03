document.getElementById("upload").addEventListener('change', readFile);

function readFile(event)
{
    var input = event.target;
    var audioContext = new AudioContext();

    var reader = new FileReader();
    reader.onload = function(){
        var arrayBuffer = reader.result; audioContext.decodeAudioData(arrayBuffer, decode);
    };
    reader.readAsArrayBuffer(input.files[0]);
}
function decode(d) 
{
    var audio = new Float32Array(d.length*2);
    var audioLeft = new Float32Array(d.length);
    var audioRight = new Float32Array(d.length);
    audioLeft = d.getChannelData(0);
    audioRight = d.getChannelData(1); 
    for (var i = 0; i < d.length; i++)
    {
        audio[i*2] = audioLeft[i];
        audio[i*2+1] = audioRight[i];
    }
    var intAudio= new Int16Array(audio.length);
    for (var i = 0; i < audio.length; i++)
    {
        var range = Math.max(-1, Math.min(1, audio[i]));
        intAudio[i] = Math.round(range < 0 ? range * 0x8000 : range * 0x7FFF);
    }
    var i = 0;
    var j = 0;
    var predidx = 0;
    const timeLength = 17640;
    var sample = new Int32Array(timeLength);
    var predictions = new Float32Array(Math.floor(intAudio.length/timeLength));
    console.log("starting");
    tf.loadLayersModel('https://raw.githubusercontent.com/sysuresh/neuralnet/master/model.json').then(model => {
        while (i < intAudio.length && predidx < predictions.length)
        {
            j = i;
            for (;i < j+timeLength; i++)
            {
                sample[i-j] = intAudio[i];
            }
            predictions[predidx] = (1 - model.predict(tf.tensor(sample).reshape([1, timeLength, 1])).dataSync()[0]);
            console.log(predictions[predidx]);
            predidx++;
        }

    });
    return predictions;
}

