-- Create a function to execute SQL commands
CREATE OR REPLACE FUNCTION exec_sql(query text)
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  EXECUTE query;
  RETURN 'OK';
EXCEPTION
  WHEN others THEN
    RETURN 'ERROR: ' || SQLERRM;
END;
$$;
