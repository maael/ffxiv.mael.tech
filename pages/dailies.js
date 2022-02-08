import {Menu} from 'rbx/components/menu'

export default () => (
  <>
    <h1>ffxiv.mael.tech dailies</h1>
    <Menu style={{width: 200}}>
      <Menu.Label>What</Menu.Label>
      <Menu.List>
        <Menu.List.Item>Dashboard</Menu.List.Item>
        <Menu.List.Item>Customer</Menu.List.Item>
      </Menu.List>
    </Menu>
  </>
);
