import React from 'react';
import './DateTime.css';

class DateTime extends React.Component {


  render() {
    const time = () => {
      var now = new Date();
      var sec = now.getSeconds();
      var min = now.getMinutes();
      var hour = now.getHours();
      var days = now.getDate();
      var months = now.getMonth();
      var years = now.getFullYear();
      var weekday = now.getDay();

      if (sec < 10)
        sec = "0"+sec;

      if (min < 10)
        min = "0"+min;

      if (hour < 10)
        hour = "0"+hour;

      if (days < 10)
        days = "0"+days;

      switch(months){
        case 0: months = "január"; break;
        case 1: months = "február"; break;
        case 2: months = "március"; break;
        case 3: months = "április"; break;
        case 4: months = "május"; break;
        case 5: months = "junius"; break;
        case 6: months = "július"; break;
        case 7: months = "augusztus"; break;
        case 8: months = "szeptember"; break;
        case 9: months = "oktober"; break;
        case 10: months = "november"; break;
        case 11: months = "december"; break;
        default:
      }

      switch(weekday){
        case 1: weekday = "hétfő"; break;
        case 2: weekday = "kedd"; break;
        case 3: weekday = "szerda"; break;
        case 4: weekday = "csütörtök"; break;
        case 5: weekday = "péntek"; break;
        case 6: weekday = "szombat"; break;
        case 7: weekday = "vasárnap"; break;
        default:
      }

      now = hour + ":" + min + ":" + sec + "<br><span id='date'>" + years + "." + months + " " + days + ". " + weekday +"</span>";
      document.getElementById("time").innerHTML = now;
    }

    setInterval(time, 10);


    return (
      <div id="time" className=''></div>
    );
  }
}

export default DateTime;
