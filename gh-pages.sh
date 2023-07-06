#!/bin/bash

cd build

git init --initial-branch=main
git add -A
git commit -m 'pages'

git push -f git@github.com:lepelog/zev-view.git main:pages
