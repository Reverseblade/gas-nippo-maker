function sendNippo() {
  var cal = CalendarApp.getCalendarById(EMAIL);
  
  var text = "```\n# 本日の予定\n";
  
  // 今日の予定
  var date = new Date();
  var events = cal.getEventsForDay(date);
  for (var i = 0; i < events.length; i++) {
    text += "    - " + events[i].getTitle() + "\n"; 
    Logger.log(events[i].getTitle());
  }
      
  text += "\n#明日の予定\n"
  
  // 明日の予定
  date.setDate(date.getDate() + 1);
  var events = cal.getEventsForDay(date);
  for (var i = 0; i < events.length; i++) {
    text += "    - " + events[i].getTitle() + "\n"; 
  }
  
  text += "```";
  
  sendHttpPost(text);
}

function sendHttpPost(text){
   var jsonData =
   {
     'channel' : CHANNEL,
     'username' : 'gas-nippo-maker',
     "text" : text,
   };
  var payload = JSON.stringify(jsonData);

  var options =
   {
     "method" : "post",
     "contentType" : "application/json",
     "payload" : payload
   };

   UrlFetchApp.fetch(SLACK_WEBHOOK_URL, options);
}