***database table structure:***<br/><br/>
| Table Name | Columns                                                   | Key        |
|------------|-----------------------------------------------------------|------------|
| tasks      | id (integer), customer_id (integer), broker_id (integer),  | id (PK)    |
|            | title (character(100)), body (character(2500)),           |            |
|            | date (timestamp without time zone), outcome (character(2500)), |          |
|            | completed (boolean)                                      |            |
| customer   | id (integer), name (character varying(255))               | id (PK)    |
| notes      | id (integer), customer_id (integer), broker_id (integer),  | id (PK)    |
|            | title (character(100)), body (character(2500)),           |            |
|            | date (timestamp without time zone)                        |            |
<br/>

<code>CREATE TABLE tasks (
    id integer NOT NULL,
    customer_id integer NOT NULL,
    broker_id integer NOT NULL,
    title character(100),
    body character(2500),
    date timestamp without time zone,
    outcome character(2500),
    completed boolean,
    PRIMARY KEY (id)
);</code><br/><br/>
<code>CREATE TABLE customer (
    id integer NOT NULL,
    name character varying(255),
    PRIMARY KEY (id)
);</code><br/><br/>
<code>CREATE TABLE notes (
    id integer NOT NULL,
    customer_id integer NOT NULL,
    broker_id integer NOT NULL,
    title character(100),
    body character(2500),
    date timestamp without time zone,
    PRIMARY KEY (id)
);</code><br/>

bankList from  https://m.rbi.org.in/scripts/bs_viewcontent.aspx?Id=3657



<h1>
    mobile number & password
</h1>
<p>
    9360748965
</p>
<p>
    QWERTqwert1234
</p>