import { FormControlLabel, Radio, RadioGroup } from '@mui/material';

interface TodoFilterProps {
  onChange: (value: string) => void;
}

export enum TodoStatus {
  All = 'All',
  Complete = 'Completed',
  Incomplete = 'Incomplete',
}

export const TodoFilter: React.FC<TodoFilterProps> = ({ onChange }) => {
  return (
    <RadioGroup
      row
      onChange={(_, value) => onChange(value)}
      name='row-radio-buttons-group'
    >
      <FormControlLabel
        value={TodoStatus.All}
        control={<Radio size='small' />}
        label={TodoStatus.All}
      />
      <FormControlLabel
        value={TodoStatus.Complete}
        control={<Radio size='small' />}
        label={TodoStatus.Complete}
      />
      <FormControlLabel
        value={TodoStatus.Incomplete}
        control={<Radio size='small' />}
        label={TodoStatus.Incomplete}
      />
    </RadioGroup>
  );
};
