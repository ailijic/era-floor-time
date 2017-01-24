start()
function start () {
  'use strict'

  $(document).ready(function() {
    // page is now ready, initialize the calendar...
    /*
    */
    getShifts()
    function getShifts () {
      /* $.ajax({
        type: "GET",
        url: "/shifts",
        datatype: "json",
        contentType: "application/json; charset=utf-8",
        success: (data) => {
          console.log(data) // DELETE ME LATER */
          $('#calendar').fullCalendar({
            // put your options and callbacks here
            // events: data.events,
            events: [
              {
                title: 'Event1',
                start: '2017-01-04'
              },
              {
                title: 'Event2',
                start: '2017-01-05'
              }
              // etc...
            ],
            
            color: 'yellow',   // an option!
            textColor: 'black' // an option!
          });
        //}
      //})
    }
  })
}

