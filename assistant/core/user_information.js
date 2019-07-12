// i found my colleagues to be quite stubborn and ignoring every informative email i wrote as well as the faq-section.
// this was my attempt to present knowledge about the functions bit by bit, randomly, at startup.
// it absolutely makes sense to extent the information for any given module as this extends the faq

var randomTip={
	show:function(){
// 	show random tip on startup
		return '<span class="button" style="float:right" onclick="el(\'temp\').innerHTML=randomTip.show()">'+core.function.icon.insert('refresh')+'</span>'
		+'<br /><span class="highlight">'+this.list[0][core.var.selectedLanguage]+':</span>'
		+'<br />'+this.list[Math.floor(Math.random()*(this.list.length-1)+1)][core.var.selectedLanguage]
		+'';

	},
	list:[
//	list of tips according to registered langages, first item is the caption of the tip
		{	en:'Tip',
			de:'Tipp'},
//	general functionality tips			
		{   en:'If you don\'t like the color, you can change the theme within the settings',
			de:'Falls dir dir Farbe nicht gefällt kannst du ein anderes Theme bei den Einstellungen auswählen.'},
		{   en:'In case you have difficulties reading, set up the font size and display size differently.',
			de:'Wenn du Schwierigkeiten hat etwas zu erkennen, stelle in den Einstellungen die Schrift- und Darstellungsgröße ein.'},
		{   en:'Having a bad screen resolution you can set up the menu bar to be always small to have more space for the content.',
			de:'Bei niedriger Auflösung kannst du das Menü dauerhaft bei den Einstellungen auf schmal einstellen, damit mehr Platz für die Inhalte ist.'},
		{   en:'Enabling fuzzy search can help you finding the desired content in case of typos.',
			de:'Wenn du dich gelegentlich vertippst kann dich Fuzzy-Search unterstützen trotzdem zum Ziel zu gelangen.'},
		{	en:'Search for different keywords, results with the most matches appear at the top.',
			de:'Suche nach mehreren Begriffen, Ergebnisse mit den meisten Übereinstimmungen stehen ganz oben.'},
		{	en:'Filter your search results by preceding a -, like &quot;find everything -but&quot;.',
			de:'Du kannst bei deiner Suche filtern wenn du ein - voranstellst, wie in &quot;finde alles -außer&quot;.'},
		{   en:'Your last search- and filter-settings are stored. Sometimes that makes it faster, sometimes there seem to be too little results. Watch out for that.',
			de:'Deine letzten Such- und Filtereinstellungen werden automatisch gespeichert. Manchmal macht es das schneller, manchmal wird überraschend wenig angezeigt. Achte mal darauf.'},
		{   en:'To avoid the need of adjusting the font type of copied content, you can let it be opened within a new window.',
			de:'Um beim Kopieren von Inhalten die Schriftart nicht anpassen zu müssen, kannst du den Text auch in einem neuen Fenster ausgeben lassen.'},
		{   en:'You can always look up the list of notifications from the settings.',
			de:'Du kannst jederzeit die Liste der Update-Hinweise bei den Einstellungen einsehen.'},
		{   en:'If you find the menu to be overcrowded, you can disable unused modules.',
			de:'Wenn Dir das Menü zu voll ist kannst du Module bei den Einstellungen deaktivieren.'},
		{	en:'Save the application to your browsers favourite-bar, as a shortcut to the desktop or to the startup-folder.',
			de:'Speichere die Seite in der Favoriten-Leiste deines Browsers oder als Verknüpfung auf dem Desktop oder im Autostart-Ordner.'},
		{	en:'Some settings take effect immediately, others need a restart of the application.',
			de:'Manche Einstellungen haben sofort einen Effekt, andere erfordern den Neustart der Oberfläche.'},
		{	en:'There is two-language-support by default. The application as well as text-blocks can be displayed and generated in different languages.',
			de:'Standardmäßig sind mehrere Sprachen implementiert. Sowohl die Oberfläche als auch Textblöcke können mehrsprachig dargestellt werden.'},
		{   en:'If suddenly something is not working anymore it might be possible I had to change something. Just reload the application. I hope you didn\'t lost anything.',
			de:'Falls etwas plötzlich nicht mehr funktioniert habe ich vermutlich etwas ändern müssen. Lade die Oberfläche einfach nochmal. Ich hoffe es ging nichts verloren.'},
//	module specific tips
		{	en:'Remember pointing our errors to the inventory control via email.',
			de:'Vergiss nicht dem Einkauf per eMail bescheid zu sagen, falls dir Fehler auffallen.'},
			
	],
};

var aboutNotification={
	en:'This application is part of a supportive system for quality management. It is a universal interface and can be modular extended.<br /><br />The complete system of application and depended documents can be used under GNU GENERAL PUBLIC LICENSE Version 3. The sourcecode with templates is available under <a href="https://github.com/erroronline1/qualitymanagement/" target="_blank">https://github.com/erroronline1/qualitymanagement/</a><br />&copy; 2019, <a href="http://erroronline.one" target="_blank">error on line 1</a>',
	de:'Diese Anwendung ist Bestandteil eines Systems zur Unterstützung eines Qualitätsmanagement-Systems. Es dient als universelle Schnittstelle und kann modular erweitert werden.<br /><br />Das Gesamtsystem aus Anwendung und anhängigen Dokumenten ist unter der GNU GENERAL PUBLIC LICENSE Version 3 verwendbar. Quelltexte und Templates sind erhältlich unter <a href="https://github.com/erroronline1/qualitymanagement/" target="_blank">https://github.com/erroronline1/qualitymanagement/</a><br />&copy; 2019, <a href="http://erroronline.one" target="_blank">error on line 1</a>'
};

// in case of major updates something might happen to malfunction. this module keeps track of changes and informs every user abut new
// features.

var updateTracker={
	enlist:function(){
//	listing all update hints in reverse order
		var tracker='';
		for (var i=this.list.length-1; i>-1; i--){
			tracker+='<span class="highlight">'+this.list[i][0]+':</span> '+this.list[i][1]+'<br /><hr /><br />';
		}
		core.function.popup('Update Tracker:<br /><br />'+tracker);
	},
	latestMajorUpdate:function(){
		for (var i=updateTracker.list.length-1; i>-1; i--){
			if (this.list[i][0]=='Major') return i;
		}
	},
    alert:function(){
//	display latest update hint on startup as long as it is not disabled
		if (core.function.setting.get('settingStarthinweis'+this.latestMajorUpdate())===false){
            text=this.list[this.latestMajorUpdate()][1]+'<br /><br />'
            +core.function.insert.checkbox(core.function.lang('settingNotificationSelector'),'sstarthinweis',(core.function.setting.get('settingStarthinweis'+this.latestMajorUpdate())!=1),'onchange="core.function.setting.set(\'settingStarthinweis'+this.latestMajorUpdate()+'\',1)"')
            +'<br /><small>'+core.function.lang('settingNotificationHint')+'</small>';
            core.function.popup(text);
        }
    },
	list:[
//	list of updates in ascending order. this is considered not to be critical in terms of language so feel free to fill this list in you main oder native language
		['Minor','15.06.2019: Enjoy!'],
		['Major','16.06.2019: Welcome to the assistant. As the responsible person you can delete this message and later add your own announcements or update hints.'],
	],
};
