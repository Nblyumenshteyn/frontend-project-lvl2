install:
	npm ci
lint:
	npx eslint --fix .
test:
	npx jest
coverage:
	npm test -- --coverage --coverageProvider=v8
gendiff -h:


