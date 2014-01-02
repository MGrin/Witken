REPORTER=spec
TESTS=$(shell find ./tests -type f -name "*.js")

test:
	mocha --require should --reporter $(REPORTER) $(TESTS)

test-cov: clean app-cov
	@APP_COV=1 $(MAKE) --quiet test REPORTER=html-cov > coverage.html

app-cov:
	@jscoverage witken cov

clean:
	rm -rf cov

.PHONY: test
