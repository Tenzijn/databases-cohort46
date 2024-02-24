select * from recipes;
select * from ingredients;
select * from categories;
select * from steps;

select * from recipes where name = 'No_Bake_Cheesecake';


-- join recipes and categories and ingredients



/*
--Can you make queries to get:
  - All the vegetarian recipes with potatoes
  - All the cakes that do not need baking
   - All the vegan and Japanese recipes
   */

--select from recipes where in categories is vagetarian and has recipe_id;


select * from recipes where categories_id = 1; 
