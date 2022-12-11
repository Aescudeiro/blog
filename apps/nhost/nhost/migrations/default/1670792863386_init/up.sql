SET check_function_bodies = false;
CREATE TABLE public.content (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    title text,
    body text NOT NULL,
    owner_id uuid NOT NULL,
    parent_id uuid,
    ancestor_id uuid
);
CREATE OR REPLACE FUNCTION public.getallcontentchilds(parentid uuid) RETURNS SETOF public.content
    LANGUAGE sql STABLE
    AS $$
    WITH RECURSIVE children AS (
        SELECT
            id,
            created_at,
            updated_at,
            title,
            body,
            owner_id,
            parent_id,
            ancestor_id
        FROM
            content
        WHERE
            id = parentId
        UNION ALL
            SELECT
                content.id,
                content.created_at,
                content.updated_at,
                content.title,
                content.body,
                content.owner_id,
                content.parent_id,
                content.ancestor_id
            FROM
                content
            INNER JOIN
                children ON content.parent_id = children.id
    )
    SELECT
        children.id,
        children.created_at,
        children.updated_at,
        children.title,
        children.body,
        children.owner_id,
        children.parent_id,
        children.ancestor_id
    FROM
        children
    ORDER BY
        children.created_at ASC
$$;
CREATE OR REPLACE FUNCTION public.set_current_timestamp_updated_at() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
DECLARE
  _new record;
BEGIN
  _new := NEW;
  _new."updated_at" = NOW();
  RETURN _new;
END;
$$;
ALTER TABLE ONLY public.content
    ADD CONSTRAINT content_pkey PRIMARY KEY (id);
CREATE TRIGGER set_public_content_updated_at BEFORE UPDATE ON public.content FOR EACH ROW EXECUTE FUNCTION public.set_current_timestamp_updated_at();
COMMENT ON TRIGGER set_public_content_updated_at ON public.content IS 'trigger to set value of column "updated_at" to current timestamp on row update';
ALTER TABLE ONLY public.content
    ADD CONSTRAINT content_origin_id_fkey FOREIGN KEY (ancestor_id) REFERENCES public.content(id) ON UPDATE RESTRICT ON DELETE CASCADE;
ALTER TABLE ONLY public.content
    ADD CONSTRAINT content_owner_id_fkey FOREIGN KEY (owner_id) REFERENCES auth.users(id) ON UPDATE RESTRICT ON DELETE CASCADE;
ALTER TABLE ONLY public.content
    ADD CONSTRAINT content_parent_id_fkey FOREIGN KEY (parent_id) REFERENCES public.content(id) ON UPDATE RESTRICT ON DELETE CASCADE;
