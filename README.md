Buddy.Works PullRequest WebHook
===============================

Is a simple Docker container that uses environment variables to start a webhook for pull request close at GitHub.

It will listen to the events on GitHub and than call a specific pipeline at a Buddy.Works project using the payload from GitHub to set the right commit to be used.

The environment variables that are needed to be set are:

Variable        | Description
----------------|-----------------------------------------------------------------------------------
WORKSPAKCE      | The workspace from buddy.works (probaly your username)
PROJECT         | Buddy's project name
PIPELINE_NAME   | Name of the pipeline trat should be run when the pull request is closed
BUDDY_TOKEN     | A access token from Buddy with permissions to run pipelines and manage workspace

