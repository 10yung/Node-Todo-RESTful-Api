var configValues = require('../../config/config');  //look for config.json file

module.exports = {

    getMlabDbConnectionString: function(){
        return 'mongodb://' + configValues.mlab.username + ':' + configValues.mlab.pwd + '@ds017205.mlab.com:17205/nodetodosample';
    },

    getLocalDbConnectionString: function () {
        return 'mongodb://localhost:27017/' + configValues.local.dbname ;
    }

}
