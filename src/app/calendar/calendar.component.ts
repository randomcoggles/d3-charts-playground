import { Component } from "@angular/core";

@Component({
  selector: "app-calendar",
  templateUrl: "./calendar.component.html",
  styleUrls: ["./calendar.component.scss"]
})
export class CalendarComponent {
  blackList = [
    { date: "01-01-2020", title: "Confraternização Universal" },
    { date: "24-02-2020", title: "Carnaval" },
    { date: "25-02-2020", title: "Carnaval" },
    { date: "10-04-2020", title: "Paixão de Cristo" },
    { date: "21-04-2020", title: "terça-feira	Tiradentes" },
    { date: "01-05-2020", title: "Dia do Trabalho" },
    { date: "11-06-2020", title: "quinta-feira	Corpus Christi" },
    { date: "07-09-2020", title: "Independência do Brasil" },
    { date: "12-10-2020", title: "Nossa Sr.a Aparecida - Padroeira do Brasil" },
    { date: "02-11-2020", title: "Finados" },
    { date: "15-11-2020", title: "Proclamação da República" },
    { date: "25-12-2020", title: "Natal" },
    { date: "01-01-2021", title: "Confraternização Universal" },
    { date: "24-02-2021", title: "Carnaval" },
    { date: "25-02-2021", title: "Carnaval" },
    { date: "10-04-2021", title: "Paixão de Cristo" },
    { date: "21-04-2021", title: "terça-feira	Tiradentes" },
    { date: "01-05-2021", title: "Dia do Trabalho" },
    { date: "11-06-2021", title: "quinta-feira	Corpus Christi" },
    { date: "07-09-2021", title: "Independência do Brasil" },
    { date: "12-10-2021", title: "Nossa Sr.a Aparecida - Padroeira do Brasil" },
    { date: "02-11-2021", title: "Finados" },
    { date: "15-11-2021", title: "Proclamação da República" },
    { date: "25-12-2021", title: "Natal" }
  ];

  startDate = new Date("2020-06-12");
  endDate = new Date(this.startDate);
  events = [];
  eventsFormated = [];
  recurrence = {
    //   interval: 4,
    type: "weekly", // 'daily' | 'weekly' | 'monthly'
    days: [1, 3, 5]
    //   allDays: boolean
  };
  blacklistDaysStr = [];
  defaultActions: {
    actions: ["Action A", "Action B", "Action C"];
  };
  calendar = [];
  spinnerIsOn = false;
  constructor() {
    this.startDate.setDate(this.startDate.getUTCDate());
    this.endDate.setMonth(this.endDate.getMonth() + 12); // Add one moth to endDate
    this.blackList = this.blackList.concat([
      { date: "16-06-2020", title: "Dummy holiday" },
      { date: "17-06-2020", title: "Aniversário da crush" },
      { date: "26-06-2020", title: "Aniversário da sogra" },
      { date: "13-07-2020", title: "Meu aniversário" },
      { date: "27-28-2020", title: "Meu aniversário" },

      {
        date: "24-02-2020",
        title: "Dia da Promulgação Primeira Constituição Republicana (1891)"
      },
      { date: "08-03-2020", title: "Dia Internacional da Mulher" },
      {
        date: "25-03-2020",
        title: "Dia da Promulgação da Constituição do Império (1824)"
      },
      {
        date: "08-05-2020",
        title: "Dia da Vitória na II Guerra Mundial (1945)"
      },
      { date: "01-08-2020", title: "Dia da Consciência Nacional" },
      { date: "27-09-2020", title: "Dia da Caridade" },

      {
        date: "24-02-2021",
        title: "Dia da Promulgação Primeira Constituição Republicana (1891)"
      },
      { date: "08-03-2021", title: "Dia Internacional da Mulher" },
      {
        date: "25-03-2021",
        title: "Dia da Promulgação da Constituição do Império (1824)"
      },
      {
        date: "08-05-2021",
        title: "Dia da Vitória na II Guerra Mundial (1945)"
      },
      { date: "01-08-2021", title: "Dia da Consciência Nacional" },
      { date: "27-09-2021", title: "Dia da Caridade" },
      { date: "25-01-2021", title: "Aniversário de São Paulo" }
    ]);
    this.blacklistDaysStr = this.blackList.map(item => item.date);
  }

  private getDefaultAction() {
    return [
      { title: "Action A", selected: true },
      { title: "Action B", selected: true },
      { title: "Action C", selected: true }
    ];
  }

