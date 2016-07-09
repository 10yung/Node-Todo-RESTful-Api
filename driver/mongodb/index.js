var configValues = require('../../config/config');  //look for config.json file

module.exports = {

    getDbConnectionString: function(){
        return 'mongodb://' + configValues.username + ':' + configValues.pwd + '@ds017205.mlab.com:17205/nodetodosample';
    }

}
