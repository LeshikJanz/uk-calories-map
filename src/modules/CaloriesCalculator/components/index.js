import React from 'react';
import '../styles/style.css';

export const CaloriesCalculator = ({
                                     calculateCalories,
                                     handleStartPositionSearch,
                                     handleEndPositionSearch,
                                     calories,
                                     startPos,
                                     handleStartPosMenuSelect,
                                     endPos,
                                     handleEndPosMenuSelect,
                                     startPosOptions,
                                     endPosOptions
                                   }) => (
  <div className="calculatorContainer">
    <h1>How many calories do you need for moving from one to another place by foot?</h1>

    <form onSubmit={calculateCalories}>
      <div className="formElement">
        <label htmlFor="startPosition">Start position</label>
        <input name="startPosition" value={startPos.value}
               onChange={handleStartPositionSearch} required type="text"/>
        { startPosOptions.length > 0 &&
        <div className="autocomplete">
          {
            startPosOptions.map(o => <div onClick={() => handleStartPosMenuSelect(o)}
                                          key={o.id}>{o.name}</div>)
          }
        </div>
        }
      </div>
      <div className="formElement">
        <label htmlFor="endPosition">End position</label>
        <input name="endPosition" value={endPos.value}
               onChange={handleEndPositionSearch} required type="text"/>
        { endPosOptions.length > 0 &&
        <div className="autocomplete">
          {
            endPosOptions.map(o => <div onClick={() => handleEndPosMenuSelect(o)}
                                        key={o.id}>{o.name}</div>)
          }
        </div>
        }
      </div>
      <div className="formElement">
        <label htmlFor="bodyWeight">Body weight</label>
        <input name="bodyWeight" required type="number" placeholder="kg"/>
      </div>

      <button>
        Calculate calories
      </button>
    </form>
    {
      (+calories !== 0) &&
      <h3>You will burn {calories.toFixed(1)} calories</h3>
    }
  </div>
);