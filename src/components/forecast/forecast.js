import React from 'react';
import {
    Accordion, 
    AccordionItem,         //每个AccordionItem代表一天的天气预报
    AccordionItemHeading,  //包含每天的天气概览信息
    AccordionItemButton,   //一个按钮，点击可以展开或折叠详细信息
    AccordionItemPanel  //详细的天气信息，如气压、湿度、风速
} from 'react-accessible-accordion';
//AccordionItem组件来创建可折叠的天气信息面板
import './forecast.css';

const WEEK_DAYS = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];

const Forecast = ({ data }) => {
    const dayInAWeek = new Date().getDay();
    //new Date()：创建一个新的 Date 对象，表示当前日期和时间。
    //getDay()：返回一个数字，表示当前日期是星期几。范围是 0（星期日）到 6（星期六）。
    //splice()：用于添加或删除数组中的元素。
    //splice() 方法会改变原始数组，并返回一个包含被删除元素的新数组。
    //slice()：用于提取数组的一部分，并返回一个新的数组。
    //slice(dayInAWeek, WEEK_DAYS.length)：从当前星期几开始，截取到这一周的最后一天。
    //concat()：用于合并两个或多个数组，返回一个新数组，不会改变原数组。
    const forecastDays = WEEK_DAYS.slice(dayInAWeek, WEEK_DAYS.length).concat(
        WEEK_DAYS.slice(0, dayInAWeek)
    );

  return(
    <>
    <label className="title">Daily</label>
    <Accordion allowZeroExpand>
        {data.list.splice(0,7).map((item, idx) =>(
         
         <AccordionItem key={idx}>
              <AccordionItemHeading>
                <AccordionItemButton>
                      <div className='daily-item'>
                         {/* 检查 item.weather 和 item.weather[0] 是否存在 */}
                         {item.weather && item.weather[0] && (
                                    <img alt='weather' className='icon-small' src={`icons/${item.weather[0].icon}.png`} />
                                )}
                              
                             <label className='day'>{forecastDays[idx]}</label>  
                             <label className='description'>{item.weather[0].description}</label>
                             <label className='min-max'>{Math.round(item.main.temp_min)}°C /{Math.round(item.main.temp_max)}°C</label>
                      </div>
                </AccordionItemButton>   
              </AccordionItemHeading>
              <AccordionItemPanel>
                 <div className='daily-details-grid'>
                      <div className='daily-details-grid-item'>
                        <label>Pressure:</label>
                        <label>{item.main.pressure} hPa</label>
                      </div>
                      <div className='daily-details-grid-item'>
                        <label>Humidity:</label>
                        <label>{item.main.humidity} %</label>
                      </div>
                      <div className='daily-details-grid-item'>
                        <label>Clouds:</label>
                        <label>{item.clouds.all} %</label>
                      </div>
                      <div className='daily-details-grid-item'>
                        <label>Wind Speed:</label>
                        <label>{item.wind.speed} m/s</label>
                      </div>
                      <div className='daily-details-grid-item'>
                        <label>Sea level:</label>
                        <label>{item.wind.sea_level} m</label>
                      </div>
                      <div className='daily-details-grid-item'>
                        <label>Feels like</label>
                        <label>{Math.round(item.main.feels_like)}°</label>
                      </div>
                 </div>
              </AccordionItemPanel>
         </AccordionItem>
        ))}
       
    </Accordion>
    
    </>
 

  )
}

export default Forecast;



/*

const MyAccordion = () => (
  <Accordion>
    <AccordionItem>
      <AccordionItemHeading>
        <AccordionItemButton>
          点击我展开/折叠第一项
        </AccordionItemButton>
      </AccordionItemHeading>
      <AccordionItemPanel>
        第一项的内容
      </AccordionItemPanel>
    </AccordionItem>
    <AccordionItem>
      <AccordionItemHeading>
        <AccordionItemButton>
          点击我展开/折叠第二项
        </AccordionItemButton>
      </AccordionItemHeading>
      <AccordionItemPanel>
        第二项的内容
      </AccordionItemPanel>
    </AccordionItem>
  </Accordion>
  );
  
  export default MyAccordion;
  
*/