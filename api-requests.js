
module.exports = {
    "info": {
        "version": 5
    },
    "static": {
        "days": [
            {"value": "1", "text": "Monday"},
            {"value": "2", "text": "Tuesday"},
            {"value": "4", "text": "Wednesday"},
            {"value": "8", "text": "Thursday"},
            {"value": "16", "text": "Friday"},
            {"value": "32", "text": "Saturday"},
            {"value": "64", "text": "Sunday"},
            {"value": "31", "text": "Monday - Friday"},
            {"value": "96", "text": "Saturday - Sunday"},
            {"value": "127", "text": "Daily"}
        ],
        "onOff": [
            {"value": "0", "text": "Off"},
            {"value": "1", "text": "On"}
        ],
        "yesNo": [
            {"value": "0", "text": "No"},
            {"value": "1", "text": "Yes"}
        ],
        "yesNoIgnore": [
            {"value": "0", "text": "No"},
            {"value": "1", "text": "Yes"},
            {"value": "-2", "text": "Ignore"}
        ]
    },
    "requests": {
        "app_about": {
            "version": 1,
            "access": "none"
        },
        "app_call_list": {
            "version": 1,
            "access": "user"
        },
        "app_gespr_list": {
            "version": 1,
            "access": "user",
            "params": [
                {
                    "name": "offset",
                    "display": "Offset",
                    "placeholder": "Number 1 - ... or msg.topic.offset",
                    "required": false,
                    "regex": "[^0]\\d{1,4}"
                },
                {
                    "name": "limit",
                    "display": "Limit",
                    "placeholder": "Number 1 - ... or msg.topic.limit",
                    "required": false,
                    "regex": "[^0]\\d{1,4}"
                }
            ]
        },
        "app_vmf_box_list": {
            "version": 4,
            "access": "normal"
        },
        "app_vmf_box_state": {
            "version": 4,
            "access": "normal",
            "params": [
                {
                    "name": "boxId",
                    "display": "Box id",
                    "type": "text",
                    "placeholder": "Number 1 - 9999 or msg.topic.boxId",
                    "required": true,
                    "regex": "[^0]\\d{0,3}",
                    "options": {
                        "request": "app_vmf_box_list",
                        "valueField": "id",
                        "textField": ["id", "name"],
                        "pattern": "Id: %s, %s"
                    }
                },
                {
                    "name": "activate",
                    "display": "Active",
                    "type": "text",
                    "placeholder": "Number 0 - 1",
                    "required": true,
                    "regex": "[0-1]{1}",
                    "options": {
                        "static": "yesNo"
                    }
                },
                {
                    "name": "permanent",
                    "display": "Permanent",
                    "type": "text",
                    "placeholder": "Number 0 - 1",
                    "required": false,
                    "regex": "[0-1]{1}",
                    "options": {
                        "static": "yesNo"
                    }
                }
            ]
        },
        "app_vmf_msg_list": {
            "version": 1,
            "access": "normal",
            "params": [
                {
                    "name": "boxType",
                    "display": "Box type",
                    "type": "text",
                    "placeholder": "Number 1 - 2",
                    "required": true,
                    "regex": "[1-2]{1}",
                    "options": {
                        "data": [
                            {"value": "1", "text": "Voice mail"},
                            {"value": "2", "text": "Fax"},
                            {"value": "-2", "text": "All"}

                        ]
                    }
                },
                {
                    "name": "archived",
                    "display": "Archived",
                    "type": "text",
                    "placeholder": "Number 0 - 1",
                    "required": true,
                    "regex": "[0-1]{1}",
                    "options": {
                        "data": [
                            {"value": "0", "text": "No"},
                            {"value": "1", "text": "Yes"},
                            {"value": "-2", "text": "All"}
                        ]
                    }
                }
            ]
        },
        "app_set_msg_state": {
            "version": 1,
            "access": "normal",
            "params": [
                {
                    "name": "boxId",
                    "display": "Box id",
                    "type": "text",
                    "placeholder": "Number 1 - 9999 or msg.topic.boxId",
                    "required": true,
                    "regex": "[^0]\\d{0,3}",
                    "options": {
                        "request": "app_vmf_box_list",
                        "valueField": "id",
                        "textField": ["id", "name"],
                        "pattern": "Id: %s, %s"
                    },
                    "filter": "boxId"
                },
                {
                    "name": "msgId",
                    "display": "Message id",
                    "placeholder": "Number 1 - ... or msg.topic.msgId",
                    "required": true,
                    "regex": "[^0]\\d"
                },
                {
                    "name": "msgStatus",
                    "display": "Message status",
                    "type": "text",
                    "placeholder": "Number 0 - 1",
                    "required": false,
                    "regex": "[0-1]{1}",
                    "options": {
                        "data": [
                            {"value": "0", "text": "old"},
                            {"value": "1", "text": "new"}
                        ]
                    }
                }
            ]
        },
        "app_get_msg": {
            "version": 1,
            "access": "normal",
            "params": [
                {
                    "name": "boxId",
                    "display": "Box id",
                    "type": "text",
                    "placeholder": "Number 0 - 9999 or msg.topic.boxId",
                    "required": true,
                    "regex": "[^0]\\d{0,3}",
                    "options": {
                        "request": "app_vmf_box_list",
                        "valueField": "id",
                        "textField": ["id", "name"],
                        "pattern": "Id: %s, %s"
                    }
                },
                {
                    "name": "msgId",
                    "display": "Message id",
                    "placeholder": "Number 1 - ... or msg.topic.msgId",
                    "required": true,
                    "regex": "[^0]\\d"
                }
            ]
        },
        "app_delete_msg": {
            "version": 1,
            "access": "normal",
            "params": [
                {
                    "name": "boxId",
                    "display": "Box id",
                    "type": "text",
                    "placeholder": "Number 1 - 9999 or msg.topic.boxId",
                    "required": true,
                    "regex": "[^0]\\d{0,3}",
                    "options": {
                        "request": "app_vmf_box_list",
                        "valueField": "id",
                        "textField": ["id", "name"],
                        "pattern": "Id: %s, %s"
                    }
                },
                {
                    "name": "msgId",
                    "display": "Message id",
                    "placeholder": "Number 1 - ... or msg.topic.msgId",
                    "required": true,
                    "regex": "[^0]\\d"
                }
            ]
        },
        "app_weckzeiten_list": {
            "version": 1,
            "access": "user"
        },
        "app_weckzeiten_set": {
            "version": 1,
            "access": "user",
            "params": [
                {
                    "name": "action",
                    "display": "Action",
                    "type": "text",
                    "placeholder": "",
                    "required": true,
                    "options": {
                        "data": [
                            {"value": "0", "text": "Create", "hide": "param1"},
                            {"value": "1", "text": "Modify", "show": "param1"},
                            {"value": "2", "text": "Delete", "show": "param1"}
                        ]
                    }
                },
                {
                    "name": "weckId",
                    "display": "Wake up id",
                    "placeholder": "Number 1 - 9999 or msg.topic.weckId",
                    "required": false,
                    "regex": "[^0]\\d{0,3}",
                    "options": {
                        "request": "app_weckzeiten_list",
                        "valueField": "id",
                        "textField": ["id", "tag", "zeit"],
                        "pattern": "Id: %s, %s, %s",
                        "replaceValue": [null, "days", null]
                    }
                },
                {
                    "name": "zeit",
                    "display": "Wake up time",
                    "placeholder": "time 00:00 - 23:59 or msg.topic.zeit (string)",
                    "required": false,
                    "regex": "(?:\\d|[01]\\d|2[0-3]):[0-5]\\d"
                },
                {
                    "name": "tag",
                    "display": "Day",
                    "type": "select",
                    "placeholder": "",
                    "required": false,
                    "options": {
                        "static": "days"
                    }
                },
                {
                    "name": "immer",
                    "display": "Always",
                    "placeholder": "",
                    "required": false,
                    "options": {
                        "data": [
                            {"value": "", "text": "No"},
                            {"value": "immer", "text": "Yes"}
                        ]
                    }
                },
                {
                    "name": "aktiv",
                    "display": "Active",
                    "placeholder": "",
                    "required": false,
                    "options": {
                        "data": [
                            {"value": "", "text": "No"},
                            {"value": "aktiv", "text": "Yes"}
                        ]
                    }
                }
            ]
        },
        "app_telefonbuch": {
            "version": 2,
            "access": "normal",
            "params": [
                {
                    "name": "catId",
                    "display": "Category id",
                    "type": "text",
                    "placeholder": "Number 1 - ... or msg.topic.catId",
                    "required": true,
                    "regex": "[^0]\\d",
                    "options": {
                        "request": "app_address_categories",
                        "valueField": "id",
                        "textField": ["id", "name"],
                        "pattern": "Id: %s, %s"
                    }
                }
            ]
        },
        "app_address_categories": {
            "version": 3,
            "access": "normal"
        },
        "app_konfig_get": {
            "version": 4,
            "access": "normal",
            "params": [
                {
                    "name": "helpParam",
                    "display": "Modus",
                    "placeholder": "Number 0 - 1",
                    "required": true,
                    "regex": "[0-1]{1}",
                    "options": {
                        "data": [
                            {"value": "0", "text": "Get autoswitch state", "key": "autoswitch"},
                            {"value": "1", "text": "Get config list", "key": "configs"}
                        ]
                    }
                }
            ]
        },
        "app_konfig_set": {
            "version": 4,
            "access": "normal",
            "params": [
                {
                    "name": "helpParam",
                    "display": "Modus",
                    "placeholder": "Number 0 - 1",
                    "required": true,
                    "regex": "[0-1]{1}",
                    "options": {
                        "data": [
                            {"value": "0", "text": "Set autoswitch state", "hide": "param2", "show": "param1"},
                            {"value": "1", "text": "Set config", "hide": "param1", "show": "param2"}
                        ]
                    }
                },
                {
                    "name": "autoswitch",
                    "display": "Autoswitch",
                    "type": "text",
                    "placeholder": "Number 0 - 1",
                    "required": false,
                    "regex": "[0-1]{1}",
                    "options": {
                        "static": "onOff"
                    }
                },
                {
                    "name": "configId",
                    "display": "Configuration id",
                    "type": "text",
                    "placeholder": "Number 1 - 9999",
                    "required": false,
                    "regex": "[^0]\\d{0,3}",
                    "options": {
                        "request": "app_konfig_get",
                        "valueField": "id",
                        "textField": ["id", "bezeich"],
                        "pattern": "Id: %s, %s"
                    }
                }
            ]
        },
        "app_vmf_mem_state": {
            "version": 1,
            "access": "normal"
        },
        "app_amt_list": {
            "version": 1,
            "access": "normal"
        },
        "app_ext_ports_status": {
            "version": 1,
            "access": "normal"
        },
        "app_msn_aws_list": {
            "version": 1,
            "access": "normal"
        },
        "app_msn_aws_set": {
            "version": 1,
            "access": "normal",
            "params": [
                {
                    "name": "msnId",
                    "display": "External line id",
                    "placeholder": "Number 1 - 9999 or msg.topic.msnId",
                    "required": true,
                    "regex": "[^0]\\d{0,3}",
                    "options": {
                        "request": "app_msn_aws_list",
                        "valueField": "msnId",
                        "textField": ["msnId", "rufNummer", "name"],
                        "pattern": "Id: %s, %s | %s"
                    }
                },
                {
                    "name": "msnTyp",
                    "display": "Forwarding type",
                    "placeholder": "Number 0 - 2",
                    "required": true,
                    "regex": "[0-2]{1}",
                    "options": {
                        "data": [
                            {"value": "0", "text": "CF immediately"},
                            {"value": "1", "text": "CF on busy"},
                            {"value": "2", "text": "CF on No reply"}
                        ]
                    }
                },
                {
                    "name": "switchOnOff",
                    "display": "Status",
                    "placeholder": "Number 0 - 1",
                    "required": false,
                    "regex": "[0-1]{1}",
                    "options": {
                        "static": "onOff"
                    }
                },
                {
                    "name": "permanent",
                    "display": "Permanent",
                    "placeholder": "Number 0 - 1",
                    "required": false,
                    "regex": "[0-1]{1}",
                    "options": {
                        "static": "onOff"
                    }
                },
                {
                    "name": "ziel",
                    "display": "Destination",
                    "placeholder": "string or msg.topic.ziel (string)",
                    "phone number": false,
                    "regex": "[\\+]{0,1}[0-9]*"
                }
            ]
        },
        "app_group_logstate": {
            "version": 1,
            "access": "user"
        },
        "app_group_logchange": {
            "version": 2,
            "access": "user",
            "params": [
                {
                    "name": "grpId",
                    "display": "Group id",
                    "placeholder": "Number 1 - 9999 or msg.topic.grpId",
                    "required": true,
                    "regex": "[^0]\\d{0,3}",
                    "options": {
                        "request": "app_group_logstate",
                        "valueField": "grpId",
                        "textField": ["grpId", "name"],
                        "pattern": "Id: %s, %s"
                    }
                },
                {
                    "name": "kommend",
                    "display": "Incoming",
                    "placeholder": "Number 0 - 1",
                    "required": false,
                    "regex": "[0-1]{1}",
                    "options": {
                        "static": "yesNoIgnore"
                    }
                },
                {
                    "name": "gehend",
                    "display": "Outgoing",
                    "placeholder": "Number 0 - 1",
                    "required": false,
                    "regex": "[0-1]{1}",
                    "options": {
                        "static": "yesNoIgnore"
                    }
                }
            ]
        },
        "app_tn_get": {
            "version": 4,
            "access": "normal"
        },
        "app_tn_set": {
            "version": 4,
            "access": "normal",
            "params": [
                {
                    "name": "function",
                    "display": "Function",
                    "placeholder": "string",
                    "required": true,
                    "regex": "(cfu|cfb|cfnr|par|cw|dnd)",
                    "options": {
                        "data": [
                            {
                                "value": "cfu",
                                "text": "CF immediately",
                                "show": ["param1", "param4"],
                                "hide": ["param2", "param3"]
                            },
                            {
                                "value": "cfb",
                                "text": "CF on busy",
                                "show": ["param1", "param4"],
                                "hide": ["param2", "param3"]
                            },
                            {
                                "value": "cfnr",
                                "text": "CF on no reply",
                                "show": ["param1", "param3", "param4"],
                                "hide": "param2"
                            },
                            {
                                "value": "par",
                                "text": "Multi-path Call Forwarding",
                                "show": ["param2", "param4"],
                                "hide": ["param1", "param3"]
                            },
                            {
                                "value": "cw",
                                "text": "Call Waiting",
                                "show": "param1",
                                "hide": ["param2", "param3", "param4"]
                            },
                            {
                                "value": "dnd",
                                "text": "Do-not-Disturb",
                                "show": "param1",
                                "hide": ["param2", "param3", "param4"]
                            }
                        ]
                    }
                },
                {
                    "name": "switchOnOff",
                    "display": "Status",
                    "placeholder": "Number 0 - 1",
                    "required": true,
                    "regex": "[0-1]{1}",
                    "options": {
                        "static": "onOff"
                    }
                },
                {
                    "name": "switchOnOff",
                    "display": "Status",
                    "placeholder": "Number 0 - 2",
                    "required": true,
                    "regex": "[0-2]{1}",
                    "options": {
                        "data": [
                            {"value": "0", "text": "Off"},
                            {"value": "1", "text": "On (Parallel call)"},
                            {"value": "2", "text": "On (FMC"}
                        ]
                    }
                },
                {
                    "name": "cfnrTime",
                    "display": "Delay time",
                    "placeholder": "Number 1 - 60",
                    "required": false,
                    "regex": "[1-5]\\d{0,1}|60"
                },
                {
                    "name": "number",
                    "display": "Number",
                    "placeholder": "string or msg.topic.number (string)",
                    "required": false,
                    "regex": "[\\+]{0,1}[0-9]*"
                }
            ]
        },
        "app_pbx_restart": {
            "version": 4,
            "access": "admin",
            "params": [
                {
                    "name": "reboottime",
                    "display": "Reboot time",
                    "placeholder": "Number 1 - 60 or msg.topic.reboottime",
                    "required": false,
                    "regex": "[1-5]\\d{0,1}|60"
                }
            ]
        },
        "app_pbx_shutdown": {
            "version": 7,
            "access": "admin"
        },
        "app_relais_list": {
            "version": 5,
            "access": "normal"
        },
        "app_relais_set": {
            "version": 5,
            "access": "normal",
            "params": [
                {
                    "name": "id",
                    "display": "Relay id",
                    "placeholder": "Number 1 - 9999 or msg.topic.id",
                    "required": true,
                    "regex": "[^0]\\d{0,3}",
                    "options": {
                        "request": "app_relais_list",
                        "valueField": "id",
                        "textField": ["id", "identnummer", "name"],
                        "pattern": "Id: %s, %s | %s"
                    }
                },
                {
                    "name": "status",
                    "display": "Status",
                    "placeholder": "Number 0 - 1",
                    "required": true,
                    "regex": "[0-1]{1}",
                    "options": {
                        "static": "onOff"
                    }
                }
            ]
        },
        "app_relais_set_status": {
            "version": 5,
            "access": "normal",
            "params": [
                {
                    "name": "id",
                    "display": "Relay id",
                    "placeholder": "Number 1 - 9999 or msg.topic.id",
                    "required": true,
                    "regex": "[^0]\\d{0,3}",
                    "options": {
                        "request": "app_relais_list",
                        "valueField": "id",
                        "textField": ["id", "identnummer", "name"],
                        "pattern": "Id: %s, %s | %s"
                    }
                },
                {
                    "name": "status",
                    "display": "Status",
                    "placeholder": "Number 0 - 1",
                    "required": true,
                    "regex": "[0-1]{1}",
                    "options": {
                        "static": "onOff"
                    }
                }
            ]
        },
        "app_relais_get_status": {
            "version": 5,
            "access": "normal",
            "params": [
                {
                    "name": "id",
                    "display": "Relay id",
                    "placeholder": "Number 1 - 9999 or msg.topic.id",
                    "required": true,
                    "regex": "[^0]\\d{0,3}",
                    "options": {
                        "request": "app_relais_list",
                        "valueField": "id",
                        "textField": ["id", "identnummer", "name"],
                        "pattern": "Id: %s, %s | %s"
                    }
                }
            ]
        },
        "app_alarm_list": {
            "version": 5,
            "access": "normal"
        },
        "app_alarm_set": {
            "version": 5,
            "access": "normal",
            "params": [
                {
                    "name": "id",
                    "display": "Alarm id",
                    "placeholder": "Number 1 - 9999 or msg.topic.id",
                    "required": true,
                    "regex": "[^0]\\d{0,3}",
                    "options": {
                        "request": "app_alarm_list",
                        "valueField": "id",
                        "textField": ["id", "rufnr", "name"],
                        "pattern": "Id: %s, %s | %s"
                    }
                }
            ]
        },
        "app_hotel_list": {
            "version": 6,
            "access": "admin"
        },
        "app_hotel_get": {
            "version": 6,
            "access": "admin",
            "params": [
                {
                    "name": "id",
                    "display": "Id",
                    "placeholder": "number 1 - 9999 or msg.topic.id",
                    "required": true,
                    "regex": "[^0]\\d{0,3}",
                    "options": {
                        "request": "app_hotel_list",
                        "valueField": "id",
                        "textField": ["id", "nr", "name"],
                        "pattern": "Id: %s, %s | %s"
                    }
                }
            ]
        },
        "app_hotel_set": {
            "version": 6,
            "access": "admin",
            "params": [
                {
                    "name": "id",
                    "display": "Id",
                    "placeholder": "number 1 - 9999 or msg.topic.id",
                    "required": true,
                    "regex": "[^0]\\d{0,3}",
                    "options": {
                        "request": "app_hotel_list",
                        "valueField": "id",
                        "textField": ["id", "nr", "name"],
                        "pattern": "Id: %s, %s | %s"
                    }
                },
                {
                    "name": "function",
                    "display": "Function",
                    "placeholder": "string",
                    "required": true,
                    "regex": "(checkedIn|exchangeLine|locked|cleaned)",
                    "options": {
                        "data": [
                            {"value": "checkedIn", "text": "Checked in"},
                            {"value": "exchangeLine", "text": "Allow outgoing calls"},
                            {"value": "locked", "text": "Room locked"},
                            {"value": "cleaned", "text": "Room cleaned"}
                        ]
                    }
                },
                {
                    "name": "switchOnOff",
                    "display": "Status",
                    "placeholder": "number 0 - 1",
                    "required": true,
                    "regex": "[0-1]{1}",
                    "options": {
                        "static": "yesNo"
                    }
                }
            ]
        },
        "app_hotel_calls": {
            "version": 6,
            "access": "admin",
            "params": [
                {
                    "name": "function",
                    "display": "Function",
                    "placeholder": "string",
                    "required": true,
                    "regex": "(id|checkinId)",
                    "options": {
                        "data": [
                            {"value": "id", "text": "Unique id of hotel subscriber / room", "hide": "param2", "show": "param1"},
                            {"value": "checkinId", "text": "Checkin id", "hide": "param1", "show": "param2"}
                        ]
                    }
                },
                {
                    "name": "id",
                    "display": "Id",
                    "placeholder": "number 1 - 9999 or msg.topic.id",
                    "required": true,
                    "regex": "[^0]\\d{0,3}",
                    "options": {
                        "request": "app_hotel_list",
                        "valueField": "id",
                        "textField": ["id", "nr", "name"],
                        "pattern": "Id: %s, %s | %s"
                    }
                },
                {
                    "name": "checkinId",
                    "display": "Checkin id",
                    "placeholder": "number 1 - 65535 or msg.topic.checkinId",
                    "required": true,
                    "regex": "[^0]\\d{0,4}"
                },
                {
                    "name": "wakeupCalls",
                    "display": "Type",
                    "placeholder": "number",
                    "required": true,
                    "regex": "(id|checkinId)",
                    "options": {
                        "data": [
                            {"value": "", "text": "Phone calls"},
                            {"value": "wakeupCalls", "text": "Wake up calls"}
                        ]
                    }
                }
            ]
        },
        "app_hotel_wakeup_list": {
            "version": 6,
            "access": "admin",
            "params": [
                {
                    "name": "id",
                    "display": "Id",
                    "placeholder": "number 1 - 9999 or msg.topic.id",
                    "required": true,
                    "regex": "[^0]\\d{0,3}",
                    "options": {
                        "request": "app_hotel_list",
                        "valueField": "id",
                        "textField": ["id", "nr", "name"],
                        "pattern": "Id: %s, %s | %s"
                    }
                }
            ]
        },
        "app_hotel_wakeup_set": {
            "version": 6,
            "access": "admin",
            "params": [
                {
                    "name": "id",
                    "display": "Id",
                    "placeholder": "number 1 - 9999 or msg.topic.id",
                    "required": true,
                    "regex": "[^0]\\d{0,3}",
                    "options": {
                        "request": "app_hotel_list",
                        "valueField": "id",
                        "textField": ["id", "nr", "name"],
                        "pattern": "Id: %s, %s | %s"
                    }
                },
                {
                    "name": "action",
                    "display": "Action",
                    "type": "text",
                    "placeholder": "number 0 - 2",
                    "required": true,
                    "options": {
                        "data": [
                            {"value": "0", "text": "Create", "hide": "param2"},
                            {"value": "1", "text": "Modify", "show": "param2"},
                            {"value": "2", "text": "Delete", "show": "param2"}
                        ]
                    }
                },
                {
                    "name": "weckId",
                    "display": "Wake up id",
                    "placeholder": "number 1 - 9999 or msg.topic.weckId",
                    "required": false,
                    "regex": "[^0]\\d{0,3}",
                    "options": {
                        "request": "app_weckzeiten_list",
                        "valueField": "id",
                        "textField": ["id", "tag", "zeit"],
                        "pattern": "Id: %s, %s, %s",
                        "replaceValue": [null, "days", null]
                    }
                },
                {
                    "name": "zeit",
                    "display": "Time",
                    "placeholder": "time 00:00 - 23:59 or msg.topic.zeit (string)",
                    "required": false,
                    "regex": "(?:\\d|[01]\\d|2[0-3]):[0-5]\\d"
                },
                {
                    "name": "tag",
                    "display": "Day",
                    "type": "select",
                    "placeholder": "",
                    "required": false,
                    "options": {
                        "static": "days"
                    }
                },
                {
                    "name": "immer",
                    "display": "Always",
                    "placeholder": "",
                    "required": false,
                    "options": {
                        "data": [
                            {"value": "", "text": "No"},
                            {"value": "immer", "text": "Yes"}
                        ]
                    }
                },
                {
                    "name": "aktiv",
                    "display": "Active",
                    "placeholder": "",
                    "required": false,
                    "options": {
                        "data": [
                            {"value": "", "text": "No"},
                            {"value": "aktiv", "text": "Yes"}
                        ]
                    }
                }
            ]
        }
    }
}
