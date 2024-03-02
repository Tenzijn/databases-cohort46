USE db_assignment;

SHOW TABLES;

-- 1. Write a query that prints names of all authors and their corresponding mentors.

SELECT a.author_name, m.author_name as mentor_name 
FROM authors a
JOIN authors m
	ON a.mentor = m.author_id;


-- 2. Write a query that prints all columns of authors and their published paper_title. If there is an author without any research_Papers, print the information of that author too.

SELECT a.*, rp.paper_title 
FROM authors a
LEFT JOIN research_papers rp
	ON a.author_id = rp.author_id;


-- 3.4
	-- 1. All authors and the number of research paper that they wrote.
SELECT author_name, COUNT(paper_title) as research_papers
FROM authors a
LEFT JOIN research_papers rp
	ON a.author_id = rp.author_id
GROUP BY author_name;

	-- 2. Sum of the research papers published by all female authors.
SELECT DISTINCT a.gender,COUNT( DISTINCT rp.paper_title) as research_papers 
FROM authors a
LEFT JOIN research_papers rp
	ON a.author_id = rp.author_id
GROUP BY a.gender;
-- HAVING a.gender = 'Female';

	-- 3. Average of the h-index of all authors per university.
SELECT university, AVG(h_index) as avg_h_index
FROM authors
GROUP BY university;

	-- 4. Sum of the research papers of the authors per university.
SELECT university, COUNT(DISTINCT paper_title) as research_papers
FROM authors a
LEFT JOIN research_papers rp
	ON a.author_id = rp.author_id
GROUP BY university;

	-- 5. Minimum and maximum of the h-index of all authors per university.
SELECT university, MIN(h_index) as min_h_index, MAX(h_index) as max_h_index
FROM authors
GROUP BY university;
