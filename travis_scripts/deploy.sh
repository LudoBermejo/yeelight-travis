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
    rm .gitignore
    rm .travis.yml
    rm -rf travis_scripts
    git add --all
    git commit -m "Deploy"
    git push --force deploy master
    ls -la
else
    echo "Not deploying, since this branch isn't master."
fi
