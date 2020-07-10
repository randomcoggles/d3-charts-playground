// Test isWorkingDay func:

    // TODO: This may not need to be global
    var blacklistDaysStr = this.blackList.map(item => item.date);
    const startDate = new Date();
    const currentDate = new Date(startDate);
    for (let i = 0; i < 365; i++) {
      currentDate.setDate(currentDate.getDate() + 1);
      const isWDay = this.isWorkingDay(currentDate, blacklistDaysStr);
      console.log('isWDay: ', isWDay,
      ' -> ',
      new Intl.DateTimeFormat('pt-BR', { weekday: 'short'}).format(currentDate)
      );
    }
    