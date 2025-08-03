monitor: monitor.go
	go build

test: monitor
	./gen_random_predictions.sh | ./monitor
