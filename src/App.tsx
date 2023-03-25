import React, {useState} from 'react';
import classes from './App.module.css'
import SuperButton from './components/SuperButton';
import SuperInput from './components/SuperInput';
import Display from './components/Display';
import Settings from './components/Settings';

function App() {



    const [minCount, setMinCount] = useState<number>(0);
    const [maxCount, setMaxCount] = useState<number>(5);
    const [count, setCount] = useState<number>(minCount)
    const [infoMessage, setInfoMessage] = useState(false)




    const [errorMin, setErrorMin] = useState(false)
    const [errorMax, setErrorMax] = useState(false)
    const incrementCount = () => {
        setCount(count + 1)
    }

    const resetCount = () => {
        setCount(minCount)
    }

    const seterMaxCount = (newValue: number) => {
        setMaxCount(newValue);
        setInfoMessage(true);
    }

    const seterMinCount = (newValue: number) => {
        setMinCount(newValue);
        setInfoMessage(true);
    }

    const setCounter = () => {
        setCount(minCount);
        setInfoMessage(false)
    }

    const disabledInc = count >= maxCount;
    const disabledReset = count <= minCount;


    if (maxCount <= minCount) {
        setErrorMax(true)
    }


    return (
        <div className={classes.App}>
            <Settings
                minCount={minCount}
                maxCount={maxCount}
                seterMinCount={seterMinCount}
                seterMaxCount={seterMaxCount}
                setCounter={setCounter}
            />
            <div className={classes.counterWrapper}>
                <Display count={count}
                         infoMessage={infoMessage}
                         maxCount={maxCount}
                />
                <div className={classes.buttonWrapper}>
                    <SuperButton
                        name="inc"
                        disabled={disabledInc}
                        callBack={incrementCount}
                    />
                    <SuperButton
                        name="reset"
                        disabled={disabledReset}
                        callBack={resetCount}
                    />
                </div>
            </div>
        </div>

    );
}

export default App;
