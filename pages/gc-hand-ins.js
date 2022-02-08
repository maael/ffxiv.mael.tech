import {useState} from 'react';
import ImageCropper from '../components/gchandins/ImageCropper';

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-left',
    width: '100%',
    minHeight: '100%',
    flexWrap: 'wrap'
  }
}

export default () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  async function upload (blob) {
    try {
      const fd = new FormData();
      fd.append('raw', blob, 'raw.jpg');
      setLoading(true);
      const res = await fetch('/api/gchandins/', {
        method: 'POST',
        body: fd
      });
      const json = await res.json();
      setItems(json.results)
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={styles.container}>
      <ImageCropper submit={upload} />
      <div style={{flex: 1}}>
        { loading ? 'Loading' :
          items.map((item) => <Item key={item.ID} item={item} />)
        }
      </div>
    </div>
  )
};

class Item extends React.Component {
  state = {
    loading: true,
    extra: undefined
  }
  async componentDidMount() {
    const {ID} = this.props.item;
    try {
      const res = await fetch(`https://xivapi.com/item/${ID}?columns=Name,ID,LevelEquip,LevelItem,Icon,ClassJobCategory.Name,ClassJobUse.ClassJobCategory.Name,ItemKind.Name`);
      const json = await res.json();
      this.setState({extra: json});
    } catch (e) {
      console.error(e);
    } finally {
      this.setState({loading: false});
    }
  }

  render () {
    const {item} = this.props;
    const {extra, loading} = this.state;
    return (
      <div>
        <img src={`https://xivapi.com${item.Icon}`} />
        {item.Name}
        {loading ? 'Loading' : null}
        {extra ? (
          <div>
            Lvl: {extra.LevelEquip}
            iLvl: {extra.LevelItem}
            Type: {extra.ItemKind.Name}
            ClassJob: {extra.ClassJobUse.ClassJobCategory.Name || extra.ClassJobCategory.Name}
          </div>
        ) : null}
      </div>
    )
  }
}
