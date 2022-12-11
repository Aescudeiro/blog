import { FC } from 'react';
import { Box } from '@mui/material';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { prism } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface Props {
  body: string;
}

export const Preview: FC<Props> = ({ body }) => {
  return (
    <Box sx={{ '& p': { marginY: 0 } }} maxWidth="100%" overflow="auto">
      <ReactMarkdown
        remarkPlugins={[gfm]}
        components={{
          code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || '');
            return !inline && match ? (
              <SyntaxHighlighter
                // @ts-ignore: Unreachable code error
                style={prism}
                language={match[1]}
                PreTag="div"
                children={String(children).replace(/\n$/, '')}
                {...props}
              />
            ) : (
              <code className={className} {...props}>
                {children}
              </code>
            );
          },
        }}
      >
        {body}
      </ReactMarkdown>
    </Box>
  );
};
