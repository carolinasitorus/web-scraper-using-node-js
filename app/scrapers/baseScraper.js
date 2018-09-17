var request = require('sync-request');

class BaseScraper {
	getSyncRequest(url, encoding = 'utf8') {
	    try {
	        var res = request('GET', url);
	        return res.getBody(encoding);
	    } catch (error) {
	        return 0;
	    }
	}
}

module.exports = BaseScraper;