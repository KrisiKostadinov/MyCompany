const express = require('express');
const config = require('./config/configuration');

require('./config/express')(express, config.PORT);