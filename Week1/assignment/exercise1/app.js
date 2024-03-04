import mysql from 'mysql2/promise';

const db = mysql.createPool({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
});

const executeQuery = async (query) => {
  try {
    await db.query(query);
  } catch (err) {
    console.log(err);
  }
};

const createDatabase = async () => {
  try {
    await executeQuery('DROP DATABASE IF EXISTS meetup');
    await executeQuery('CREATE DATABASE IF NOT EXISTS meetup');
    await executeQuery('USE meetup');
    console.log('Database created successfully');
  } catch (err) {
    console.log(err);
  }
};

const createTable = async () => {
  try {
    await executeQuery(
      'CREATE TABLE IF NOT EXISTS Invitee (invitee_no INT PRIMARY KEY, invitee_name VARCHAR(255), invited_by VARCHAR(255))'
    );
    await executeQuery(
      'CREATE TABLE IF NOT EXISTS Room (room_no INT PRIMARY KEY, room_name VARCHAR(255), floor_no INT)'
    );
    await executeQuery(
      'CREATE TABLE IF NOT EXISTS Meeting (meeting_no INT PRIMARY KEY, meeting_title VARCHAR(255), starting_time DATE, ending_time DATE, room_no INT, FOREIGN KEY (room_no) REFERENCES Room(room_no))'
    );

    console.log('Tables created successfully');
  } catch (err) {
    console.log(err);
  }
};

//Insert 5 rows into each table with relevant fields. Find a way to create the data for those fields

const insertData = async () => {
  try {
    await executeQuery(
      'INSERT INTO Invitee VALUES (1, "John Doe", "Jane Doe")'
    );
    await executeQuery(
      'INSERT INTO Invitee VALUES (2, "Jane Doe", "John Doe")'
    );
    await executeQuery(
      'INSERT INTO Invitee VALUES (3, "John Smith", "Jane Smith")'
    );
    await executeQuery(
      'INSERT INTO Invitee VALUES (4, "Jane Smith", "John Smith")'
    );
    await executeQuery(
      'INSERT INTO Invitee VALUES (5, "John Doe", "Jane Smith")'
    );
    await executeQuery('INSERT INTO Room VALUES (1, "Meeting Room 1", 1)');
    await executeQuery('INSERT INTO Room VALUES (2, "Meeting Room 2", 2)');
    await executeQuery('INSERT INTO Room VALUES (3, "Meeting Room 3", 3)');
    await executeQuery('INSERT INTO Room VALUES (4, "Meeting Room 4", 4)');
    await executeQuery('INSERT INTO Room VALUES (5, "Meeting Room 5", 5)');
    await executeQuery(
      'INSERT INTO Meeting VALUES (1, "Team Meeting", "2021-01-01 09:00:00", "2021-01-01 10:00:00", 1)'
    );
    await executeQuery(
      'INSERT INTO Meeting VALUES (2, "Team Meeting", "2021-01-01 09:00:00", "2021-01-01 10:00:00", 2)'
    );
    await executeQuery(
      'INSERT INTO Meeting VALUES (3, "Team Meeting", "2021-01-01 09:00:00", "2021-01-01 10:00:00", 3)'
    );
    await executeQuery(
      'INSERT INTO Meeting VALUES (4, "Team Meeting", "2021-01-01 09:00:00", "2021-01-01 10:00:00", 4)'
    );
    await executeQuery(
      'INSERT INTO Meeting VALUES (5, "Team Meeting", "2021-01-01 09:00:00", "2021-01-01 10:00:00", 5)'
    );
    console.log('Data inserted successfully');
  } catch (err) {
    console.log(err);
  }
};

try {
  await createDatabase();
  await createTable();
  await insertData();
} catch (err) {
  console.log(err);
}
