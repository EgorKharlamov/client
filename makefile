full_restart: down up
	docker compose up -d

down:
	docker compose down && docker image rm client-client && docker system prune -f

up:
	docker compose up -d
