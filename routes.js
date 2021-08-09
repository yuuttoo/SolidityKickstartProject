const routes = require('next-routes')();

routes 
    .add('/campaigns/new', './campaigns/new')
    .add('/campaigns/:address','/campaigns/show') //非固定route
    .add('/campaigns/:address/requests', '/campaigns/requests/index')
    .add('/campaigns/:address/requests/new','/campaigns/requests/new')
module.exports = routes;
