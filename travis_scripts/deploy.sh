#!/bin/bash
set -x
ssh-keyscan ludobermejo.es >> ~/.ssh/known_hosts

if [ $TRAVIS_BRANCH == 'master' ] ; then
    # Initialize a new git repo in _site, and push it to our server.
    cd _site
    git init

    git remote add deploy "deploy@ludobermejo.es:/var/www/remotes/yeelight-server"
    git config user.name "Travis CI"
    git config user.email "ludobermejo+travisCI@gmail.com"
    rm -rf .gitignore
    git add .
    git commit -m "Deploy"
    git push --force deploy master
else
    echo "Not deploying, since this branch isn't master."
fi
