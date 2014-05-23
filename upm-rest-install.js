AJS.$.ajax({
    url: '/rest/plugins/1.0/?os_authType=basic',
    type: 'GET',
    headers: {
        Accept: 'application/vnd.atl.plugins.installed+json'
    },
    dataType: 'json',
    username: 'admin',
    password: 'admin',
    success: function (data, status, response) {
        //      console.debug(data);
        var token = response.getResponseHeader('upm-token');
        console.debug(token)

        AJS.$.ajax({
            url: '/rest/plugins/1.0/?token=' + token,
            type: 'POST',
            headers: {
                "Accept": 'application/json',
                    "Content-Type": 'application/vnd.atl.plugins.install.uri+json'
            },
            data: JSON.stringify({
                "pluginUri": "file:///home/botron/amps-standalone/target/jira/home/export/configuration-manager-2.1.0.obr",
                    "pluginName": "Configuration Manager For JIRA"
            }),
            success: function (data, status, response) {
                console.debug('ready');
            }
        });
    }
});



waitUntilEnabled = function() {
    var key = 'com.botronsoft.jira.configurationmanager';
    AJS.$.ajax({
        url: '/rest/plugins/1.0/',
        type: 'GET',
        headers: {
            Accept: 'application/vnd.atl.plugins.installed+json'
        },
        dataType: 'json',        
        success: function (data, status, response) {
		    var keyFound = false;
            AJS.$(data.plugins).each(function (i, e) {
                if (e.key === key) {
				    keyFound = true;
                    if (!e.enabled) {
                        console.debug('Still not enabled. Polling again in 1 second...');
                        setTimeout(function () {
                            waitUntilEnabled();
                        }, 1000);
                    } else {
                        console.debug('Plugin ' + key + ' was enabled');
                    }
					return false;
                }
            });
			if(!keyFound) {
				console.debug('Plugin still not installed. Polling again in 1 second...');
                        setTimeout(function () {
                            waitUntilEnabled();
                        }, 1000);
			}
        }
    });
}
