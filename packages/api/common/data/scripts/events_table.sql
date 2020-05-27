CREATE TABLE events (aggregateId BINARY(16), aggregateType VARCHAR(255), sequence INT, eventType VARCHAR(255), eventData json, userId INT, timestamp DATETIME, PRIMARY KEY(aggregateId, sequence));
