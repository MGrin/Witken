REPORTER=spec
TESTS=$(shell find ./tests -type f -name "*.test.js")

start:
	foreman start

test:
	mocha --require should --reporter $(REPORTER) $(TESTS)

routes_test:
	mocha --require should --reporter $(REPORTER) ./tests/routes.test.js

examen_test:
	mocha --require should --reporter $(REPORTER) ./tests/examen.test.js

user_test:
	mocha --require should --reporter $(REPORTER) ./tests/users.test.js

cov: clean app-cov
	@APP_COV=1 $(MAKE) --quiet test REPORTER=html-cov > coverage.html

doc: clean
	$(MAKE) --quiet test REPORTER=doc > documentation.html

app-cov:
	@jscoverage witken cov

clean:
	rm -rf cov

.PHONY: test routes_test examen_test user_test
