CREATE TABLE events
("aggregateId" uuid, 
 "aggregateType" varchar(255), 
 sequence int, 
 "eventType" varchar(255), 
 "eventData" json, 
 "userId" uuid, 
 timestamp timestamp,
 primary key ("aggregateId", sequence));