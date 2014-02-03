REPORTER=spec
TESTS=$(shell find ./tests -type f -name "*.test.js")

start:
	foreman start

test:
	mocha --require should --reporter $(REPORTER) $(TESTS)

routes:
	mocha --required should --reporter $(REPORTER) tests/routes.test.js

cov: clean app-cov
	@APP_COV=1 $(MAKE) --quiet test REPORTER=html-cov > coverage.html

app-cov:
	@jscoverage witken cov

clean:
	rm -rf cov

.PHONY: start