  weekSelectionOnchange(weekDays) {
    this.spinnerIsOn = true;
    setTimeout(() => {
      console.time("timer01");
      this.recurrence.days = weekDays.value.map(i => +i);
      console.timeEnd("timer01");

      console.time("timer02");
      const events = this.weeklyFunc(
        this.startDate,
        this.endDate,
        this.recurrence.days,
        this.blacklistDaysStr,
        this.events
      );
      console.timeEnd("timer02");
      console.time("timer03");
      this.events = events.map(d => {
        const date = d.dateObj;
        const dateStr = new Intl.DateTimeFormat("pt-BR").format(date);
        return {
          date,
          dateStr,
          actions: this.getDefaultAction()
        };
      });
      console.timeEnd("timer03");

      this.calendar = [];
      const currentDate = new Date(this.startDate);
      const endDateTime = this.endDate.getTime();

      console.time("timer04");
      while (currentDate.getTime() <= endDateTime) {
        currentDate.setDate(currentDate.getDate() + 1);
        var currentDateStr = new Intl.DateTimeFormat("pt-BR")
          .format(currentDate)
          .split(/[\/-]/g)
          .join("-"); // TODO: parameterize this format
        const weekDay = new Intl.DateTimeFormat("pt-BR", {
          weekday: "short"
        }).format(currentDate);
        const isBusinessDay = this.isWorkingDay(
          currentDate,
          this.blacklistDaysStr
        );
        console.time("timer05");
        const event = this.events.find(event => {
          const dateStr = new Intl.DateTimeFormat("pt-BR").format(currentDate);
          return event.dateStr === dateStr;
        });
        const holiday = this.blackList.find(
          item => item.date === currentDateStr
        );
        console.timeEnd("timer05");
        const date = new Date(currentDate);
        this.calendar.push({
          dateStr: currentDateStr,
          date,
          isWeekend: !!(date.getDay() === 6 || date.getDay() === 7),
          weekDay,
          event,
          isBusinessDay,
          holiday
        });
      }

      this.spinnerIsOn = false;
      console.timeEnd("timer04");
    }, 0);

    console.log("....");
  }
  onRecurrenceChanges(recurrence) {
    switch (recurrence.type) {
      case "daily":
        console.log("It is daily");
        // dailyFunc();
        break;
      case "weekly":
        this.weeklyFunc(
          this.startDate,
          this.endDate,
          recurrence,
          this.blacklistDaysStr,
          {}
        );
        console.log("It is weekly");
        break;
      case "monthly":
        console.log("It is monthly");
        break;
    }
  }

  //     *************** WEEKLY FUNCTION ***************

  weeklyFunc = (startDate, endDate, days, blacklistDaysStr, param4) => {
    const events = [];
    var weekDayMap = {
      "dom.": 0,
      "seg.": 1,
      "ter.": 2,
      "qua.": 3,
      "qui.": 4,
      "sex.": 5,
      "sáb.": 6
    };
    let currentDate = new Date(startDate);
    let weekDay = new Intl.DateTimeFormat("pt-BR", { weekday: "short" }).format(
      currentDate
    );
    let weekDayNumber = weekDayMap[weekDay];
    let isEventDay = days.indexOf(weekDayNumber) > -1;
    if (this.isWorkingDay(currentDate, blacklistDaysStr) && isEventDay) {
      events.push({
        dateObj: new Date(currentDate)
      });
    }

    while (currentDate.getTime() <= endDate.getTime()) {
      currentDate.setDate(currentDate.getDate() + 1);
      currentDate = this.isWorkingDay(currentDate, blacklistDaysStr)
        ? currentDate
        : this.nextBusinessDay(currentDate, endDate, blacklistDaysStr);
      const currentDateIsValid =
        currentDate instanceof Date && !isNaN(currentDate.getTime());

      let weekDay = new Intl.DateTimeFormat("pt-BR", {
        weekday: "short"
      }).format(currentDate);
      let weekDayNumber = weekDayMap[weekDay];
      let isEventDay = days.indexOf(weekDayNumber) > -1;

      if (currentDateIsValid) {
        if (isEventDay) {
          events.push({
            dateObj: new Date(currentDate)
          });
        }
      } else {
        break;
      }
    }
    return events;
  };

  private isWorkingDay = (d, blacklistDaysStr) => {
    const day = (d || new Date()).getDay();
    let dStr = new Intl.DateTimeFormat("pt-BR").format(d);
    dStr = dStr.split(/[-\/]/g).join("-");
    const isBlackllisted = blacklistDaysStr.indexOf(dStr) >= 0;
    return day !== 0 && day !== 6 && !isBlackllisted;
  };
  // TODO: Maybe it is better to make isWorkingDay and nextBusinessDay into a class
  private nextBusinessDay = (date, endDate, blacklistDaysStr) => {
    if (date.getTime() > endDate.getTime()) {
      return null;
    }
    let currentDate = new Date(date);
    currentDate.setDate(currentDate.getDate() + 1);

    while (currentDate.getTime() <= endDate.getTime()) {
      if (this.isWorkingDay(currentDate, blacklistDaysStr)) {
        break;
      }
      currentDate.setDate(currentDate.getDate() + 1);
    }
    if (this.isWorkingDay(currentDate, blacklistDaysStr)) {
      return currentDate;
    }
    return null;
  };
}
