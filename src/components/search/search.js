import React, { useState } from 'react';
import { AsyncPaginate } from 'react-select-async-paginate';
import { geoApiOptions,GEO_API_URL } from '../../api';

const Search = ({onSearchChange}) =>{
   //一个状态变量 search，用于存储当前搜索的值
   //useState 允许你在函数组件中声明状态变量。
   //每当状态变量的值发生变化时，组件会重新渲染，以反映最新的状态
   const [search,setsearch] = useState(null);

   const loadOptions = (inputValue) => {
    return fetch(
      `${GEO_API_URL}/cities?minPopulation=1000000&namePrefix=${inputValue}`,
      geoApiOptions
    )
      .then((response) => response.json())
      .then((response) => {
        return {
          options: response.data.map((city) => {
            return {
              value: `${city.latitude} ${city.longitude}`,
              label: `${city.name}, ${city.countryCode}`,
            };
          }),
        };
      });
  };

   const handleOnChange = (searchData) =>{
    setsearch(searchData);       // 更新组件内部的状态
    onSearchChange(searchData);   // 调用传入的回调函数
    // Search 组件接收到的 onSearchChange 属性，这个属性是一个函数，它是由父组件传递进来的。
    //当 handleOnChange 被调用时，它也会触发父组件中的这个函数。
   };

    return (
        //异步组件
        <AsyncPaginate
           placeholder="Search for a city"//用于在下拉框中显示提示文字，指导用户可以搜索城市
           debounceTimeout={600}//防抖是一种性能优化手段，它意味着在用户停止输入一定时间后（这里是 500 毫秒），才会触发数据的加载。这样可以减少因为用户输入过快而导致的频繁请求
           value = {search}
           onChange ={handleOnChange}
           loadOptions={loadOptions}
           
        />
    );
};

export default Search;