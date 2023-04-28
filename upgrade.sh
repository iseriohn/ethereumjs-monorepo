#!/bin/bash

HARDHAT="$HOME/hardhat/node_modules/@nomicfoundation"

if [ -n "$1" ];
then
  $HARDHAT=$1
fi

cd packages/
for package in ./*
do
  echo ${package}
  cd ${package}/
  rm -r package.json src
  cp "$HARDHAT"/"$package"/package.json ./
  cp -r "$HARDHAT"/"$package"/src ./
  cd ../
done

