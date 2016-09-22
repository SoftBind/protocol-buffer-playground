const ProtoBuf = require('protobufjs');
const express = require('express');
const axios = require('axios');

const builder = ProtoBuf.loadProtoFile('./course.proto');
const Course = builder.build('Course');

const app = express();

app.get('/course', (req, res) => {
  axios({
    method: 'get',
    url: 'http://localhost:8080/courses/2',
    headers: { accept: 'application/x-protobuf' },
    responseType: 'arraybuffer',
  })
    .then(response => res.json(Course.decode(response.data)))
    .catch(e => res.send(e.message))
});

const server = app.listen(3000, () => {
  console.log(`Server listening on http://localhost:${server.address().port}`);
});

