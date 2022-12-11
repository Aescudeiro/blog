import { FC, useState } from 'react';
import { EditorContainer } from './styles';
import { Box, Tab, Tabs } from '@mui/material';
import { TabPanel } from '../TabPanel';
import { EditTab } from './components/EditTab';
import { Preview } from '../Preview';

interface Props {
  code: string;
  setCode: (value: string) => void;
}

export const Editor: FC<Props> = ({ code, setCode }) => {
  const [value, setValue] = useState(0);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const a11yProps = (index: number) => {
    return {
      id: `full-width-tab-${index}`,
      'aria-controls': `full-width-tabpanel-${index}`,
    };
  };

  const handleCodeChange = (value: string) => {
    setCode(value);
  };

  return (
    <EditorContainer>
      <Box width="100%" border="1px solid black" borderRadius="6px">
        <Tabs value={value} onChange={handleChange} aria-label="editor tabs">
          <Tab label="Edit" {...a11yProps(0)} />
          <Tab label="Preview" {...a11yProps(1)} />
        </Tabs>
        <TabPanel value={value} index={0}>
          <EditTab value={code} onChange={handleCodeChange} extensions={[]} />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Preview body={code} />
        </TabPanel>
      </Box>
    </EditorContainer>
  );
};
