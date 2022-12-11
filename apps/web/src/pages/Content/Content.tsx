import { FC, useCallback, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  useGetContentQuery,
  useGetContentChildsQuery,
  useAddContentMutation,
} from '../../gql/graphql';
import { Box, Button, Typography } from '@mui/material';
import { Editor, Content as ContentComponent, UpVotes } from '../../components';
import { contentTreeBuilder } from './utils';
import { RenderChildrenTree } from './components';
import ModeCommentOutlinedIcon from '@mui/icons-material/ModeCommentOutlined';
import { useQueryClient } from '@tanstack/react-query';

export const Content: FC = () => {
  const { contentId } = useParams<{ contentId: string }>();
  const { data, isLoading, error } = useGetContentQuery({ contentId });
  const [reply, setReply] = useState('');
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const content = data?.content;
  const { data: childsData } = useGetContentChildsQuery({
    parentId: content?.parentId ?? contentId,
  });
  const childs = childsData?.getallcontentchilds;
  const addReply = useAddContentMutation();
  const queryClient = useQueryClient();

  const contentTree = useMemo(() => {
    const contentTree = [];

    if (childs && contentId) {
      contentTree.push(...contentTreeBuilder(childs, contentId));
    }

    return contentTree;
  }, [childs, contentId, contentTreeBuilder]);

  const handleAddReply = useCallback(() => {
    addReply.mutateAsync(
      {
        body: reply,
        parentId: contentId,
        ancestorId: content?.ancestorId ?? contentId,
      },
      {
        onSuccess: () => {
          setReply('');
          setIsEditorOpen(false);
          queryClient.invalidateQueries(['getContentChilds']);
        },
      }
    );
  }, [reply, contentId, content?.ancestorId]);

  const handleOpenEditor = () => {
    setIsEditorOpen(true);
  };

  const handleCloseEditor = () => {
    setIsEditorOpen(false);
  };

  if (isLoading) {
    return <Box>Loading...</Box>;
  }

  if (error) {
    return <Box>Error</Box>;
  }

  if (!content) {
    return <Box>Not found</Box>;
  }

  return (
    <Box>
      {content.parentId ? (
        <Box display="flex" alignItems="center">
          <ModeCommentOutlinedIcon
            sx={{ mr: 1, width: '16px', height: '16px' }}
          />
          {content.parentId === content.ancestorId ? (
            <>
              <Typography marginRight={1}>In reply to</Typography>
              <Typography marginRight={1}>
                <Link to={`/${content.parent?.ownerId}/${content.parentId}`}>
                  {content.parent?.title}
                </Link>
              </Typography>
            </>
          ) : (
            <>
              <Typography marginRight={1}>In reply to</Typography>
              <Typography marginRight={1}>
                <Link to={`/${content.parent?.ownerId}/${content.parentId}`}>
                  "{content.parent?.body.slice(0, 20)}..."
                </Link>
              </Typography>
              <Typography marginRight={1}>inside the post</Typography>
              <Typography>
                <Link
                  to={`/${content.ancestor?.ownerId}/${content.ancestorId}`}
                >
                  {content.ancestor?.title}
                </Link>
              </Typography>
            </>
          )}
        </Box>
      ) : null}
      <Box>
        <Box display="flex">
          <UpVotes />
          <ContentComponent content={content} />
        </Box>
        <Box my={2} p={2} border="1px solid black" borderRadius="6px">
          {isEditorOpen ? (
            <Box>
              <Editor code={reply} setCode={setReply} />
              <Box mt={2} display="flex" justifyContent="flex-end">
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={handleCloseEditor}
                  sx={{ mr: 2 }}
                >
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  color="success"
                  onClick={handleAddReply}
                >
                  Reply
                </Button>
              </Box>
            </Box>
          ) : (
            <Button
              variant="outlined"
              color="primary"
              onClick={handleOpenEditor}
            >
              Reply
            </Button>
          )}
        </Box>
        {contentTree.length > 0 ? (
          <RenderChildrenTree contentTree={contentTree} />
        ) : null}
      </Box>
    </Box>
  );
};
