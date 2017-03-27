# query-builder-client

A web interface to build custom queries for the Knowledge Store and generate datafiles that can be
visualized with the Storyteller interface.

# Full QueryBuilder / Knowledgestore visualization system

The full system consists of 6 main parts:

0. KnowledgeStore
    - RDF triple store. The NewsReader KnowledgeStore is a scalable, fault-tolerant, and Semantic Web grounded storage system to jointly store, manage, retrieve, and semantically query, both structured and unstructured data (see https://knowledgestore.fbk.eu/).
1. QueryBuilder Preprocessing (https://github.com/NLeSC-Storyteller/query-builder-preprocessing)
    - written in python
    - uses cltl/Storyteller to get an overview of possible queries from the knowledgestore
    - processes the overview into a sqlite3 database that can be used by the server.
2. QueryBuilder Server (https://github.com/NLeSC-Storyteller/query-builder-server)
    - written in javascript, with express.js + sqlite3 database
    - incudes a custom database trigger written in C on INSERT statements to the queries table.
    - upon receiving a new query string from QueryBuilder, the Server
        - stores the received query in a database
        - runs the received query against the KnowledgeStore using the QueryBuilder Daemon, which updates the list of previous queries and their results, indexed by an identifier.
3. QueryBuilder Daemon (https://github.com/NLeSC-Storyteller/query-builder-daemon)
    - written in Java with Xenon (https://github.com/NLeSC/Xenon)
    - receives requests for knowledgestore queries from the database trigger in the server.
    - queries the Knowledgestore using cltl/Storyteller
    - updates the list of previous queries and their results, indexed by an identifier.
4. QueryBuilder Client (this repository)
    - written in Typescript and React.js
    - shows a list of all possible concepts, actors or events from the server
    - helps the user to compose a sparql query to run against the KnowledgeStore by selecting items of interest, be it concepts, actors, events, etc.
5. UncertaintyVisualization (https://github.com/NLeSC/UncertaintyVisualization/)
    - written in javascript and Angular 1 (legacy)
    - allows the user to select from a list of previously run queries (communicates with Server) to select one for visualization.
    - visualizes the results selected




