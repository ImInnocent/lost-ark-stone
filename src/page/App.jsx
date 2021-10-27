import { useState } from 'react';
import _ from 'lodash';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Divider, Button } from '@material-ui/core';

const ratio = 0.7;
const BG_WIDTH = 634;
const BG_HEIGHT = 733;

const DIALOG_WIDTH = 599;
const DIALOG_HEIGHT = 87;
const DIALOG_LEFT = 18;

const ROW_TOP = [186, 247, 340];
const ROW_TYPES = ["good", "good", "bad"];
const ROW_TEXTS = ["증가 효과1", "증가 효과2", "감소 효과"];

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
    height: '100%', 
    float: 'right',
  },
  hoverMenu: {
    position: "fixed", 
    right: -150, 
    width: 200, 
    height: 200, 
    top: "50%", 
    transform: 'translate(0, -50%)',
    zIndex: 10,
    backgroundImage: `url('/static/images/side_menu_bg.png')`,
    backgroundSize: "cover",
    '&:hover': {
      transition: "transform 0.3s linear",
      transform: `translate(-150px, -50%)`,
    },
  },
  menuBox: {
    position: 'absolute',
    left: 60,
    top: 10,
    width: 150,
    height: 180,
  },
  slot: {
    width: 27,
    height: 27,
  },
  skillBox: {
    position: "absolute", 
    width: 272, 
    height: 25, 
    left: 69, 
    bottom: 36, 
    backgroundSize: "cover",
  },
  skillText: {
    color: "#B7D6F0", 
    top: 3, 
    fontSize: 14, 
    left: 10, 
    position: "absolute",
  },
  successRateText: {
    position: "absolute", 
    color: "white", 
    right: 14, 
    top: 169, 
    fontSize: 11,
  },
  crackRateText: {
    position: "absolute", 
    color: "white", 
    right: 14, 
    top: 322, 
    fontSize: 11,
  },
}));

export default function App() {
  const classes = useStyles();

  const percent_up = 10;
  const percent_down = 10;

  const INIT_MAX = 5
  const INIT_PERCENT = 75;
  const INIT_RESULTS = [[], [], []];

  // slot count
  const [max, setMax] = useState(INIT_MAX);
  // enchant result
  const [results, setResult] = useState(INIT_RESULTS);
  // current enchant success rate
  const [percent, setPercent] = useState(INIT_PERCENT);

  /**
   * 세공 버튼 클릭 시 호출.
   * 
   * @param idx 선택된 위치
   */
  const handleClick = idx => {
    // roll dice
    const result = percent > Math.random() * 100;

    if (results[idx].length >= max)
      return;

    // percent change
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

  /**
   * '초기화' 버튼 클릭시 호출. 진행상황 초기화.
   */
  const handleReset = () => {
    setResult(INIT_RESULTS)
    setPercent(INIT_PERCENT)
  }

  /**
   * 총 슬롯 개수 증감 시 호출.
   * 
   * @param num 증감하는 수치. 증가면 양수, 감소면 음수.
   */
  const handleMax = num => {
    if (max + num < 5 || max + num > 10)
      return;
    
    setMax(max + num)
    handleReset()
  }

  /**
   * 세공 결과를 포함한 슬롯들의 컴포넌트를 반환
   * 
   * @param idx 출력할 위치
   * @return {React.ReactComponentElement}
   */
  const printResult = idx => {
    const len = results[idx].length;
    const filePath = '/static/images/socket';
    const type =  "_" + ROW_TYPES[idx];
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
          <img key={`icon-${idx}-${i}`} className={classes.slot} src={filePath + url + '.png'} />
        ))}
      </>
    )
  }

  return (
    <>
      {/* background */}
      <div className={classes.background} />

      {/* root */}
      <div className={classes.root}>
        {/* success rate texts */}
        <div className={classes.successRateText}>성공 확률 <span style={{ color: "yellow" }}>{percent}%</span></div>
        <div className={classes.crackRateText}>균열 확률 <span style={{ color: "yellow" }}>{percent}%</span></div>
        
        {/* slots */}
        <div>
          {_.range(3).map(idx => (
            <div
              style={{ top: ROW_TOP[idx] }}
              className={classes.row} key={`row-${idx}`}
            >
              {/* Skill icon */}
              <img
                style={{ height: '100%', }}
                src={'/static/images/icon_' + ROW_TYPES[idx] + '.png'} />

              {/* Skill Text */}
              <div
                className={classes.skillBox}
                style={{ backgroundImage: `url(${'/static/images/bar_' + ROW_TYPES[idx] + '.png'})` }}
                >
                <div className={classes.skillText}>
                  {ROW_TEXTS[idx]}
                </div>
              </div>

              {/* slots */}
              <div className={classes.socketContainer}>
                {printResult(idx)}
              </div>

              {/* enchant button */}
              <button
                style={{ filter: `grayscale(${results[idx].length === max ? 1 : 0})`, }}
                className={classes.imageButton}
                onClick={() => handleClick(idx)}>
                <img
                  style={{ height: '100%', }}
                  src={'/static/images/button_' + ROW_TYPES[idx] + '.png'} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* side hover menu */}
      <div className={classes.hoverMenu}>
        <div className={classes.menuBox}>
          <Typography style={{ paddingTop: 5 }}>초기화</Typography>
          <Divider />
          <div style={{ marginTop: 4 }}>
            <Button variant='contained' size="small" onClick={handleReset}>실행</Button>
          </div>
          <Typography style={{ paddingTop: 20 }}>슬롯 개수 조절</Typography>
          <Divider />
          <div style={{ marginTop: 4 }}>
            <Button style={{ width: 20, minWidth: 20, height: 20, marginLeft: 10, marginRight: 10 }} variant='contained' size="small" onClick={() => handleMax(1)}>+</Button>
            <Button style={{ width: 20, minWidth: 20, height: 20 }} variant='contained' size="small" onClick={() => handleMax(-1)}>-</Button>
          </div>
        </div>
      </div>
    </>
  );
}