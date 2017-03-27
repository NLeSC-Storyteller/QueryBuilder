# nlescstoryteller/query-builder-client
A web interface to build custom queries for the Knowledge Store and generate datafiles that can be visualized with the Storyteller interface.

## About
The QueryBuilder client is made using the https://facebook.github.io/react/ framework and uses http://redux.js.org/ for state management. It is written in Typescript. While this repository is in principle standalone and will operate, it is recommended to be used with the entire software stack, as detailed below. 

## Installation
### Automated installation
Please note that the installation and execution process is usually fully automated by Docker and Docker-Compose. For information on installing the full stack, see the https://github.com/NLeSC-Storyteller/StoryTeller repository for more information.

### Manual installation
**With Docker**  
A Dockerfile has been provided for your convenience. Please refer to https://www.docker.com/ for installation of docker.
```bash
    docker build -t nlescstoryteller/query-builder-client
```

**With Node Package Manager**  
The requirements for this single repository are easily installed using the node package manager http://nodejs.org/. 
After the installation of node package manager, the following bash command may be used to install the system:
```bash
    npm install    
```

## Useage

### Automated
Please note that the installation and execution process is usually fully automated by Docker and Docker-Compose. For information on installing the full stack, see the https://github.com/NLeSC-Storyteller/StoryTeller repository for more information.

### Manual
**With Docker**  
```bash
    docker run nlescstoryteller/query-builder-client
```

**With Node Package Manager**  
```bash
    npm start
```

The user is expected to find the QueryBuilder client interface at http://localhost:3000/

## Troubleshooting

The user may encounter an interface with one or more empty lists under the list categories. This is probably due to a malfuction in the preprocessing steps. Please see the https://github.com/NLeSC-Storyteller/query-builder-preprocessing repository for tips on how to resolve these issues.

### Connect to the docker container for troubleshooting
**linux**
```bash
    sudo docker exec -v data:/data -it nlescstoryteller/query-builder-client /bin/bash
```

**windows**
```bash
    winpty docker exec -v data:/data -ti nlescstoryteller/query-builder-client //bin/bash
```

# The Full QueryBuilder / Knowledgestore visualization system

The full system consists of 7 parts:

0. KnowledgeStore
    - RDF triple store. The NewsReader KnowledgeStore is a scalable, fault-tolerant, and Semantic Web grounded storage system to jointly store, manage, retrieve, and semantically query, both structured and unstructured data (see https://knowledgestore.fbk.eu/).
1. cltl/StoryTeller (https://github.com/cltl/StoryTeller)
    - Support library for querying the knowledge store and creating JSON data from the results.
2. QueryBuilder Preprocessing (https://github.com/NLeSC-Storyteller/query-builder-preprocessing)
    - written in python
    - uses cltl/Storyteller to get an overview of possible queries from the knowledgestore
    - processes the overview into a sqlite3 database that can be used by the server.
3. QueryBuilder Server (https://github.com/NLeSC-Storyteller/query-builder-server)
    - written in javascript, with express.js + sqlite3 database
    - incudes a custom database trigger written in C on INSERT statements to the queries table.
    - upon receiving a new query string from QueryBuilder, the Server
        - stores the received query in a database
        - runs the received query against the KnowledgeStore using the QueryBuilder Daemon, which updates the list of previous queries and their results, indexed by an identifier.
4. QueryBuilder Daemon (https://github.com/NLeSC-Storyteller/query-builder-daemon)
    - written in Java with Xenon (https://github.com/NLeSC/Xenon)
    - receives requests for knowledgestore queries from the database trigger in the server.
    - queries the Knowledgestore using cltl/Storyteller
    - updates the list of previous queries and their results, indexed by an identifier.
5. QueryBuilder Client (this repository)
    - written in Typescript and React.js
    - shows a list of all possible concepts, actors or events from the server
    - helps the user to compose a sparql query to run against the KnowledgeStore by selecting items of interest, be it concepts, actors, events, etc.
6. UncertaintyVisualization (https://github.com/NLeSC/UncertaintyVisualization/)
    - written in javascript and Angular 1 (legacy)
    - allows the user to select from a list of previously run queries (communicates with Server) to select one for visualization.
    - visualizes the results selected




