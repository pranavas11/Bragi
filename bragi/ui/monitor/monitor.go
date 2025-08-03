package main

import (
        "log"
        "fmt"
        ui "github.com/gizak/termui/v3"
        "github.com/gizak/termui/v3/widgets"
)

func main() {

        if err := ui.Init(); err != nil {
                log.Fatalf("failed to initialize termui: %v", err)
        }
        defer ui.Close()

        predChart := widgets.NewPlot()
        predChart.Title = "Bragi Predictions"
        predChart.SetRect(0, 0, 80, 15)
        predChart.LineColors[0] = ui.ColorBlue
        predChart.Data = make([][]float64, 1)
        predChart.Data[0] = make([]float64, 70)

        classGauge := widgets.NewGauge()
        classGauge.Title = "Music / Ads Classification"
        classGauge.SetRect(0, 20, 80, 23)

        ui.Render(predChart, classGauge)

        uiEvents := ui.PollEvents()

        stdin := make(chan float64)
        go func() {
                var prediction float64
                for {
                        _, err := fmt.Scanf("%f\n", &prediction)
                        if err != nil {
                                log.Printf("failed to scanf: %v", err)
                        }
                        stdin <- prediction
                }
        }()

        data := predChart.Data[0]
        for {
                select {
                case e := <-uiEvents:
                        switch e.ID {
                        case "q", "<C-c>":
                                return
                        }
                case prediction := <-stdin:
                        for i := 0; i < len(data)-1; i++ {
                                data[i] = data[i+1]
                        }
                        data[len(data)-1] = prediction

                        classGauge.Percent = int(prediction * 100)
                        if classGauge.Percent > 50 {
                                classGauge.BarColor = ui.ColorRed
                        } else {
                                classGauge.BarColor = ui.ColorGreen
                        }

                        ui.Render(predChart, classGauge)
                }

        }
}
