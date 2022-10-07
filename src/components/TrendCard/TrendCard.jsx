import React from 'react'
import {TrendData} from "../../Data/TrendData.js"
import "./TrendCard.css"

export const TrendCard = () => {
  return (
    <div className='trend-card'>
      <h3>Trends for your</h3>
      {
        TrendData.map((trend, i) => {
          return (
            <div className="trend" key={i}>
              <span>#{trend.name}</span>
              <span>{trend.shares}k shares</span>
            </div>
          )
        })
      }
    </div>
  )
}
