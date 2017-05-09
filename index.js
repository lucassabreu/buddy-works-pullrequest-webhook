'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
let app = express();
const headers = { 'Authorization' : 'Bearer ' + process.env.BUDDY_TOKEN };

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post ('/pullrequest', (req, res) => {

    const payload = req.body;
    if (payload.action && payload.pull_request &&
        payload.action == 'closed') {
        console.log(
            'Close the Environment ' +
            payload.pull_request.head.ref +
            ' at point: ' + payload.pull_request.head.sha
        );


        send(
            'GET',
            'https://api.buddy.works/workspaces/' + process.env.WORKSPACE +
                '/projects/' + process.env.PROJECT + '/pipelines',
            headers,
            {}
        ).then((data) => {
            return data.pipelines
                    .filter((item) => { return item.name == process.env.PIPELINE_NAME })
                    .pop()
                    .url + '/executions';
        }).then((url) => {
            return send(
                "POST",
                url,
                headers,
                {
                    to_revision : {
                        revision : payload.pull_request.head.sha,
                    },
                    comment : "automatic..."
                }
            )
        }).then((data) => {
            res.send("Got it !\n");
        });
        return;
    }

    return res.send("I don't know it !\n");
});

const port = 8080;
app.listen(port, () => {
    console.log('webhook at :' + port);
});

function send (method, url, headers, data) {
    return new Promise ((fulfill, reject) => {
        request(
            {
                method: method,
                url: url,
                headers: headers,
                json: data
            },
            (error, http, body) => {
                if (error) {
                    return reject(error);
                }

                fulfill(body)
            }
        );
    });
}
