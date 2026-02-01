.PHONY: run db templ sqlc tailwind

run: db templ sqlc tailwind
	go run .

db:
	dbmate dump

templ:
	templ generate

sqlc:
	sqlc generate

tailwind:
	tailwindcss -i tailwind.css -o css/tailwind.min.css
