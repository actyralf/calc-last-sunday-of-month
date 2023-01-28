const monthLengths = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

// Berechnet die Tage zwischen einem gegebenen Datum und dem 01.01.2000
function getDaysSince2k({ d, m, y }) {
  let yearOffset = (y - 2000) * 365; // Anzahl der Jahre seit 2000 * 365
  for (let i = 2000; i < y; i++) {
    if (i % 4 === 0 && i !== 2100) {
      yearOffset += 1; // Für jedes Schaltjahr dazwischen immer noch ein Tag dazu
    }
  }
  // Für das aktuelle Jahr nur dann ein Tag dazu, wenn es ein Schaltjahr ist UND der Monat größer Februar ist
  if (m > 2 && y % 4 === 0) {
    yearOffset += 1;
  }
  let monthOffset = 0;
  for (let i = 1; i < m; i++) {
    monthOffset += monthLengths[i - 1]; // Anzahl der Monate * den entsprechenden Tagen
  }
  const dayOffset = d - 1; // Tag - 1
  return yearOffset + monthOffset + dayOffset;
}

// Erzeugt aus einem date string im Format "dd.mm.yyyy" ein Datumsobjekt, z.B. {d:2,m:3:y:2014}
function splitDate(dateString) {
  return {
    d: Number(dateString.slice(0, 2)),
    m: Number(dateString.slice(2, 4)),
    y: Number(dateString.slice(4, 8)),
  };
}

// Berechnet den letzten Sonntag im Monat
function getRentDay(dateString) {
  const date = splitDate(dateString); // date string in Datumsobjekt umwandeln
  let lastDayInMonth = monthLengths[date.m - 1]; // Letzten Tag des Monats aus Array holen
  // Falls das übergebene Jahr ein Schaltjahr ist UND der Monat Februar, ist der letzte Tag im Monat der 29.
  if (date.y % 4 === 0 && date.month === 2) {
    lastDayInMonth = 29;
  }
  const daysSince2kEOM = getDaysSince2k({ ...date, d: lastDayInMonth }); // Anzahl der Tage vom 01.01.2000 bis zum letzten Tag des Monats berechnen
  return { ...date, d: lastDayInMonth - ((daysSince2kEOM - 1) % 7) };
  // Der 01.01.2000 war ein Samstag, deshalb ziehen wir von der Anzahl der Tage einen ab, damit haben wir die Anzahl der Tage
  // zwischen dem 02.01.2000 (Sonntag) und dem letzten Tag des Monats des übergebenen Datums
  // Diese Anzahl rechnen wir modulo 7 und ziehen das Ergebnis vom letzten Tag des Monats des übergebenen Datums ab
  // Ist der letzte Tag ein Sonntag, wird 0 abgezogen, ist der letzte Tag ein Montag, wird 1 abgezogen usw.
}

console.log(getRentDay("14022023"));
console.log(getRentDay("14022024"));
console.log(getRentDay("01022000"));

module.exports = {
  getDaysSince2k,
  splitDate,
  getRentDay,
};
