'use strict';

jasmine.testConfiguration = {
    runTransform : (process.env.RUN_TRANSFORM) ? (process.env.RUN_TRANSFORM === 'true') : true
};