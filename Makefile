MOCHA = ./node_modules/.bin/mocha
REPORTER = dot

# tests dir
TESTS_SERVER = ./serverTest/

test-server:
	$(MOCHA) -r should -t 5000 --reporter $(REPORTER) $(TESTS_SERVER)

readme:
	make test-server -s REPORTER=markdown | cat header.md - > readme.md

.PHONY: test-server readme