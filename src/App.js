import { useState } from 'react';
import _ from 'lodash';
import { makeStyles } from '@material-ui/core/styles';

const ratio = 0.7;
const BG_WIDTH = 634;
const BG_HEIGHT = 733;

const DIALOG_WIDTH = 599;
const DIALOG_HEIGHT = 87;
const DIALOG_LEFT = 18;

const ROW_TOP = [186, 247, 340];


const useStyles = makeStyles((theme) => ({
  root: {
    width: BG_WIDTH * ratio,
    height: BG_HEIGHT * ratio,
    top: '50%',
    bottom: '50%',
    transform: 'translate(-50%, -50%)',
    left: '50%',
    right: '50%',
    zIndex: 2,
    position: 'absolute',
    backgroundImage: `url('/static/images/dialog_bg.png')`,
    backgroundSize: 'cover',
    backgroundColor: 'black',
  },
  background: {
    backgroundImage: `url('/static/images/bg.png')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100%',
    filter: `blur(2px)`,
  },
  row: {
    width: DIALOG_WIDTH * ratio,
    height: DIALOG_HEIGHT * ratio,
    left: DIALOG_LEFT * ratio,
    position: 'absolute',
    zIndex: 3,
  },
  socketContainer: {
    position: 'absolute',
    left: 69,
    right: 70,
    top: 'auto',
    bottom: 0,
    backgroundColor: 'rgb(2, 4, 3)',
  },
  imageButton: {
    background: 'none',
    border: 'none',
    padding: 0,
  },
  hoverMenu: {
    position: "fixed", 
    right: -80, 
    width: 100, 
    height: 100, 
    top: "50%", 
    background: "white",
    '&:hover': {
      transition: "transform 0.3s linear",
      transform: `translate(-80px, 0)`,
    },
  }
}));

function App() {
  const classes = useStyles();

  const percent_up = 10;
  const percent_down = 10;

  const INIT_MAX = 5
  const INIT_PERCENT = 75;
  const INIT_RESULTS = [[], [], []]

  const [max, setMax] = useState(INIT_MAX)
  const [results, setResult] = useState(INIT_RESULTS)
  const [percent, setPercent] = useState(INIT_PERCENT)

  const handleClick = idx => {
    const result = percent > Math.random() * 100;

    if (results[idx].length >= max)
      return;

    if (result) {
      if (percent - percent_down >= 25)
        setPercent(percent - percent_down)
    } else {
      if (percent + percent_up <= 75)
        setPercent(percent + percent_up)
    }

    results[idx].push(result)
    setResult(results)
  }

  const handleReset = () => {
    setResult(INIT_RESULTS)
    setPercent(INIT_PERCENT)
  }

  const handleMax = num => {
    if (max + num < 5 || max + num > 10)
      return;
    
    setMax(max + num)
    handleReset()
  }

  const printResult = idx => {
    const len = results[idx].length;
    const filePath = '/static/images/socket';
    const type = idx == 2 ? '_bad' : '_good';
    let result = [];

    for (let i = 0; i < len; i++) {
      result.push((results[idx][i] ? type + '_success' : '_fail'))
    }
    
    for (let i = 0; i < max - len; i++) {
      result.push(type + '_yet')
    }

    return (
      <>
        {_.map(result, (url, i) => (
          <img key={`icon-${idx}-${i}`} src={filePath + url + '.png'} />
        ))}
      </>
    )
  }

  return (
    <>
      <div className={classes.background} />
      <div className={classes.root}>
        <div style={{ fontFamily: "'Nanum Gothic', sans-serif", position: "absolute", color: "white", right: 14, top: 169, fontSize: 11 }}>성공 확률 <span style={{ color: "yellow" }}>{percent}%</span></div>
        <div style={{ position: "absolute", color: "white", right: 14, top: 322, fontSize: 11 }}>균열 확률 <span style={{ color: "yellow" }}>{percent}%</span></div>
        <div>
          {_.range(3).map(idx => (
            <div
              style={{ top: ROW_TOP[idx] }}
              className={classes.row} key={`row-${idx}`}
            >
              <img
                style={{ height: '100%', }}
                src={'/static/images/icon_' + (idx == 2 ? 'bad' : 'good') + '.png'} />
              <div
                style={{ width: 272, position: "absolute", height: 25, left: 69, bottom: 36, backgroundSize: "cover",
                backgroundImage: `url(${'/static/images/bar_' + (idx == 2 ? 'bad' : 'good') + '.png'})` }}
                >
                <div style={{ color: "#B7D6F0", top: 3, fontSize: 14, left: 10, position: "absolute" }}>
                  원한
                </div>
              </div>
              <div className={classes.socketContainer}>
                {printResult(idx)}
              </div>
              <button
                style={{ height: '100%', float: 'right', filter: `grayscale(${results[idx].length === max ? 1 : 0})`, }}
                className={classes.imageButton}
                // style={{ backgroundImage: `url(${})` }}
                onClick={() => handleClick(idx)}>
                <img
                  style={{ height: '100%', }}
                  src={'/static/images/button_' + (idx == 2 ? 'bad' : 'good') + '.png'} />
              </button>
            </div>
          ))}
        </div>
        <div>성공확률: {percent}%</div>
      </div>
      <div className={classes.hoverMenu}>
        메뉴
        <button onClick={handleReset}>초기화</button>
        <button onClick={() => handleMax(1)}>+</button>
        <button onClick={() => handleMax(-1)}>-</button>
      </div>
    </>
  );
}

export default App;
