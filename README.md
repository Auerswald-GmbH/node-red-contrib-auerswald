(Deutsche Version siehe unten)

---
# Description

node-red-contrib-auerswald provides access to Auerswald ITC systems (COMpact 4000, 5000(R), 5200(R), 5500R and COMmander 6000(R)(X)) using the API provided by Auerswald under

http://wiki.auerswald.de/doku.php?id=en:products:compact-commander-series-_4000-5000-6000:developer_documentation:ict_system_api


## Configuration

When using it for the first time, configure the IP address and HTTPS port of the ITC system.

You also need the access data of the subscriber for whom the data is to be queried via the API.

You can generate separate access passwords to Auerswald ITC systems:

https://www.auerswald-root.de/download/datei/Developer/COMmander_6000_COMpact_5x00_COMpact_4000/Actionurls_en.pdf

You can store access data for several subscribers in the configuration and select them individually for each node used.

## Use

You can select an API request from the list for each node. Alternatively, you can also define the request using the incoming message:

```js
...
msg.topic = {};
msg.topic.request = 'app_config_list';
return msg;
```

Please note: The request may require additional parameters. These are displayed when you select the request in the node under API request from the list.

```js
...
msg.topic = {};
msg.topic.request = 'app_telefonbuch';
msg.topic.catId = 1;
return msg;
```


## Output

Each request delivers a JSON object as msg.payload on the first output (stdout) according to the API documentation.

Voicemail/fax messages, which can be called up with the request app_get_msg, are output as a stream for further processing on the second output (binary).

These can then e.g. be played with the node _play audio_ or _audio out_ (Dashboard) or written as a file.

---

# Beschreibung

node-red-contrib-auerswald stellt den Zugriff auf Auerswald-ITK-Systeme (COMpact 4000, 5000(R), 5200(R), 5500R und COMmander 6000(R)(X)) zur Verfügung unter Verwendung der von Auerswald unter

http://wiki.auerswald.de/doku.php?id=en:products:compact-commander-series-_4000-5000-6000:developer_documentation:ict_system_api

bereitgestellten API.

## Konfiguration

Konfigurieren Sie bei der ersten Verwendung die IP-Adresse und den HTTPS-Port des ITK-Systems.

Sie benötigen zusätzlich die Zugangsdaten des Teilnehmers, für den die Daten über die API abgefragt werden sollen.

Sie können separate Passwörter für den Zugriff auf Auerswald-ITK-Systeme erzeugen:

https://www.auerswald-root.de/download/datei/Developer/COMmander_6000_COMpact_5x00_COMpact_4000/Actionurls_de.pdf

Sie können in der Konfiguration Zugangsdaten für mehrere Teilnehmer hinterlegen und diese für jeden verwendeten Node individuell auswählen.

## Verwendung

Sie können für jeden Node einen API-Request aus der Liste auswählen. Alternativ können Sie den Request auch über die eingehende Message definieren:

```js
...
msg.topic = {};
msg.topic.request = 'app_config_list';
return msg;
```

Bitte beachten: Der Request benötigt ggf. weitere Parameter. Diese werden angezeigt, wenn Sie den Request im Node unter API-Request aus der Liste auswählen.

```js
...
msg.topic = {};
msg.topic.request = 'app_telefonbuch';
msg.topic.catId = 1;
return msg;
```


## Ausgabe

Jeder Request liefert am ersten Ausgang (stdout) ein JSON-Objekt als msg.payload entsprechend der API-Dokumentation.

Auf Ausgang 2 (binary) werden Voicemail-/Faxnachrichten, abrufbar mit dem Request app_get_msg, als Stream zur weiteren Verarbeitung ausgegeben.

Diese können dann z.B. mit dem Node _play audio_ oder _audio out_ (Dashboard) abgespielt werden oder als Datei geschrieben werden.

