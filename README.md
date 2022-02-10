# COVID stats API

# ABOUT:

    A backend API that fetches data from external API (COVID stats - URL: https://api.covidtracking.com/v1/states/{state}/current.json), and serves them as a response.
    
    Along with providing the data, API generates a unique id for the response and saves it into a mongoDB database using mongoose ORM. This response can be fetched again using the id, directly from the database.

# TECHNOLOGIES:

    JavaScript, NodeJS, Express, MongoDB (Mongoose), Docker, Babel.
    
# INSTALLING:

    1. Download the repo: gh repo clone skymastery/covidapi
    
    2. Launch docker on your machine
    
    3. Being in the root folder of the project (covid_api), type the following command in terminal: docker-compose up
    
    4. Once the containers (app + db) had succesfully been launched, use Postman or similar software to communicate with the API through HTTP requests.
    


# INSTRUCTIONS:

   *Possible routes:
    
        GET http://localhost:80/stats?state= -- enter a 2-letter abbreviation of a US state (i.e. ca for California) as a value of the "state" query parameter to get the data about the state covid stats from the external API, and an id of the document that has been saved to db with this data;
        
        GET http://localhost:80/stats/all -- fetch all saved entries from database (all previous requests). Add limit and/or skip request parameters for pagination (i.e. ?limit=5&skip=1);
        
        GET http://localhost:80/stats/:id -- fetch a specific document by its ID (paste the ID instead of ":id");
        
        DELETE http://localhost:80/stats/:id -- delete a specific document by its ID from db (paste the ID instead of ":id");
