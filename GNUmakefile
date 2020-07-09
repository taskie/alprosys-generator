# variables

MAKEFLAGS := -r
BIN := $(shell npm bin)
DOTENV := $(BIN)/dotenv

# main rules

.PHONY: rebuild

rebuild:
	$(MAKE) clean
	$(MAKE) build

.PHONY: build

build: html css js assets

.PHONY: serve

serve:
	$(DOTENV) -- node scripts/server.js

.PHONY: deploy

deploy:
	$(DOTENV) -- scripts/deploy -n
	$(DOTENV) -- scripts/deploy -i

.PHONY: clean

clean: clean_mk

.PHONY: clean_mk

clean_mk:
	-rm -f files.mk

.PHONY: clobber

clobber: clean
	-rm -rf public/

# files

files.mk: scripts/gen_files_mk.js
	$(DOTENV) -- node $< > $@

include files.mk

DST_HTML := $(patsubst contents/%.html, public/%.html, $(SRC_HTML))
DST_HTML += $(patsubst contents/%.ejs, public/%.html, $(SRC_EJS))

DST_CSS := $(patsubst contents/%.css, public/%.css, $(SRC_CSS))
DST_CSS += $(patsubst contents/%.styl, public/%.css, $(SRC_STYL))

DST_JS := $(patsubst contents/%.js, public/%.js, $(SRC_JS))

DST_ASSETS := $(patsubst contents/%, public/%, $(SRC_ASSETS))

# sub rules

.PHONY: html

html: $(DST_HTML)

.PHONY: css

css: $(DST_CSS)

.PHONY: js

js: $(DST_JS)

.PHONY: assets

assets: $(DST_ASSETS)

# pattern rules

public/%.css: contents/%.styl
	@mkdir -p $(dir $@)
	$(BIN)/stylus --resolve-url $< -o $@

public/%.html: contents/%.ejs
	@mkdir -p $(dir $@)
	$(BIN)/ejs-cli -O '{"file":"$@"}' -f $< > $@
	$(BIN)/html-minifier --collapse-whitespace -o $@ $@

public/%: contents/%
	@mkdir -p $(dir $@)
	cp $< $@
