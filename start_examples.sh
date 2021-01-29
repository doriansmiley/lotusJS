#!/bin/bash

WORKING_DIR="$(pwd)"

if [[ "$1" == "dev" ]]; then

  echo "Initializing environment"
  npm install

  sudo npm link

  cd $WORKING_DIR/example
  npm install
  npm link lotusjs-components
fi

if [[ "$1" == "release" ]]; then
  echo "removing sym links"
  npm unlink
  npm install
  cd $WORKING_DIR/example
  npm unlink --no-save lotusjs-components
  rm -rf node_modules/lotusjs-components
  npm install
fi
echo "starting example server at ${WORKING_DIR/example}"
cd $WORKING_DIR/example
node server
