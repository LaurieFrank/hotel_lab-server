use hotel;
db.dropDatabse();

db.rooms.insertMany([
  {
    name: "Mark Payne",
    email: "iloveponies@hotmail.com",
    checkIn: false
  },
  {
    name: "Laurie Frank",
    email: "princesslozzles@hotmail.com",
    checkIn: false
  },
  {
    name: "Nick Clegg",
    email: "currentlyunemployed@hotmail.com",
    checkIn: true
  }
]);
