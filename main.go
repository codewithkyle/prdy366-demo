package main

import (
	"context"
	"errors"
	"log/slog"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"
)

func main() {
	mux := http.NewServeMux()

	mux.HandleFunc("/", func(w http.ResponseWriter, r *http.Request){
		w.Write([]byte("OK"))
	})

	// NOTE: static files
	mux.Handle(
		"/css/", 
		http.StripPrefix(
			"/css/", 
			http.FileServer(http.Dir("./css")),
		),
	)
	mux.Handle(
		"/js/", 
		http.StripPrefix(
			"/js/", 
			http.FileServer(http.Dir("./js")),
		),
	)

	server := &http.Server{
		Addr: ":8080",
		Handler: mux,
		ReadTimeout: 5 * time.Second,
		WriteTimeout: 10 * time.Second,
		IdleTimeout: 60 * time.Second,
	}

	errCh := make(chan error, 1)
	go func() {
		slog.Info("Listening on :8080")
		errCh <- server.ListenAndServe()
	}()

	sigCh := make(chan os.Signal, 1)
	signal.Notify(sigCh, os.Interrupt, syscall.SIGTERM)

	select {
		case _ = <-sigCh:
			slog.Info("Shutting down")
		case err := <-errCh:
			if !errors.Is(err, http.ErrServerClosed) {
				slog.Error("Server error", "err", err)
				os.Exit(1)
			}
			slog.Info("Shutting down")
			return
	}

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	if err := server.Shutdown(ctx); err != nil {
		slog.Error("Graceful shutdown failed; forcing closed", "err", err)
		_ = server.Close()
		os.Exit(1)
	}

	slog.Info("Server shutdown complete")
	os.Exit(0)
}
