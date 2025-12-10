

User --> Frontend : clicks "Add Recipe" button
Frontend --> Backend : sends POST /recipes with recipe data
Backend --> DB : SQL Ensert new recipe
DB --> Backend : returns success response   
Backend --> Frontend : 201 Created
Frontend --> User : displays "Recipe added successfully" message

User --> Frontend : clicks "specific recipe" 
Frontend --> Backend : sends GET /recipes/{id}
Backend --> DB : SQL Select recipe where id={id}
DB --> Backend : returns recipe data
Backend --> Frontend : 200 OK with recipe data
Frontend --> User : displays recipe details

User --> Frontend : clicks "Edit Recipe" button
Frontend --> Backend : sends PUT /recipes/{id} with updated data
Backend --> DB : SQL Update recipe where id={id}
DB --> Backend : returns success response
Backend --> Frontend : 200 OK
Frontend --> User : displays "Recipe updated successfully" message

User --> Frontend : clicks "Delete Recipe" button
Frontend --> Backend : sends DELETE /recipes/{id}
Backend --> DB : SQL Delete recipe where id={id}
DB --> Backend : returns success response
Backend --> Frontend : 204 No Content
Frontend --> User : displays "Recipe deleted successfully" message