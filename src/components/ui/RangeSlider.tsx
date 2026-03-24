'use client';

import styles from './RangeSlider.module.css';

type RangeSliderProps = {
  min: number;
  max: number;
  valueLow: number;
  valueHigh: number;
  onChange: (low: number, high: number) => void;
};

export default function RangeSlider({
  min,
  max,
  valueLow,
  valueHigh,
  onChange,
}: RangeSliderProps) {
  const range = max - min;

  const fillLeft = range > 0 ? ((valueLow - min) / range) * 100 : 0;
  const fillRight = range > 0 ? ((max - valueHigh) / range) * 100 : 0;

  function handleLowInput(e: React.ChangeEvent<HTMLInputElement>) {
    const val = Number(e.target.value);
    onChange(Math.min(val, valueHigh), valueHigh);
  }

  function handleHighInput(e: React.ChangeEvent<HTMLInputElement>) {
    const val = Number(e.target.value);
    onChange(valueLow, Math.max(val, valueLow));
  }

  function handleLowNumberInput(e: React.ChangeEvent<HTMLInputElement>) {
    const val = Number(e.target.value);
    if (!isNaN(val)) {
      onChange(Math.min(Math.max(val, min), valueHigh), valueHigh);
    }
  }

  function handleHighNumberInput(e: React.ChangeEvent<HTMLInputElement>) {
    const val = Number(e.target.value);
    if (!isNaN(val)) {
      onChange(valueLow, Math.max(Math.min(val, max), valueLow));
    }
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.inputs}>
        <input
          type="number"
          className={styles.input}
          value={valueLow}
          min={min}
          max={valueHigh}
          onChange={handleLowNumberInput}
        />
        <span className={styles.separator}>—</span>
        <input
          type="number"
          className={styles.input}
          value={valueHigh}
          min={valueLow}
          max={max}
          onChange={handleHighNumberInput}
        />
      </div>

      <div className={styles.trackContainer}>
        <div className={styles.track} />
        <div
          className={styles.fill}
          style={{
            left: `${fillLeft}%`,
            right: `${fillRight}%`,
          }}
        />
        <input
          type="range"
          className={styles.rangeInput}
          min={min}
          max={max}
          value={valueLow}
          onChange={handleLowInput}
        />
        <input
          type="range"
          className={styles.rangeInput}
          min={min}
          max={max}
          value={valueHigh}
          onChange={handleHighInput}
        />
      </div>
    </div>
  );
}
