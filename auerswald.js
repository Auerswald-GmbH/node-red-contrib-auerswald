module.exports = function(RED) {

    const request = require('request')
    let apiRequests = require('./api-requests.js')
    let uri = ''
    let sessions = []
    let initOptions = {
        method: 'GET',
        rejectUnauthorized: false,
        requestCert: true,
        agent: false,
        headers: {
            'Cookie': '',
            'Connection': 'keep-alive',
            'version': 6
        }
    }

    RED.httpAdmin.get('/auerswald/requestlist', RED.auth.needsPermission('auerswald.read'),
            function(adminRequest, adminResponse) {
        apiRequests.info.version = initOptions.headers.version
        adminResponse.json(apiRequests)
    })

    RED.httpAdmin.get('/auerswald/request', RED.auth.needsPermission('auerswald.read'),
            function(adminRequest, adminResponse) {
        let options = Object.assign({}, initOptions)
        options.uri = uri + '/' + adminRequest.query.apiRequest
        request(options, function(apiError, apiResponse, apiBody) {
            if (apiError) {
                adminResponse.end(JSON.stringify(apiError))
            } else if (apiResponse && apiResponse.statusCode === 200) {
                adminResponse.json(apiBody)
            }
        })
    })

    function AuerswaldPbxNode(n) {
        RED.nodes.createNode(this, n)
        this.ip = n.ip
        this.port = n.port
        this.user = n.user
        this.pass = n.pass
    }
    RED.nodes.registerType('auerswald-pbx-connect', AuerswaldPbxNode, {
        credentials: {
            user: {type: 'text'},
            pass: {type: 'password'}
        }
    })


    function AuerswaldAPI(n) {
        RED.nodes.createNode(this, n)
        this.pbx = RED.nodes.getNode(n.pbx)
        this.request = n.request
        this.params = [n.param0, n.param1, n.param2, n.param3, n.param4, n.param5, n.param6]
        this.sendDebugInfo = n.sendDebugInfo || false
        let node = this
        node.on('input', function(msg) {
            let apiRequest =  node.request || 'app_about'
            let debugInfo = {}
            const data = apiRequests.requests[apiRequest]
            let paramString = ''
            let paramError = ''
            // get request from properties - can be overwritten by msg.topic.request
            if (msg.topic && msg.topic.request && msg.topic.request.length && node.request === '-1') {
                if (msg.topic.request[0] === '/') {
                    msg.topic.request = msg.topic.request.substr(1, msg.topic.request.length)
                }
                apiRequest = msg.topic.request
            }
            // get parameter from properties - can be overwritten by msg.topic[name]
            if (data && data.params) {
                let hide = []
                for (let p = 0; p < data.params.length; p++) {
                    // overwrite request key if specified in options.data
                    let key = data.params[p].name
                    if (data.params[p].options && data.params[p].options.data) {
                        const oData = data.params[p].options.data
                        for (let o = 0; o < oData.length; o++) {
                            if (oData[o].value === node.params[p]) {
                                if (oData[o].key) {
                                    key = oData[o].key
                                }
                                if (oData[o].hide && typeof(oData[o].hide) === 'string') {
                                    hide.push(oData[o].hide)
                                } else if (oData[o].hide && typeof(oData[o].hide) === 'object') {
                                    hide = oData[o].hide
                                }
                            }
                        }
                    }
                    // helpParam is only internally used
                    if (data.params[p].name === 'helpParam') {
                        continue
                    }
                    // hidden parameters dont need to be send
                    if (hide.indexOf('param' + p) != -1) {
                        continue
                    }
                    // leave existing value intact - ignore value
                    if (parseInt(node.params[p], 10) === -2) {
                        continue
                    }
                    paramString += (paramString.length ? '&' : '?') + key + '='
                    const topic = msg.topic ? msg.topic[key] : null
                    // if select and option != use msg.topic.x
                    let hasValue = data.params[p].options && node.params[p] !== '-1'
                    // or if input and value
                    hasValue |=  !data.params[p].options && node.params[p].length
                    if (topic && !hasValue) {
                        paramString += topic
                    } else if (data.params[p].required && !hasValue) {
                        paramError += (paramError.length ? ', ' : ' ') + data.params[p].name
                    } else {
                        paramString += node.params[p]
                    }
                }
            }
            // init request
            node.status({fill:'blue', shape: 'dot', text: '/' + apiRequest})
            uri = 'https://' + node.pbx.ip
            if (node.pbx.port !== '443') {
                uri += ':' + node.pbx.port
            }
            debugInfo.uri = uri
            debugInfo.request = '/' + apiRequest
            let options = Object.assign({}, initOptions)
            options.uri = uri + '/' + apiRequest + paramString
            options.auth = {
                user: node.pbx.credentials.user,
                pass: node.pbx.credentials.pass,
                sendImmediately: false
            }
            // find session cookie for requesting user@ip
            const session = sessions.find(function(s){
                return s.user === node.pbx.credentials.user + '@' + node.pbx.ip
            })
            if (session) {
                options.headers.Cookie = session.cookie
            }
            debugInfo.cookie = session ? session.cookie.split('=')[1] : 'no previous session found'
            // request treats response body as string and converts to utf-8 if encoding is not null
            if (apiRequest === 'app_get_msg') {
                options.encoding = null
            }
            request(options, function(error, res, body) {
                // add parameter if available
                if (paramString.length) {
                    debugInfo.parameter = paramString
                }
                if (paramError.length) {
                    debugInfo.configError = 'Missing value(s) for ' + paramError
                }
                debugInfo.version = initOptions.headers.version
                let statusColor = 'red'
                if (!error && res && res.statusCode === 200) {
                    initOptions.headers.version = parseInt(res.headers['x-appversion'], 10)
                    if (res.headers['set-cookie'] && res.headers['set-cookie'][0]) {
                        const sessionRegEx = /AUERSessionID(\d{10,})=([^;]*);/
                        const match = sessionRegEx.exec(res.headers['set-cookie'][0]);
                        const cookie = 'AUERSessionID' + match[1] + '=' + match[2]
                        const session = sessions.find(function(s){
                            return s.user === node.pbx.credentials.user + '@' + node.pbx.ip
                        })
                        if (!session && cookie) {
                            const user = node.pbx.credentials.user + '@' + node.pbx.ip
                            sessions.push({ user: user, cookie: cookie})
                        }
                    }
                    if (apiRequest !== 'app_get_msg') {
                        body = JSON.parse(body) || {'successful': false}
                        // yellow state if action rejected by server
                        statusColor = (body.successful === false) ? 'yellow' : 'green'
                        const output = {'payload': body}
                        if (node.sendDebugInfo) {
                            output.debug = debugInfo
                        }
                        node.send([output, null])
                    } else {
                        statusColor = 'green'
                        node.send([null, {'payload': body}])
                    }
                } else if (!error && res) {
                    debugInfo.error = res.statusCode
                } else {
                    debugInfo.error = error
                }
                node.status({fill: statusColor, shape: 'dot', text: '/' + apiRequest})
            })
        })
    }
    RED.nodes.registerType('auerswald', AuerswaldAPI)
}
