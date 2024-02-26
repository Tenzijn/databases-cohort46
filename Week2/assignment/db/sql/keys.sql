USE db_assignment;

DROP TABLE IF EXISTS authors;

CREATE TABLE IF NOT EXISTS authors(
	author_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	author_name VARCHAR(100) NOT NULL,
	university VARCHAR(100) NOT NULL,
	dob DATE NOT NULL,
	h_index INT NOT NULL,
	gender VARCHAR(10) NOT NULL
);

ALTER TABLE authors
ADD COLUMN mentor INT, 
ADD FOREIGN KEY (mentor) REFERENCES authors(author_id);

INSERT INTO authors(author_name, university, dob, h_index, gender)
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
('Mason Wilson', 'University of XYZ', '1995-08-20', 4, 'Male');

UPDATE authors SET mentor = ROUND(RAND() * (16-1)+1);
