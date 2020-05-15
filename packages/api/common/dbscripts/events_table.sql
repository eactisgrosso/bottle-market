CREATE TABLE events (aggregateId BINARY(16) PRIMARY KEY, aggregateType VARCHAR(255), sequence INT, eventType VARCHAR(255), eventData VARCHAR(8000), userId INT, timestamp DATETIME);
