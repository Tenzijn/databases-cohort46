```
+-----------+---------------+----------------+-----------+-------------+------------+-------------------+-----------+------------------+
| member_id | member_name   | member_address | dinner_id | dinner_date | venue_code | venue_description | food_code | food_description |
+-----------+---------------+----------------+-----------+-------------+------------+-------------------+-----------+------------------+
|         1 | Amit          | 325 Max park   | D00001001 | 2020-03-15  | B01        | Grand Ball Room   | C1, C2    | Curry, Cake      |
|         2 | Ben           | 24 Hudson lane | D00001002 | 2020/03/15  | B02        | Zoku Roof Top     | S1, C2    | Soup, Cake       |
|         3 | Cristina      | 516 6th Ave    | D00001002 | 2020/03/15  | B02        | Zoku Roof Top     | S1, C2    | Soup, Cake       |
|         4 | Dan           | 89 John St     | D00001003 | 20-03-2020  | B03        | Goat Farm         | P1, T1, M1| Pie, Tea, Mousse |
|         1 | Amit          | 325 Max park   | D00001003 | 20-03-2020  | B03        | Goat Farm         | P1, T1, M1| Pie, Tea, Mousse |
|         3 | Cristina      | 516 6th Ave    | D00001004 | Mar 25 '20  | B04        | Mama's Kitchen    | F1, M1    | Falafal, Mousse  |
|         5 | Gabor         | 54 Vivaldi St  | D00001005 | Mar 26 '20  | B05        | Hungry Hungary    | G1, P2    | Goulash, Pasca   |
|         6 | Hema          | 9 Peter St     | D00001003 | 01-04-2020  | B03        | Goat Farm         | P1, T1, M1| Pie, Tea, Mousse |
+-----------+---------------+----------------+-----------+-------------+------------+-------------------+-----------+------------------+
```

1. What columns violate 1NF?

   - `food_code` and `food_description` violate 1NF. They are repeating groups and should be extracted to a separate table.

2. What entities do you recognize that could be extracted?

   - `food_code` and `food_description` can be extracted to a separate table.
   - `venue_code` and `venue_description` can be extracted to a separate table.
   - `dinner_id` and `dinner_date` can be extracted to a separate table.
   - `member_id`, `member_name`, and `member_address` can be extracted to a separate table.
   - `dinner_id` and `venue_code` can be extracted to a separate table.

3. Name all the tables and columns that would make a 3NF compliant solution.

   - `member` table

     - `member_id`
     - `member_name`
     - `member_address`

   - `dinner` table

     - `dinner_id`
     - `dinner_date`

   - `venue` table

     - `venue_code`
     - `venue_description`

   - `food` table

     - `food_code`
     - `food_description`

   - `dinner_venue` table

     - `dinner_id`
     - `venue_code`

   - `member_dinner` table

     - `member_id`
     - `dinner_id`

   - `member_food` table

   - `member_id`
   - `food_code`

   - `dinner_food` table

   - `dinner_id`
   - `food_code`
