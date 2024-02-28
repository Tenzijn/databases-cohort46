# Prep exercise week 3

As a preparation step for the upcoming Q&A, you need to work on the following exercise, which is based on the prep
exercise of the previous week.

## Exercise

Last week you created an ERD for the database for storing food recipes.
How can you normalize your database based on what you learned this week?
In particular, try answering following questions and provide table definitions from the last week
and this week to explain the changes.

- Was your database already in 2NF / 3 NF?

  - Yes it was in 3NF already as we had no transitive dependencies and all the columns were dependent on the primary key.

- What changes did you have to do to normalize your database?
  - There isn't much to change in the database as it is already in 3NF.

## Discussion

- If you want to add thousands of recipes to your database, what challenges do you foresee?

  - The main challenge would be the storage of the database. As the number of recipes increases, the size of the database would also increase. This would require more storage space and also more processing power to handle the increased number of records.

- Try to write answers to these questions in text, provide queries and commands when necessary.
  - No queries or commands are necessary as the database is already in 3NF and there are no changes to be made.
