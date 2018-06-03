import React,{Component} from 'react';
import './calendar.css'

const today = new Date()

export default class Calendar extends Component {
  constructor(props){
  	super(props);
  	this.state = {
      dateContext: today,
      currentYear: today.getFullYear(),
      currentMonth: this.months[today.getMonth()]
    };
  }

  weekdays = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"]
  months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
  year = () => this.state.dateContext.getFullYear(); //2018
  month = () => this.months[this.state.dateContext.getMonth()]; //June
  dayOfMonth = () => this.state.dateContext.getDate() //2 for 2nd of June

  firstDayOfMonth = () => {
    var date = this.state.dateContext
    var copy = new Date(date.getTime());
    copy.setDate(1)
    var day = copy.getDay()
    return day === 0 ? 6 : day-1
  }

  daysInMonth = (month, year) => {
    if (month === "February") return year % 4 === 0 ? 29 : 28;
    else return month === "September" || month === "April" || month === "June" || month === "November" ? 30 : 31;
  }

  nextMonth = () => {
    var date = this.state.dateContext
    var copy = new Date(date.getTime());
    copy.setMonth(copy.getMonth()+1);
    let dateContext = copy
    this.setState({dateContext},()=>console.log(this.state.dateContext))
  }

  prevMonth = () => {
    var date = this.state.dateContext
    var copy = new Date(date.getTime());
    copy.setMonth(copy.getMonth()-1);
    let dateContext = copy
    this.setState({dateContext},()=>console.log(this.state.dateContext))
  }

  nextYear = () => {
    var date = this.state.dateContext
    var copy = new Date(date.getTime());
    copy.setYear(copy.getFullYear()+1);
    let dateContext = copy
    this.setState({dateContext},()=>console.log(this.state.dateContext))
  }

  prevYear = () => {
    var date = this.state.dateContext
    var copy = new Date(date.getTime());
    copy.setYear(copy.getFullYear()-1);
    let dateContext = copy
    this.setState({dateContext},()=>console.log(this.state.dateContext))
  }

  render() {
    let weekdaysTd = this.weekdays.map((wd,i) => <td className="weekday" key={i}>{wd}</td>)
    let blanks = Array(this.firstDayOfMonth()).fill(<td className="empty-slot">{""}</td>)
    let total = blanks
    let daysInMonth = this.daysInMonth(this.month(), this.year())
    for(let d=1; d<=daysInMonth; d++){
      let className = (d === this.dayOfMonth() && this.year() === this.state.currentYear && this.month() === this.state.currentMonth ? "current-day" : "day");
      total.push(
        <td key={d} className={className}>
          <span>{d}</span>
        </td>
      )
    }

    let rows = [];
    let cells = [];
    total.forEach((e, i)=>{
      if(i === 0) {
        cells.push(e)
      } else {
        if (i % 7 !== 0) {
          cells.push(e)
        } else {
          let insertRow = cells.slice();
          rows.push(insertRow);
          cells = [e];
        }
      }
      if (i === total.length-1) {
        let insertRow = cells.slice();
        rows.push(insertRow);
      }
    });

    let trElems = rows.map((row,i) => {
      return <tr key={i*80}>{row}</tr>
    })

    return (
      <div className="calendar-container centered">
          <table>
            <thead>
              <tr className="month-container">
                <td>
                  <i className="fas fa-angle-double-left fa-sm" onClick={this.prevYear}></i>
                  {" "}
                  <i className="fas fa-angle-left fa-sm" onClick={this.prevMonth}></i>
                </td>
                <td colSpan="5">{this.month()}{" "}{this.year()}</td>
                <td>
                <i className="fas fa-angle-right fa-sm" onClick={this.nextMonth}></i>
                  {" "}
                  <i className="fas fa-angle-double-right fa-sm" onClick={this.nextYear}></i>
                </td>
              </tr>
            </thead>
            <tbody>
              <tr className="weekdays">
                {weekdaysTd}
              </tr>
              {trElems}
            </tbody>
          </table>
      </div>
    );
  }
}
