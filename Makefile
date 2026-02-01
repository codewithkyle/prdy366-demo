.PHONY: run db templ sqlc

run: db templ sqlc
	go run .

db:
	dbmate dump

templ:
	templ generate

sqlc:
	sqlc generate
