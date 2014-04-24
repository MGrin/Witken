REPORTER=spec
TESTS=$(shell find ./tests -type f -name "*.test.js")

start:
	foreman start

debug:
	@DEBUG=1 foreman start
	
.PHONY: start debug
