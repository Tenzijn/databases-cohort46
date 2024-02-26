import queryExecution from '../util/queryExecution.js';

export const addAuthorsTable = async () => {
  const query = `
		CREATE TABLE IF NOT EXISTS authors (
			author_id INT AUTO_INCREMENT PRIMARY KEY,
			author_name VARCHAR(50),
			university VARCHAR(100) NOT NULL,
			dob DATE NOT NULL,
			h_index INT NOT NULL,
			gender VARCHAR(10) NOT NULL);`;
  await queryExecution(query);
};

export const addMentorToAuthorsTable = async () => {
  const query = `ALTER TABLE authors ADD COLUMN mentor INT, ADD FOREIGN KEY (mentor) REFERENCES authors(author_id);`;
  await queryExecution(query);
};

export const addDataInAuthorTable = async () => {
  const query = ` INSERT INTO authors(author_name, university, dob, h_index, gender)
	VALUES
		('John Doe', 'University of XYZ', '1990-01-01', 5, 'Male'),
		('Jane Smith', 'University of ABC', '1985-05-15', 3, 'Female'),
		('John Smith', 'University of ABC', '1985-05-15', 3, 'Male'),
		('Sarah Johnson', 'University of XYZ', '1995-08-20', 4, 'Female'),
		('Michael Johnson', 'University of XYZ', '1995-08-20', 4, 'Male'),
		('Emily Davis', 'University of XYZ', '1995-08-20', 4, 'Female'),
		('David Wilson', 'University of XYZ', '1995-08-20', 4, 'Male'),
		('Olivia Wilson', 'University of XYZ', '1995-08-20', 4, 'Female'),
		('James Brown', 'University of XYZ', '1995-08-20', 4, 'Male'),	
		('Emma Brown', 'University of XYZ', '1995-08-20', 4, 'Female'),
		('Daniel Miller', 'University of XYZ', '1995-08-20', 4, 'Male'),
		('Sophia Miller', 'University of XYZ', '1995-08-20', 4, 'Female'),
		('Benjamin Davis', 'University of XYZ', '1995-08-20', 4, 'Male'),
		('Chloe Davis', 'University of XYZ', '1995-08-20', 4, 'Female'),
		('Mason Wilson', 'University of XYZ', '1995-08-20', 4, 'Male'),
		('Mason Wilson', 'University of XYZ', '1995-08-20', 4, 'Male');`;
  await queryExecution(query);
};

export const addMentorsDataInAuthorsTable = async () => {
  const query = `UPDATE authors SET mentor = ROUND(RAND() * (16-1)+1);`;
  await queryExecution(query);
};
