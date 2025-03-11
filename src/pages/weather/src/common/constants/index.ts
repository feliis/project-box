export const weatherLabels: Record<number, string> = {
  0: "Ясное небо",
  1: "Преимущественно ясно",
  2: "Переменная облачность",
  3: "Пасмурно",
  45: "Туман",
  48: "Инейный туман",
  51: "Морось слабая",
  53: "Морось умеренная",
  55: "Морось сильная",
  56: "Ледяная морось слабая",
  57: "Ледяная морось сильная",
  61: "Дождь слабый",
  63: "Дождь умеренный",
  65: "Дождь сильный",
  66: "Ледяной дождь слабый",
  67: "Ледяной дождь сильный",
  71: "Снегопад слабый",
  73: "Снегопад умеренный",
  75: "Снегопад сильный",
  77: "Снежная крупа",
  80: "Ливень слабый",
  81: "Ливень умеренный",
  82: "Ливень сильный",
  85: "Снегопад слабый",
  86: "Снегопад сильный",
  95: "Гроза",
  96: "Гроза с небольшим градом",
  99: "Гроза с сильным градом"
};


const weatherGroups = {
  clear: [0, 1],
  cloud: [2, 3, 45, 48],
  rain: [51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82],
  snow: [71, 73, 75, 77, 85, 86],
  thunderstorm: [95, 96, 99]
};


export const weatherCodes: Record<number, string> = Object.fromEntries(
  Object.entries(weatherGroups).flatMap(([status, codes]) => codes.map(code => [code, status]))
);

export const statusColors: Record<string, string> = {
  clear: '#ff8e27',
  cloud: '#8EC1DD',
  wind: '#27B1FF',
  rain: '#4E8DB1',
  snow: '#8EC1DD',
  thunderstorm: '#BF8EDD',
  default: '#000000'
};

export const windSpeedUnitsTranslation: Record<string, string> = {
  'km/h': 'км/ч',
  'm/s': 'м/с',
};

