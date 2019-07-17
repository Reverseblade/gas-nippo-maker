function createNippo() {
  var myCalendar = CalendarApp.getCalendarById(EMAIL);
  
  var text = "```\n# 本日の予定\n";

  var date = new Date();
  var events = myCalendar.getEventsForDay(date);
  for (var i = 0; i < events.length; i++) {
    text += "    - " + events[i].getTitle() + "\n"; 
  }
      
  text += "\n#明日の予定\n"

  date.setDate(date.getDate() + 1);
  var events = myCalendar.getEventsForDay(date);
  for (var i = 0; i < events.length; i++) {
    text += "    - " + events[i].getTitle() + "\n"; 
  }
  
  text += "```";
  postSlack(text);
}

function postSlack(text){
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

function isJapaneseHoliday(){
  var date = new Date();

  //土日チェック
  var weekInt = date.getDay();
  if(weekInt <= 0 || 6 <= weekInt){
    return true;
  }

  //祝日チェック
  var japaneseHolidayCalendarId = "ja.japanese#holiday@group.v.calendar.google.com";
  var calendar = CalendarApp.getCalendarById(japaneseHolidayCalendarId);
  var eventsForToday = calendar.getEventsForDay(today);
  if(eventsForToday.length > 0){
    return true;
  }
  
  return false;
}