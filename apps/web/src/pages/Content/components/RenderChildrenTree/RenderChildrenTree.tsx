import { Box, Button, List, ListItem } from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';
import { FC, useCallback, useState } from 'react';
import { Content, UpVotes, Editor } from '../../../../components';
import { useAddContentMutation } from '../../../../gql/graphql';
import { ContentTree } from '../../utils';

interface Props {
  contentTree: ContentTree[];
}

export const RenderChildrenTree: FC<Props> = ({ contentTree }) => {
  const [reply, setReply] = useState('');
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const addReply = useAddContentMutation();
  const queryClient = useQueryClient();

  const handleOpenEditor = () => {
    setIsEditorOpen(true);
  };

  const handleCloseEditor = () => {
    setIsEditorOpen(false);
  };

  const handleAddReply = useCallback(
    (parentId: any, ancestorId: any) => {
      addReply.mutateAsync(
        {
          body: reply,
          parentId: parentId,
          ancestorId: ancestorId,
        },
        {
          onSuccess: () => {
            setReply('');
            setIsEditorOpen(false);
            queryClient.invalidateQueries(['getContentChilds']);
          },
        }
      );
    },
    [reply]
  );

  return (
    <List sx={{ py: 0 }}>
      {contentTree.map((content) => (
        <ListItem
          key={content.id}
          sx={{ flexDirection: 'column', pb: 0, pr: 0 }}
        >
          <Box display="flex" width="100%">
            <UpVotes />
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="space-between"
              width="100%"
            >
              <Content content={content} />
              <Box mt={2}>
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
                        onClick={() =>
                          handleAddReply(
                            content.id,
                            content.ancestorId ?? content.id
                          )
                        }
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
              {content.childs.length > 0 ? (
                <RenderChildrenTree contentTree={content.childs} />
              ) : null}
            </Box>
          </Box>
        </ListItem>
      ))}
    </List>
  );
};
