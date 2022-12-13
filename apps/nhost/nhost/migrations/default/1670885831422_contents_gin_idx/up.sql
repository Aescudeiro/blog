CREATE INDEX contents_gin_idx ON content
USING GIN ((title || ' ' || body) gin_trgm_ops);
