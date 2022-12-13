CREATE OR REPLACE FUNCTION public.searchcontents(search text)
 RETURNS SETOF content
 LANGUAGE sql
 STABLE
AS $function$
    SELECT *
    FROM content
    WHERE
      search <% (title || ' ' || body)
    ORDER BY
      similarity(search, (title || ' ' || body)) DESC
    LIMIT 5;
$function$;
