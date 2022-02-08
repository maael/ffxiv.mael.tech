import {useState} from 'react';
import {Field, Control, Input} from 'rbx/elements/form';
import {Tag} from 'rbx/elements/tag';
import {Button} from 'rbx/elements/button';
const {jobs} = require('../json/jobs.json');
const {xp} = require('../json/xp.json');

const styles = {
  jobsContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '70vw'
  }
}

export default () => {
  const [levelValue, updateLevel] = useState(1);
  const [xpValue, updateXP] = useState(0);
  const currentXp = xp.find((x) => x.to === (parseInt(levelValue) || 1));
  const maxXP = xp[xp.length - 1].total;
  const currentXpValue = (currentXp ? currentXp.total : 0) + (parseInt(xpValue) || 0);
  const outstandingXP = levelValue > 70 ? 0 : (maxXP - currentXpValue) > 0 ? maxXP - currentXpValue : 0;
  return (
    <>
      <h1>Beast Tribes</h1>
      <div style={styles.jobsContainer}>
        {jobs.map(({name}) => <div key={name}>{name}</div>)}
      </div>
      <Field kind='group'>
        <Field kind='addons'>
          <Control>
            <Button static>Level</Button>
          </Control>
          <Control>
            <Input value={levelValue} onChange={({target}) => updateLevel(parseInt(target.value) || '')} type='number' min={1} max={70} placeholder='Current Level...' />
          </Control>
        </Field>
        <Field kind='addons'>
          <Control>
            <Button static>Current XP</Button>
          </Control>
          <Control>
            <Input value={xpValue} onChange={({target}) => updateXP(parseInt(target.value) || '')} type='number' placeholder='Current XP...' />
          </Control>
        </Field>
      </Field>
      {outstandingXP.toLocaleString()}xp
      <Tag>What</Tag>
    </>
  );
};
