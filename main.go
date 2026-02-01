package main

import (
	"context"
	"os"
	"prdy366/demo/views"
)

func main() {
	view := views.Hello("mom")
	view.Render(context.Background(), os.Stdout)
}
