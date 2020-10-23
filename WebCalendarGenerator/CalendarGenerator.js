
function getDay (date) {
  let day = date.getDay();
  if (day > 0) day -=1;
  else day = 6;
  return day;
}

function createCalendar(elem, year, month) {
  // building table, added to HTML content
  let table = document.createElement('table');
  let tBody = document.createElement('tbody');

  table.append(tBody);
  calendar.append(table);
  table.className = 'table';

  // building the header
  let dayList = ["MO","TU","WE","TH","FR","SA","SU",];
  let header = document.createElement('tr');

  for (let k=0; k<7; k++) {
    let th = document.createElement('th');
    let text = document.createTextNode(dayList[k]);
    header.append(th);
    th.append(text);
  }
  table.append(header);

  // defining the first day of the month
  let date = new Date(year,month-1);
  let firstDay = getDay(date);

  // adding empty cells before the first day
  let tr = document.createElement('tr');
  for (let i =0; i< firstDay; i++) {
    let emptyCells = document.createElement('td');
    tr.append(emptyCells);
          table.append(tr);
    }

  // building the non-empty cells
  while (date.getMonth() == month-1) {
    day = getDay(date);

    // if day is a Sunday
    if (day == 6) {
      let td = document.createElement('td');
      tr.append(td);
      tr = document.createElement('tr');
      table.append(tr);
    }

    else {
      let td = document.createElement('td');
      tr.append(td);
      table.append(tr);
    }

  date.setDate(date.getDate()+1);

  }

  // putting all the days in table
  let tds = table.getElementsByTagName('td');

  for (let days = firstDay; days< tds.length; days++) {
        tds[days].innerHTML = Number(tds[days-1].innerHTML)+1;
  }

  //filling the blank space of the last line
  if (day != 6) {
    for (let i = day; i < 6; i++) {
        emptyCells = document.createElement('td');
        tr.append(emptyCells);
        table.append(tr);
      }
  }
  elem.append = table;
}



createCalendar(calendar, 2012, 9);