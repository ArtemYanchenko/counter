import React, {useEffect, useState} from 'react';
import classes from '../../App.module.css';
import SuperInput from './SuperInput';
import SuperButton from '../SuperButton';
import {createDiffieHellman} from 'crypto';
import {useDispatch, useSelector} from 'react-redux';
import {CounterType, setMaxCountAC, setMinCountAC, toggleEditModeAC} from '../../redux/counterReducer';
import {AppRootStateType} from '../../redux/store';


type PropsType = {
    setCounter: () => void
}

const CounterSettings: React.FC<PropsType> = (
    {
        setCounter,
    }) => {

    const dispatch = useDispatch()
    const {
        minCount,
        maxCount,
        editMode
    } = useSelector<AppRootStateType, CounterType>(state => state.counter)


    const returnErrorTrue = () => {
        if (editMode) {
            dispatch(toggleEditModeAC(false))
        }
        return true
    }

    const checkInputError = (value: number | number[]) => {
        if (Array.isArray(value)) {
            if (value[0] >= value[1]) {
                return returnErrorTrue()
            }
        }
        if (value < 0) {
            return returnErrorTrue()
        }
        return false
    }

    const seterMaxCount = (newValue: number) => {
        dispatch(setMaxCountAC(newValue))
        dispatch(toggleEditModeAC(true))
    }

    const seterMinCount = (newValue: number) => {
        dispatch(setMinCountAC(newValue))
        dispatch(toggleEditModeAC(true))
    }

    return (
        <div className={classes.counterWrapper}>
            <SuperInput name="max value"
                        value={maxCount}
                        callBack={seterMaxCount}
                        error={checkInputError(maxCount) || checkInputError([minCount, maxCount])}
            />

            <SuperInput name="min value"
                        value={minCount}
                        callBack={seterMinCount}
                        error={checkInputError(minCount) || checkInputError([minCount, maxCount])}
            />

            <div className={classes.buttonWrapper}>
                <SuperButton name="set"
                             disabled={!editMode}
                             callBack={setCounter}
                />
            </div>
        </div>
    );
};

export default CounterSettings;