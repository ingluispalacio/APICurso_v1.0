const currentDateTime = (objJson=true)=> {
    const date = new Date();
    let severDateTime= `${year}/${month}/${day} ${hours}:${minutes}:${second}`;
    const year = fecha.getFullYear();
    const month = date.getMonth() + 1; 
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const second = date.getSeconds();
    if (objJson) {
         severDateTime = {
            hora: hours,
            minutes: minutes,
            second: second,
            day: day,
            month: month, 
            year: year,
          };
          return severDateTime;
    }
    return severDateTime;

}

const calculateExpirationDate = (duration) => {
    const date = new Date();
    const durationRegex = /^(\d+)([dMyhm])$/; 
  
    const match = duration.match(durationRegex);
  
    if (!match) {
      throw new Error('Formato de duración no válido. Use ejemplos como "1m", "1h", "1d", "1M" o "1y".');
    }
  
    const amount = parseInt(match[1]);
    const unit = match[2];
  
    let durationInMillisecond;
  
    switch (unit) {
      case 'm':
        durationInMillisecond = amount * 60 * 1000; // minutes a milisecond
        break;
      case 'h':
        durationInMillisecond = amount * 60 * 60 * 1000; // hours aproximados a milisecond
        break;
      case 'd':
        durationInMillisecond = amount * 24 * 60 * 60 * 1000; // días a milisecond
        break;
      case 'M':
        durationInMillisecond = amount * 30 * 24 * 60 * 60 * 1000; // monthes aproximados a milisecond
        break;
      case 'y':
        durationInMillisecond = amount * 365 * 24 * 60 * 60 * 1000; // años aproximados a milisecond
        break;
      default:
        throw new Error('unit de duración no reconocida. Use "d", "m" o "y".');
    }
  
    const expirationDate = new Date(date.getTime() + durationInMillisecond);
  
    return expirationDate;
}

module.exports={
    currentDateTime, calculateExpirationDate
};