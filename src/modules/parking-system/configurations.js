exports.PAYMENT_TYPES = {
  CASH: 'Cash',
  CASHLESS: {
    GCASH: 'GCash',
  },
};

exports.PARKING_CONFIGURATIONS = {
  '2W': {
    vehicleType: '2 wheels',
    flatRate: 40,
    flatHour: 3,
    succedingRate: 20,
    succedingHour: 1,
  },
  '4W': {
    vehicleType: '4 wheels',
    flatRate: 60,
    flatHour: 3,
    succedingRate: 30,
    succedingHour: 1,
  },
};

exports.PARKING_BUILDING_DETAILS = {
  entrances: [
    {
      name: 'E1',
      locationLevel: 1,
    },
    {
      name: 'E2',
      locationLevel: 2,
    },
  ],
  exits: [
    {
      name: 'Exit1',
      locationLevel: 1,
    },
    {
      name: 'Exit2',
      locationLevel: 2,
    },
    {
      name: 'Exit3',
      locationLevel: 3,
    },
  ],
};

exports.PARKING_SLOTS = [
  {
    level: 1,
    vacant: 60,
    occupied: 0,
    pwdSlots: [1, 10, 11, 17, 26, 28, 30, 23],
  },
  {
    level: 2,
    vacant: 50,
    occupied: 0,
    pwdSlots: [2, 11, 12, 18, 27, 29, 31, 40],
  },
  {
    level: 3,
    vacant: 50,
    occupied: 0,
    pwdSlots: [2, 14, 14, 19, 28, 30, 31, 41],
  },
  {
    level: 4,
    vacant: 50,
    occupied: 0,
    pwdSlots: [4, 15, 19, 20, 23, 33, 32, 40],
  },
  {
    level: 5,
    vacant: 50,
    pwdSlots: [],
  },
];
