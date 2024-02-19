.PHONY: build-development
build-development:
	docker build -t zaphodbrox/api-chat-relatei -f docker/development/Dockerfile .
