import queryExecution from '../util/queryExecution.js';

export const authorsAndMentors = async () => {
  queryExecution(`
  	SELECT a.author_name, m.author_name as mentor_name 
	FROM authors a
	JOIN authors m
		ON a.mentor = m.author_id;
		`);
};

export const authorsAndPublications = async () => {
  queryExecution(`
	SELECT a.*, rp.paper_title 
	FROM authors a
	LEFT JOIN research_papers rp
		ON a.author_id = rp.author_id;
		`);
};

export const authorsAndPublicationsCount = async () => {
  queryExecution(`
	SELECT author_name, COUNT(paper_title) as research_papers
	FROM authors a
	LEFT JOIN research_papers rp
		ON a.author_id = rp.author_id
	GROUP BY author_name;
		`);
};

export const researchPapersCountByFemaleAuthors = async () => {
  queryExecution(`
	SELECT a.gender, COUNT( DISTINCT rp.paper_title) as unique_research_papers 
	FROM authors a
	LEFT JOIN research_papers rp
		ON a.author_id = rp.author_id
	GROUP BY a.gender
	HAVING a.gender = 'Female';
		`);
};

export const avgHIndexByUniversity = async () => {
  queryExecution(`
  	SELECT university, AVG(h_index) as avg_h_index
	FROM authors
	GROUP BY university;
		`);
};

export const totalResearchPapersByUniversity = async () => {
  queryExecution(`
	SELECT university, COUNT(DISTINCT paper_title) as research_papers
	FROM authors a
	LEFT JOIN research_papers rp
		ON a.author_id = rp.author_id
	GROUP BY university;
		`);
};

export const minAndMaxHIndexByUniversity = async () => {
  queryExecution(`
	SELECT university, MIN(h_index) as min_h_index, MAX(h_index) as max_h_index
	FROM authors
	GROUP BY university;
		`);
};
