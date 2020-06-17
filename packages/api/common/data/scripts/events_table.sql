CREATE TABLE events
("aggregateId" uuid primary key, 
 "aggregateType" varchar(255), 
 sequence int, 
 "eventType" varchar(255), 
 "eventData" json, 
 "userId" uuid, 
 timestamp timestamp);