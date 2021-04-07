# Beschreibung

node-red-contrib-auerswald stellt den Zugriff auf Auerswald-ITK-Systeme (COMpact 4000, 5000(R), 5200(R), 5500R und COMmander 6000(R)(X)) unter Verwendung der von Auerswald unter

https://www.auerswald.de/de/service/125-developer-service/950-dev-beschreibung-api-de.html

bereitgestellten API zur Verfügung.

## Konfiguration

Bei der ersten Verwendung müssen Sie die IP-Adresse und den HTTPS-Port des ITK-Systems konfigurieren.

Zusätzlich benötigen Sie die Zugangsdaten des Teilnehmers, für den Sie die Daten über die API abfragen wollen.

Beachten Sie die Möglichkeit, separate Passwörter für den Zugriff auf Auerswald-ITK-Systeme zu erzeugen:

https://www.auerswald-root.de/download/datei/Developer/COMmander_6000_COMpact_5x00_COMpact_4000/Actionurls_de.pdf

In der Konfiguration können Zugangsdaten für mehrere Teilnehmer hinterlegt werden und für jeden verwendeten Node individuell ausgewählt werden.

## Verwendung

Für jeden Node kann ein API-Request aus der Liste ausgewählt werden. Alternativ kann der Request auch über die eingehende Message definiert werden:

```js
...
msg.topic = {};
msg.topic.request = 'app_config_list';
return msg;
```

Beachten Sie, dass der Request gegebenenfalls weitere Parameter benötigt. Diese werden Ihnen angezeigt, wenn Sie den Request im Node unter API-Request aus der Liste auswählen.

```js
...
msg.topic = {};
msg.topic.request = 'app_telefonbuch';
msg.topic.catId = 1;
return msg;
```


## Ausgabe

Jeder Request liefert am ersten Ausgang (stdout) als msg.payload ein JSON-Objekt entsprechend der API-Dokumentation.

Auf Ausgang 2 (binary) werden Voicemail- / Faxnachrichten, die mit dem Request app_get_msg abgerufen werden, als Stream zur weiteren Verarbeitung ausgegeben.

Diese können dann z.B. mit dem Node _play audio_ oder _audio out_ (Dashboard) abgespielt werden oder als Datei geschrieben werden


