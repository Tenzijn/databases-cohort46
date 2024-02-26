USE db_assignment;

DROP TABLE IF EXISTS research_Papers;
-- Create another table, called research_Papers with the following fields: (paper_id, paper_title, conference, publish_date, ...)
CREATE TABLE IF NOT EXISTS research_Papers(
	paper_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	paper_title VARCHAR(100) NOT NULL,
	conference VARCHAR(100) NOT NULL,
	publish_date DATE NOT NULL,
	author_id INT,
	FOREIGN KEY (author_id) REFERENCES authors(author_id)
);

INSERT INTO research_Papers (paper_title, conference, publish_date)
VALUES
('Paper 1', 'Conference 1', '2022-01-01'),
('Paper 2', 'Conference 2', '2022-01-01'),
('Paper 3', 'Conference 3', '2022-01-01'),
('Paper 4', 'Conference 4', '2022-01-01'),
('Paper 5', 'Conference 5', '2022-01-01'),
('Paper 6', 'Conference 6', '2022-01-01'),
('Paper 7', 'Conference 7', '2022-01-01'),
('Paper 8', 'Conference 8', '2022-01-01'),
('Paper 9', 'Conference 9', '2022-01-01'),
('Paper 10', 'Conference 10', '2022-01-01'),
('Paper 11', 'Conference 11', '2022-01-01'),
('Paper 12', 'Conference 12', '2022-01-01'),
('Paper 13', 'Conference 13', '2022-01-01'),
('Paper 14', 'Conference 14', '2022-01-01'),
('Paper 15', 'Conference 15', '2022-01-01'),
('Paper 16', 'Conference 16', '2022-01-01'),
('Paper 17', 'Conference 17', '2022-01-01'),
('Paper 18', 'Conference 18', '2022-01-01'),
('Paper 19', 'Conference 19', '2022-01-01'),
('Paper 20', 'Conference 20', '2022-01-01'),
('Paper 21', 'Conference 21', '2022-01-01'),
('Paper 22', 'Conference 22', '2022-01-01'),
('Paper 23', 'Conference 23', '2022-01-01'),
('Paper 24', 'Conference 24', '2022-01-01'),
('Paper 25', 'Conference 25', '2022-01-01'),
('Paper 26', 'Conference 26', '2022-01-01'),
('Paper 27', 'Conference 27', '2022-01-01'),
('Paper 28', 'Conference 28', '2022-01-01'),
('Paper 29', 'Conference 29', '2022-01-01'),
('Paper 30', 'Conference 30', '2022-01-01');

UPDATE research_Papers SET author_id = ROUND(RAND() * (16-1)+1);