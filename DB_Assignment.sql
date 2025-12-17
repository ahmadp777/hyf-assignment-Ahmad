-- 1.How many tasks are in the task table?
SELECT COUNT(*) AS totalTasks FROM task;

-- 2.How many tasks in the task table do not have a valid due date?
SELECT COUNT(*) AS totalNotValidDueDateTasks 
FROM task 
WHERE due_date IS NULL;

-- 3.Find all the tasks that are marked as done. 
SELECT * FROM task
WHERE status_id IN (SELECT id FROM status WHERE name = 'Done');

-- 4.Find all the tasks that are not marked as done.
SELECT * FROM task
WHERE status_id IN (SELECT id FROM status WHERE name <> 'Done');
-- 5.Get all the tasks, sorted with the most recently created first.
SELECT * FROM task ORDER BY created DESC; 

-- 6.Get the single most recently created task.
SELECT * FROM task ORDER BY created DESC LIMIT 1;

-- 7.Get the title and due date of all tasks where the title or description contains database.
SELECT title, due_date FROM task 
WHERE LOWER(title) LIKE "%database%"
OR LOWER(description)  LIKE "%database%";

-- 8.Get the title and status (as text) of all tasks.
SELECT t.title , s.name AS status
FROM task t
INNER JOIN status s ON t.status_id = s.id;

-- 9.Get the name of each status, along with a count of how many tasks have that status.
SELECT s.name AS status , COUNT (*) AS totalSameStatusTasks
FROM status s
INNER JOIN task t ON t.status_id = s.id 
GROUP BY s.name;

-- 10.Get the names of all statuses, sorted by the status with most tasks first.
SELECT s.name AS status , COUNT (*) AS totalSameStatusTasks2
FROM status s
INNER JOIN task t ON t.status_id = s.id 
GROUP BY s.name
ORDER BY totalSameStatusTasks2 DESC;








