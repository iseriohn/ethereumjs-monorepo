#!/bin/bash

cd packages/
for package in ./*
do
  echo ${package}
  cd ${package}/
  yarn link
  cd ../
done

npm install

