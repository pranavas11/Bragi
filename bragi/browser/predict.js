function predict(samplefloat) 
{
    const timeLength = 17640;
    if (samplefloat.length != timeLength)
        return -1;
    console.log("starting");
    var prediction;
    var sample = new Int16Array(samplefloat.length);
    for (var i = 0; i < sample.length; i++)
    {
        var clipped = Math.max(-1, Math.min(1, samplefloat[i]));
        sample[i] = Math.round(clipped < 0 ? clipped * 0x8000 : clipped * 0x7FFF);
    }

    tf.loadLayersModel('https://raw.githubusercontent.com/sysuresh/neuralnet/master/model.json').then(model => 
    {
        prediction = (1 - model.predict(tf.tensor(sample).reshape([1, timeLength, 1])).dataSync()[0]);
    });
    return prediction;
}

